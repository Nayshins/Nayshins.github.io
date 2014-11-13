---
layout: post
title: What is Java Bytecode?
---

In my last post I went over how the JVM works at high level, and while I brought up the term Java bytecode, I didn't get to detailed on what it is. When you run the javac compiler on your code, your human readable java source code is converted into machine readable Java bytecode.  Java bytecode is the intermediate representation of a Java programs source code that the JVM uses to create code that is executable on the native system. Because it is meant to be machine readable, bytecode cannot be read by a human, but Java gives us a way to view disassembled code. Disassembled code is the human readable instructions that are used make up the java bytecode.

## So what does it look like?

As an example, I am going to use a simple Java program that prints "Hello World!" to the command line.

HelloWorld.java
{% highlight java%}
public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}
{% endhighlight %} 

If you were to run this program through the javac compiler, you would end up with a .class file, and it is this .class file that contains the Java bytecode. Because the bytecode is unreadable in this state, you must first run the file through the javap class disassembler to get the human readable bytecode instructions. you can do this by running the following command in the command line in the directory of the compiled .class file:

{% highlight bash %}
$ javap -c HelloWorld.class
{% endhighlight %}

Running this command will give you the result:

{% highlight java %}
Compiled from "HelloWorld.java"
public class com.company.HelloWorld {
  public com.company.HelloWorld();
    Code:
       0: aload_0       
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return        

  public static void main(java.lang.String[]);
    Code:
       0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
       3: ldc           #3                  // String Hello World!
       5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
       8: return        
}
{% endhighlight %}

These are the Java bytecode instructions that the JVM executes when running the HelloWorld program, but before I get into what each one means, I will first go over how the JVM executes the bytecode. The JVM is what is called a stack-based machine, and each thread that program runs, creates a new stack that stores frames. A frame is data structure that contains an operand stack, an array of local variables, and references to the constant pool associated with the class the method resides in. 

A diagram of what a frame could look like:

![Java stack](http://www.ibm.com/developerworks/ibm/library/it-haggar_bytecode/fig01.gif)*http://www.ibm.com/developerworks/ibm/library/it-haggar_bytecode/*

The operand stack is where the the computation occurs, and the bytecode tells the JVM what operations to perform on the stack. Each opcode (singular operation from bytecode) performs a certain function on the operand stack, and in combination with other opcodes, performs the instructions that were defined in your original Java source code. So lets take a look back at the Java bytecode is telling the JVM to do for the HelloWorld program:

{% highlight java %}
Compiled from "HelloWorld.java"
public class com.company.HelloWorld {
  public com.company.HelloWorld();
    Code:
       0: aload_0       
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return        

  public static void main(java.lang.String[]);
    Code:
       0: getstatic     #2                 // Field java/lang/System.out:Ljava/io/PrintStream;
       3: ldc           #3                  // String Hello World!
       5: invokevirtual #4            // Method java/io/PrintStream.println:(Ljava/lang/String;)V
       8: return        
}
{% endhighlight %}

The above code is the disassembled code from the HelloWorld program, and it contains two methods: the default class constructor, and the main method. These methods look very different from the Java source code that you wrote because it is the human readable format of the bytecode the JVM reads. Instead of containing your source code, each method contains a list of opcodes and there position in the methods bytecode array where they are stored. 

So lets take a look at what the default constructor is doing. The first opcode that is stored at position 0 in the array is aload_0, and this code tells the JVM to push the reference stored in the local variable byte array slot 0 onto the operand stack. Next, is the opcode at position 1 in the method byte array, invokespecial #1. Invokespecial #1 tells the JVM to call the constructor of its superclass (in this case Object since there is no defined superclass), and the top value of the stack is popped. Lastly the return opcode tells the JVM to pop the top value from the current operand stack, and then push it to the top of calling method's operand stack.

Next we have the main method, and it has many different opcodes. The opcode in position 0 is get static #2, and it tells the JVM to push the item in the #2 spot in the class constant array, the System.out:Ljava/io/PrintStream, onto the stack. Then the JVM moves onto the next opcode at position 3, ldc #3. This is the code to push an object from the constant pool at spot #3 onto the stack, and in this case that is the string "Hello World!." Next in position 5, the opcode invokevirtual #4 calls the method println on the object at the top of the stack, and then right behind it at position 8, return returns the result.

This was a very basic overview of how the JVM executes a simple program, but it is enough to get the gist of what is going on. I have only scratched the surface of the internals of the JVM, but I am excited to keep digging into it.

 




##References used
[Java Bytecode by Peter Haggar](http://www.ibm.com/developerworks/ibm/library/it-haggar_bytecode/)