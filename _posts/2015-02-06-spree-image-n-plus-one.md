---
layout: post
title: Spree n+1 Queries
---

Recently while working on a project that uses the Spree Commerce Platform, my
team began to notice that an image heavy view was running way too slowly. We
initially thought that the slowdown was a result of rendering a large amount of images
on the view, but after checking the logs, we noticed that the slowdown was largely 
caused by an n+1 query.

A n+1 query is a problem that arises with the use of an Object Relational
Mappper or ORM to select a dataset (the 1), and then while iterating over that
dataset, unintentionally make another query for each record in the dataset you
are iterating over (the n). Here is an example of some code that causes an n+1
query:

{% highlight ruby %}
# an example of a n+1 query
# A User has many Posts
users = User.all

users.each { |user| puts user.posts.count }
{% endhighlight %}

This example is a n+1 query because after the initial query for all of the
users, it then iterates over the users and prints the count of all of their
posts. While the code looks harmless enough, the ORM masks the fact that it is
running a query each time user.posts.count is called. When working with a 
relational database, it is much faster to make a query for 100 records than it is to make 100 queries for 1
record, and because of this, a n+1 query can really become a major performance
issue if not reconciled.

So now that we know what a n+1 query is and how it affects your systems, how do
you go about fixing them. In this case we can use eager loading to prevent an
n+1 query from happening. Eager loading is when you load all of the needed
records ahead of time instead of sending a new query for each record when it is
called. If you are working with Active Record, it provides a few methods of
eager loading the records that you need. Here is an example of how we can
prevent the above example from becoming a n+1 query:


{% highlight ruby %}
# an example using eager load
# A User has many Posts
users = User.all.eager_load(:posts)

users.each { |user| puts user.posts.count }
{% endhighlight %}

It's a pretty simple change to use eager loading, and the performance
improvements if you have a large n+1 query would be pretty impressive. In this
case Active Record will do a single query to retrieve all of the Users and their
associated posts instead of one query to get all of the users and n queries to
get their posts count.

Now that we have gone over what a n+1 query is and how to fix them, let's get
back to the original problem I was having with Spree. The code that we had
looked similar to this: 

{% highlight ruby %}
# retrieves the products
products = products.all

# in the view
<% products.each do |product| %>
  <%= image_tag(product.image) %>
<% end %>
{% endhighlight %}

In order to fix this issue, we used eager loading to load all of the images for
each product, but it was not as simple as adding eager_load(:images) to our
query. The way spree works is that each product has many variants, and each
variant has a picture. This caused us to not just be doing an n+1 query, but it
was actually a 2n+1 query because 2 queries were being made for each product.
Our solution to this problem was to use nested eager loading, and to use only
the master variant for each product. The resulting query looked like this:

{% highlight ruby %}
products = products.all.eager_load(master: [:images])
{% endhighlight %}

Making this change reduced thousands of queries to just a single query, and
reduced the loading time for the page considerably.

## Conclusion

Whenever you are working with an ORM, make sure that you know when you are
issuing multiple queries, and make sure that you know how to fix it if you end
up doing so.
