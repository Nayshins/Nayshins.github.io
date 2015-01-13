---
title: Working With Legacy Code
layout: post
---

I recently began reading the book Working Effectively With Legacy Code by
Michael Feathers, and it has opened my eyes to a world of code that I have never
encountered before, legacy code. While many people describe legacy code as code that is old and difficult to work with,
Michael describes legacy code as a code base that is not supported by an automated test suite.
Code without tests is legacy code because code without tests is difficult to
change, and code that is difficult to change is legacy code!

From here the book goes on to describe that getting code from legacy code to
clean code is a long process, and that even the best teams will take a long time
to make that change. 

After the preface the first chapter goes over the four reasons to change
software. These four reasons are:

1. Adding a feature
2. Fixing a bug
3. Improving the design
4. Optimizing resource usage

The first two reasons are very straightforward because they are the main job of
software developers. We create new features by adding or changing the behavior
of the program. While it seems very obvious that this is what software
developers do, the process of developing become much more difficult when having
to work with legacy code. The legacy code makes it more difficult to add,
change, or fix features because any changes that the developer makes could be
affecting another part of the system, and because there is no test suite set for
the application, the developer has no feedback loop to know if they are breaking
the program.

The other reasons for changing the software are a bit different from adding a
feature or fixing a bug because they should not change the behavior of the
software, but will change how the software runs or how it is structured. These
changes also require the code to be under test in order to make sure that the
software does not change its behavior.

This book is packed with resources about how to approach a legacy code base and
how to get it into a well tested state. I look forward to finishing it and
writing more blogs about it!
