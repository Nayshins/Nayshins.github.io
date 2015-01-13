---
layout: post
title: The Seam Model
---

As I continued reading Michael Feathers' book Working Effective With Legacy
code, I reached a chapter on something called The Seam Model. Michael starts off
this chapter with an idea that I have run into before, and that is that existing
code is poorly suited to testing. I have run into the issue that if I do not
plan ahead of time or do not practice TDD, that I will get to a piece of code
that is poorly suited for testing. One reason that this code is not
suited to being tested is that certain dependencies do not work in a test
environment, or that the classes intended behavior does not suit a test
environment.

In order to get around this issue, Michael brings up the idea of the code seam.
A code seam is a place where you can alter behavior in your program without
editing its source code. Immediately I thought of the dependency inversion
principle because relying on an interface instead of a dependency is a code
seam. Because there is an interface, we can pass in any object we want that
implements the interface. This is the code seam that I am most familiar with in
OOP, but Michael goes into great detail about code seams in C++ as well. 

The next few chapters start go into a FAQ style, and I look forward into finding
sections that I can apply to my everyday programming toolkit. 
