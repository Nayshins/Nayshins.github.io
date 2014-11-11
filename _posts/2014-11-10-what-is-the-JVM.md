---
layout: post
title: What is the JVM?
---

Over the past two months of my apprenticeship at 8th Light, I have been exclusively working on projects that run on the Java Virtual Machine, also called the JVM. While I have been working with the JVM for 2 months, I took what it did for granted, and have finally taken the time to do some research on it.

## What is the JVM?

Java code is designed to be able to be written once and run anywhere, and this is accomplished by using the JVM. The JVM is a virtual computer that runs as a software process on a computer, and it has many different implementations so it can run on a variety of computers. This allows your java code to be run on many more environments in the exact same way it works on your personal environment.  

## What is a Virtual Machine?
 A virtual machine is defined as "a software implementation of a machine (i.e. a computer) that executes programs like a physical machine." In other terms its a computer program that acts like a computer that runs in your computer. Even though that sounds like the plot from the movie Inception, this is a very common thing in computing, and it allows you to work with a different environment or operating system than what your computer is designed to support. This is accomplished by the virtual machine by emulating the correct architecture that is needed on a different system architecture.


##How Does the JVM Work?
Now that we know the JVM is a virtual computer running as a software process on your computer, how does the JVM run your java code? 

When writing Java code, you first write out your source code as a .java file, but this file itself is not yet executable on the JVM. The next step is to run your code though the Java Compiler which compiles your .java files into .class files. These .class files are files that can be executed on the JVM because they have been converted from human readable java code into an intermediate language called Java bytecode. This java bytecode is the instruction set that the JVM uses to execute your program.

Once the program has been compiled into .class files, you are now able to run your program on the JVM. Once you execute your program by running 
{% highlight bash%}
	$ java -jar yourProgram.jar
{% endhighlight %}This command tells the JVM that you want to run this program, and the first step in executing the program is to load the class files into memory using the class loader. Once the class loader loads the class files into memory, the JVM can then execute the bytecode that the class files contain.  Execution of the bytecode is done by the JVM execution engine. The execution engine's job is to compile the intermarry bytecode into the native execution code for the machine that it is running on. This is done by two different processes Just-In-Time Compilation and Interpretation. 

An interpreter works by reading, interpreting and executing bytecode instructions one by one. This process is very quick at reading single instructions, but it is slow at executing the interpreted result. This makes the interpreter useful for executing single instructions that are not used as much in the program.

The second part of the execution engine is the Just-In-Time Compiler. The JIT works by compiling code into the native execution language at runtime. Natively compiled code works much faster than interpreting the code, but it takes more time for the compiler to compile the code at the start. For this reason, only code that gets executed many times will be compiled by the JIT compiler, and code that is used less will be run by the interpreter. 

## Conclusion

This was a very basic overview on how the JVM runs your java code. In the next few days I will write another blog post that goes more in depth on how the java compiler compiles your java source code into bytecode, what bytecode looks like, and how the JVM executes the bytecode.