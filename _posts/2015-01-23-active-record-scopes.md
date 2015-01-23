---
layout: post
title: Active Record Scopes
---

Recently while I was working on a rails project, I came across a method called
Active Record Scope. An active record scope allows you to assign a method to an
active record model to return a subset of records that match the conditions of
the scope. This gives you a very simple way to reach a group of records, and it
prevents you from having to write the query in multiple locations. Using a scope
shortens something like this:

{% highlight ruby%}
Your::Model.where(name: "Joe", model: true)
{% endhighlight ruby %}
to
{% highlight ruby%}
# on models/model.rb
scope :joe?, -> { where(name: "Joe", model: true) }
# where ever you call the query

Your::Model.joe?
{% endhighlight ruby%}

Other than preventing you from having to write the same query over and over
again, scopes have some other benefits than just being syntactic sugar for a
class method. One benefit is that a scope will always return an active record
relation. If you were to write a class method instead of a scope that returned with
no matched records, the class method would return nil and break the chainability
of the method. This is not a problem that would have to worried about while
using a scope because it will always return an active record relation.

Scopes have been very helpful in reducing the amount of queries I need to write,
and they are something I always look to use in my rails projects.
