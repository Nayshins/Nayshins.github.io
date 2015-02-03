---
layout: post
title: Legacy Code: Don't Have Much Time
---

Outside of work I have continued reading Michael Feathers' book Working
Effectively with legacy code, and storing this knowledge away for the day when I
encounter a piece of legacy code that I have to work with. In the section I read
last night, Michael goes over how to make a quick change to some code without
breaking dependencies or breaking the functionality of the legacy code.

# Sprout Method
The first technique that Michael brings up is called Sprout Method, and it
involves replacing an existing local variable that the method uses with the
return of a new method you wrote. This allows you to write a tested method that
returns a new value to the legacy method. Here is an example: Lets say that you
have an untested method that iterates over an array of Car objects, and then counts
how many have fully inflated tires. That looks something like this:

{% highlight ruby %}
def tire_pressure_counter(car_array)
  counter = 0
  car_array.each do | car |
    if car.full_tires?
      counter += 1
  end
end
{% endhighlight %}

Now lets say that the requirements for this method have changed, and you have
been tasked with making the method now only count cars that are the color
yellow. Without any tests surrounding this method how would you make that
change?

{% highlight ruby %}
def tire_pressure_counter(car_array)
  counter = 0
  car_array.each do | car |
    if car.full_tires? && car.color == yellow
      counter += 1
  end
end
{% endhighlight %}

While this seems like it was a pretty easy fix, it was actually an invasive
change that does not have any tests that back it up, but we can do this another
way that will get some of the code under test.

{% highlight ruby %}
def tire_pressure_counter(car_array)
  car_array = yellow_cars(car_array)
  counter = 0
  car_array.each do | car |
    if car.full_tires? && car.color == yellow
      counter += 1
  end
end

def yellow_cars(car_array)
  car_array.select { |car| car.color == yellow }
end
{% endhighlight %}

This last example is using the sprout method technique to add a new feature to a
legacy method. Since the new behavior is encapsulated in its own method, we can
test the new behavior and insert it into the old method without changing its
behavior. This may seem like overkill for such a small method, but if there is a
time when you need to insert new behavior into a legacy method quickly and
effectively, this technique may save you a lot of headache.
# Wrap Method

Another technique that Michael describes in his book is called "wrap method,"
and it is used like the Sprout Method technique: when you have little time to
make the change without breaking the application. For this example your boss's
boss wants to be alerted every time someone completes a transaction at the drive
through window. Currently the application keeps track of the transactions in a
single method that does not have any tests around it. How would you make this
change? 

{% highlight ruby %}
def drive_through_transaction(purchase)
  total = 0
  purchase.each { |purchase| total += purchase.price }
  payment = recieve_payment
  change = payment - total 
  return change
end
{% endhighlight %}

Like in the Sprout Method example you could make a change like this in order to
alert your boss's boss:

{% highlight ruby %}
def drive_through_transaction(purchase)
  total = 0
  purchase.each { |purchase| total += purchase.price }
  payment = recieve_payment
  change = payment - total 
  alert_supreme_boss
  return change
end

def alert_supreme_boss
 # alert code
end
{% endhighlight %}

This change tightly couples the alert code to the drive through transaction
code, and it would make it more difficult for someone else to come along and
make a change to this method. There is a different and more effective way to
make this change in a short amount of time:

{% highlight ruby %}
def complete_transaction(purchase)
  total = 0
  purchase.each { |purchase| total += purchase.price }
  payment = recieve_payment
  change = payment - total 
  alert_supreme_boss
  return change
end

def alert_supreme_boss
 # alert code
end

def drive_through_transaction(purchase)
  complete_transaction(purchase)
  alert_supreme_boss
end
{% endhighlight %}

This change is done using the Wrap Method technique that Michael uses in his
book, and it is a more effective change because it decouples the transaction
code from the alert code while maintaining the same interface as before. This
wrap method change could be extended even further by separating the alerted
transaction with the normal transaction in case the boss gets annoyed with all
of the alerts.

{% highlight ruby %}
def complete_transaction(purchase)
  total = 0
  purchase.each { |purchase| total += purchase.price }
  payment = recieve_payment
  change = payment - total 
  alert_supreme_boss
  return change
end

def alert_supreme_boss
 # alert code
end

def alerted_drive_through_transaction(purchase)
  complete_transaction(purchase)
  alert_supreme_boss
end

def drive_through_transaction(purchase)
  complete_transaction(purchase)
end
{% endhighlight %}

# conclusion

While these methods are great to use when you are short on time and do not have
a test suite of any kind to support you, they are not always the best choice
because they can make code more difficult to read because of too much
abstraction. This risk is acceptable for small changes, but in order to make a
large change in a system, you will need to break some dependencies and work to
bring more of the legacy system into test coverage.
