---
layout: post
title: Single Responsibility Principle
---

Over the past few days I have been doing research on the SOLID principles software development and how to utilize them in my code. The 'S' in SOLID stand for the Single Responsibility Principle, and this will be the focus of this blog post.

### Single Responsibility Principle

The Single Responsibility Principle (SRP) states that every part of the program (class, function, variable) should only have one responsibility. In this context a responsibility is defined as a reason to change, so the principle can be simplified to: every part of the program should only have one reason to change. 

When a part of the software is only focused on a single responsibility, it makes the program much more adaptable to changing requirements. Say you have a program that creates and prints a report of names to the console that works perfectly in its current state. Here is a very simple example of the program:

{% highlight ruby %}
def report_names
	names = [Jake, Jim, Jill, Bob]
	print names
end
{% endhighlight %}

This simplistic program does exactly what you think it would do, but what if one day you wanted to format the names as JSON or HTML? If you were to keep the same structure of the program, you would need to create a report_names_JSON or a similar method for HTML. This would cause extra work because you would be duplicating the code that gathers the names each time. This is a violation of the SRP because the function does more than one thing, and it has more than one reason to change. These reasons are that it is collecting the names, and printing the names as well. A solution that would work better in this case would look something like this: 

{% highlight ruby %}
class NameGatherer
	def report_names
		names = [Jake, Jim, Jill, Bob]
	end
end

class Printer
	def to_console(names)
		print names
	end
	
	def to_json(names)
		#convert to JSON names
	end
end
{% endhighlight %}

This program splits the responsibilities between two classes, and it no longer violates the SRP. The purpose of the SRP is to make the program easier to update when requirements change, and to prevent code from breaking other functionaility of the program.