---
layout: post
title: Dependency Inversion Principle
---

- Solid into
- what is the dependency inversion principle
- car example in Ruby


Continuing my blog posts on the SOLID principles of software design, today I will go over the Dependency Inversion Principle. The Dependency Inversion Principle is defined as, 

```
A. High-level modules should not depend on low-level modules. Both should depend on abstractions.
B. Abstractions should not depend on details. Details should depend on abstractions.
```
A less technical description of the DIP is that you want to separate the application wiring code from the code that is doing the logic. In order to satisfy the DIP your program should not create its dependencies within the class the relies on it, but instead it should have the dependency it needs passed into it when it is created.
	
This principle is hard to understand without a code example, so lets go over how the DIP works in ruby. In this example we have a driver who needs a car in order to drive. That code looks like this:

{% highlight ruby %}
class Driver
	def initialize()
		@car = Car.new
	end
		
	def drive_car()
		@car.drive
	end
end

class Car
	def drive()
		puts "Driving a car"
	end	
end
{% endhightlight ruby %}
This example is breaking the dependency  because the Driver class is creating a new instance of a car each time a driver is created. While at first it makes sense to create a car when a driver is initialized because a driver always needs a car to drive, what happens if the driver becomes a truck driver? How would the driver be able to drive a truck if it always initializes a car when created. This is when the DIP is helpful because you pass the needed dependency into the class instead of creating it on initialization. 

Here is the code refactored to use the DIP:

{% highlight ruby %}
class Driver
	def initialize(vehicle)
		@vehicle = vehicle
	end
		
	def drive_car()
		@vehicle.drive
	end
end

class Car
	def drive()
		puts "Driving a car"
	end	
end

class Truck
	def drive()
		puts "I'm driving a truck"
	end
end
{% endhighlight %}

Since the driver class no longer initializes a car when created, any vehicle that has a drive method can be passed into the class and can be driven by the driver.

This was a simple introduction to the Dependency Inversion Principle, but even with it simplicity, it shows the flexibility that is gained from using it. By removing the dependency from being created within the class, the class could accept any dependency that has the same methods as it expects.
