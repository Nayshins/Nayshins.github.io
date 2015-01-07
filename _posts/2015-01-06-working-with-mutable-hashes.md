---
layout: post
title: Working With Mutable Hashes
---

Last weekend while I was working on a ruby project, I ran into an interesting
issue that made me wish I was working with Clojure again. A part of this project
uses hashes as a primary data structure, and I needed to filter some values out
of that hash in order to only display certain objects. This led me 
into many issues where the hash that I was working with was being
mutated by the methods I was running on it. At first this left me very confused
as to why everything kept changing because when I was working in clojure, this
was a thought I never had to have. I ended up getting it working, but the way
I solved it wasn't the best solution.

While I could not get to a good solution on my own last weekend, another apprentice I was working with showed me how to write a
method to copy the hash. This copy method used a ruby class called Marshal, a
class that is used to serialize objects into data streams. By using the Marshal
class to copy the hash I was working with, I was able to create a method that
returned the copied hash to me, and then I could use this copied hash as an
input to the methods that were mutating my hash.  

