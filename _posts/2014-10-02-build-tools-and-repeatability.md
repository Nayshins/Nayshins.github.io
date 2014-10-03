---
layout: post
title: Build Tools
---

Over the last few weeks, I have been working exclusively with Java to build my Tic Tac Toe applications. Since Java is a compiled language, source code must be compiled before it can be run.  The compiler converts your human readable source code into computer readable byte code, and once your code is compiled, your code is now executable and can be run. This process has to be done each time the source code changes in order for the changes that were made to be available in the program. This process can be done manually by compiling and building a .jar file (Java Executable file) in your IDE, and then you can manually run the .jar file by running 
{% highlight shell %}
java -jar <.jar file here> 
{% endhighlight %}	This process works well when you have a small project that you are working on, but when you get to a larger project, there are a lot more things to do than just compiling and running.  This is where an automated build tool comes in very handy. An automated build tool is a program that automates the creation of executable software from source code, and many other tasks that are needed on larger projects. 
	
One of the things that an automated build tool will do for you is running all of your tests before it builds the program, and if one of the tests fails, it will interrupt the build and tell you that a test failed. This is very helpful because it will alert you that something isn't working, and it will prevent you from compiling and publishing broken code. 

Another thing that automated build tools will do for you is take care of installing and maintaining the dependencies of the project. This means that the build tool knows what external libraries the project relies, and makes sure that the correct versions are installed. Most build tools can be pointed to a remote repository where the external library is stored, and then download and cache the correct version in your project.  

Along with getting the dependencies from remote repositories, most build tools will also be able to publish your program to a remote repository as well. While sounding very technical, a repository is a file structure that holds .jar files and artifacts that are needed to build the library. The way most repositories file structures are set up is: the organization, then the package name, and lastly the version. Using my Tic Tac Toe application as an example, the file structure of the remote repository looks like this **me/jakenations/java-tic-tac-toe/1.0** .  This is a common file structure that is used by build tools in order to maintain a convention between programmers, so that built tools can get any dependency that is needed from a repository. 

While build tools make programmers lives easier by taking care of these tasks automatically, they also help by making this process repeatable for anyone building the project. If configured correctly, everyone working on or with the project will have it build the same way without any extra effort. This is what I consider to be the most important aspect of the build tool because without this repeatability, programmers would be struggling to share projects with each other because the code will be different each time the code is built by someone else. 

In my next blog post, I will go more in depth about how I used Gradle to build my Tic Tac Toe projects, and how you can create your own repository on Amazon S3.