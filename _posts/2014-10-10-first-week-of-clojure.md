---
layout: post
title: First Week of Clojure
---

After working exclusively in Java for the past few weeks of my apprenticeship, I am now moving on to use Clojure, a dynamically typed Lisp on the JVM , to build a functioning http server. Since Clojure is a dialect of Lisp, I have had to change from working in an Object Oriented language to working in a functional language. Functional programming is a style of programming where priority is placed on functions and immutable data instead of objects. Coming from Object Oriented programming, one of the hardest things for me to understand has been immutable data structures. Immutable data structures still hold data like they would in an OOP language, but where they are different is how they deal with changing the data within them. In an OOP language like ruby, you can perform an operation like this
{% highlight ruby %}
	array = [1, 2, 3, 4]
	
	array[0] = 2
	# array now = [2, 2, 3, 4]
{% endhighlight %}This operation changes the first spot in the array, but it doesn't change what the array variable is pointing to. In functional programming this would be an illegal operation because this is mutating data, and in order to achieve the same result, will create a whole new array and change the reference of array to the new array. The purpose of this is to know that the data strutter you are accessing will not change while you are performing an operation with it. Immutable data is very helpful when working with multithreaded programs because each thread knows that the data it is working with is valid and will not change mid process.

I look forward to learning more about Clojure and functional in the coming weeks, and I will write more about it in the next weeks. 