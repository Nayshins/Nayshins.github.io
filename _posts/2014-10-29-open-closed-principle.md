---
layout: post
title: Open Closed Principle
---

Continuing my series of blog posts on the SOLID principles of software design, this post will pick up after the Single Responsibility principle and move on to the Open Closed Principle (OCP). The OCP is described by Bob Martin as, "SOFTWARE ENTITIES (CLASSES, MODULES, FUNCTIONS, ETC.) 
SHOULD BE OPEN FOR EXTENSION, BUT CLOSED FOR
MODIFICATION." 

## Open for Extension

Open for extension at first seems like a very broad idea, but at its basic, level it means that the behavior of the module can be extended. Extension is different than modification: extension means to add on to the existing platform, while modification means to change the underlying platform. If a new requirement were to be added, being open to extension would make it an easy process to bring the new behavior into the application by extending it instead of having to modify it.

## Closed to Modification

As discussed in the above paragraph, modification means that you change the underlying code of the module. The OCP states that modules should be closed to modification, so how are you supposed to make changes to your software? Following the OCP, you would make these changes by extending the module, but this begins to seem like it is a closed loop because in order to extend the program you will need to first modify it to become extensible.

## How do I make my program extensible?

The best way to make your program extensible is to make an abstraction that would handle all of the different extensions to your program. This relates back to an earlier blog post I did on a refactor from a conditional to polymorphism because at the time I was unknowingly fixing my program to conform to the OCP.

This is the original un-refactored code for my make move method in my unbeatable Tic Tac Toe engine written in Java:

{% highlight java %}
while (!rules.gameOver(board)){
      if (currentPlayer instanceof HumanPlayer){
            currentPlayer.selectMove();
      } else if(currentPlayer instanceof ComputerPlayer) {
             console.computerMove();
             currentPlayer.makeMove(currentPlayer.unbeatableComputer());
      }
      console.printBoard();
      switchPlayers();
}
{% endhighlight%}

This code is in violation of the OCP because it can not be changed without modifying the underlying code of the method. If I wanted to add a different class of player (say an animal) to the program, I would have to do something like this:

{% highlight java %}

while (!rules.gameOver(board)){
       if (currentPlayer instanceof HumanPlayer){
             currentPlayer.selectMove();
       } else if(currentPlayer instanceof ComputerPlayer) {
           currentPlayer.selectMove();
       } else if (currentPlayer instanceOf AnimalPlayer) {
                        currentPlayer.selectMove();
            }
       console.printBoard();
       switchPlayers();
}
{% endhighlight%}

Because I directly modified the function in control of making a move, I violated the OCP because I modified instead of extended, so how can I fix this by extending instead of modifying?

Abstraction is the answer here. In order for me to be able to extend the types of players indefinitely, I have to create an abstract interface that all types of players must implement. This is the design of the final function:

![UML2](http://i58.tinypic.com/14slgt1.png)


{% highlight java %}
while (!rules.gameOver(board)){
      currentPlayer.selectMove();
      console.printBoard();
      switchPlayers();
}
{% endhighlight%}

## Takeaway

In order to be in compliance with the OCP, your program needs to be able to create extendable interfaces that can add behavior without the need to modify the source.