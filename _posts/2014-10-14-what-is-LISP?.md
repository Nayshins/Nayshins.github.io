---
layout: post
title: What is LISP?
---

In my previous blog post, I described Clojure as " a dynamically typed Lisp on the JVM," but that description seems to leave a pretty big question unanswered: what is a Lisp?  The description from Wikipedia describes Lisp as, " a family of computer programming languages with a long history and a distinctive, fully parenthesized Polish prefix notation." Again this isn't very helpful either, and since it raises more questions, I will start with what Lisp stands for. 

Lisp gets its name from "LISt Processing" because lists are a major part of the language. In a Lisp program all code and data is written as lists surrounded by parenthesis, called symbolic-expressions or s-expressions. This reliance on writing functions and data as lists is what gives the language it's flexibility. Because functions can be processed like data, functions can manipulate other functions outputs easily. 

{% highlight clojure %}
; an example of an s-expression
(+ 1 2) 
{% endhighlight %}While the above code may look strange to you, it is a very simple function written as an s-expression that adds 1 and 2 and returns 3. The reason the function looks strange is because it is written using Polish prefix notation. Polish prefix notation means that the operator is written first and the operands, things that the operator performs on are written to the left of it. When in school everyone leans how to do infix operation where the operator is in the middle of the two operators, but there is a downside to infix notation: the order of operations is not defined in the structure of the notation. When using infix notation, you need to memorize which operations come first (remember PEMDAS?), but this is not necessary in prefix notation because operations are only performed when there are 2 operands available to be used. This gives you a very straight forward and easy to follow order of operations, and is the reason it is used in Lisp!

Lisp and functional programming is still new to me, but I am looking forward to using the power of Lisp to start metaprogramming using Clojure macros that manipulate functions as data. 