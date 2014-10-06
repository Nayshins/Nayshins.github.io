---
layout: post
title: Using the Gradle Build Tool
---
In my previous blog post, I discussed what an automated build tool is, and how using one in your project will benefit you and your team. Over the last few weeks, I have been working on 2 Java projects, a Tic Tac Toe Engine and an Android Tic Tac Toe that uses the engine as a dependency. Both of these projects use the Gradle build tool, and in this post I will show you how I set it up and what plugin does. 

Before I go into my personal Gradle setup, I will explain what Gradle is, and why I chose it over other build tools.  The description from the Gradle website says: 

>Gradle combines the power and flexibility of Ant with the dependency management and conventions of Maven into a more effective way to build. Powered by a Groovy DSL and packed with innovation...
>

If we remove the buzzwords and jargon, the description could be summed up as: Gradle is a flexible build tool that can script common build tasks, and it follows the maven repository convention. Instead of using XML, Gradle uses Groovy, a dynamically typed language on the JVM, to describe the build. This results in a build file that contains a lot less boilerplate XML, and can be parsed easier by human readers. 

There are a few reasons why I chose Gradle over Maven or Ant, but the greatest factor in me choosing to do so was the fact that it did not use XML in the build file. Compared to Ant or Maven, Gradle's build file is very clean and easy to read because it does not have any XML tags cluttering the information. You can see for yourself how easy it is to read, here is the build file for my Java Tic Tac Toe project: 

{% highlight groovy %}
apply plugin: 'java'
apply plugin: 'application'
apply plugin: 'maven-publish'

mainClassName = 'me.jakenations.Main'

sourceCompatibility = 1.6
targetCompatibility = 1.6

sourceSets {
    main {
        java{
            srcDir 'src/main/me/jakenations'
            }
        }
    test {
        java {
            srcDir 'src/test/me/jakenations'
        }
    }
}

jar {
    manifest {
        attributes 'Main-Class': 'me.jakenations.Main'
    }
}

repositories {
    mavenCentral()
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.+'
}

test {
    systemProperties 'property': 'value'
}

run{
    standardInput = System.in
}

group = 'me.jakenations'
version = '1.0'

publishing {
    publications {
        mavenJava(MavenPublication) {
            from components.java
        }
    }
    repositories {
        maven {
            url "http://s3.amazonaws.com/***"
        }
    }
}
{% endhighlight %}The build file looks and reads like JSON, so the structure is familiar and easy to parse for most developers. With headings like repositories and dependencies, it is clear what each section of the build file is for, and because of this design, it was easier to get up and running instead of having to learn the boilerplate XML. Another benefit of Gradle is that it uses Maven conventions when managing dependencies and publishing repositories. While Maven uses XML to declare dependencies and publish repositories, Gradle will do all of the formatting for you without needing to write any XML.

Now that I have gone over some of the benefits of using Gradle, let's take a deeper look at each section of the build file. 

### Plugins 
{% highlight groovy %}
apply plugin: 'java'
apply plugin: 'application'
apply plugin: 'maven-publish'
{% endhighlight %}

The first section of the build file is where you declare the plugins that you will be using for the build. Plugins give you access to certain methods that will be used during the build that range from maintaining dependencies to running the application. This application is using the Java, Application, and Maven Publish plugins, and I will go over each of these in more detail in the coming sections.

###Java Plugin
{% highlight groovy %}
mainClassName = 'me.jakenations.Main'

sourceCompatibility = 1.6
targetCompatibility = 1.6

sourceSets {
    main {
        java{
            srcDir 'src/main/me/jakenations'
            }
        }
    test {
        java {
            srcDir 'src/test/me/jakenations'
        }
    }
}

jar {
    manifest {
        attributes 'Main-Class': 'me.jakenations.Main'
    }
}

repositories {
    mavenCentral()
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.+'
}

test {
    systemProperties 'property': 'value'
}

{% endhighlight %}

This section of code belongs to the Java plugin, and it is responsible for managing the applications dependencies and building the application. The plugin relies on having a mavenized file structure by default, but they can be overridden by declaring the source of the application using the sourceSets method. Application dependencies are managed by declaring the package and the repository where it can be found. Gradle provides a shortcut for dependencies on Maven central, and this is the mavenCentral() method that I used in the file. 

### Application Plugin
{% highlight groovy %}
run{
    standardInput = System.in
}
{% endhighlight %}

The Application plugin is the smallest portion of the build file, and it controls running the application in the command line. You can run the application by calling gradle run in the command line, and gradle will test and run the application for you. The code that is used in this build file resets the standard input because Gradle by default does not set standard input to System.in.

### Maven Publish Plugin
{% highlight groovy %}
group = 'me.jakenations'
version = '1.0'

publishing {
    publications {
        mavenJava(MavenPublication) {
            from components.java
        }
    }
    repositories {
        maven {
            url "http://s3.amazonaws.com/***"
        }
    }
{% endhighlight %}

Lastly we have the Maven-Publish plugin, which is in charge of publishing the application to a remote maven repository. If you have the Java plugin already setup, all you need to do to publish to a maven repository is set the location of there remote repository and pass in the Java plugin components. It is dead simple to publish because Gradle takes care of generating all of the boilerplate for you. 

This is only scratching the surface of what Gradle can do, but my experience with it so far has been great! Check out the [Gradle web page](http://www.gradle.org/), and begin enjoying working on build automation.