---
layout: post
title: Working With Two Projects at the Same Time
---
While working on my clojure http server this week, I ran into an issue working with one project that relies on another library on my machine. In this case my cob spec server relied on my http server library, but every time I made a change to the http server, I had to push the changes to clojars and then pull them down on my cob spec server. This caused me to run into problems when I made a change on my server library, and my cob spec server did not pick up the new changes. After struggling with this for a few hours, I needed to find another way to do this.

While doing some research on how to work on 2 projects at the same time, I found out about the Meiningen checkouts directory. The checkouts directory symlinks to the directory of the library you want you use, and Leiningen will pull the changes you have made into your new project. Adding this to my project has simplified my workflow, and reduced the amount of errors that I have encountered because of working on two projects.