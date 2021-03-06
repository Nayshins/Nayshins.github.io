---
layout: post
title: OO Android
---

This week I have completed my Tic Tac Toe Android app, and I am now working on refactoring and polishing it.  One of the major refactors that I completed was to remove the duplication of code that was shared between the activities of the same game type.

 In order to do this I had to create an abstract activity class that contained the shared behaviors between the activities that controlled games versus humans and games versus computers. While this seems like a straightforward refactor, there were some snags because of the way that the activity class works. Because each subclass of the activity class must call an onCreate method that calls its superclass when it is created, I had to come up with a way for the base class to call all the way up to the Activity class. I was able to do this by having the base class call its super class and the super class to call the activity class, and it was able to start the new activity while sharing the behavior between two different activities.