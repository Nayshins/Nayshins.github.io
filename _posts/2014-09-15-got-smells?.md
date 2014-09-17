Oh, What a glorious day! That program you have been working on for many days is finally done, and you are now ready to share it with the world. Well almost... While going over your code from the previous day's work, you have noticed that your code has started to develop a certain odor. This odor should not actually smell (if it does, maybe you need a shower), but instead it is  some working code that could turn into a problem in the future. Take sushi for example, a bad piece of fish is still sushi, but it could lead to (intestinal) problems in the future. Just like bad fish, code smells are something that you want to actively remove from your codebase.

Today during a code review with my mentor, we uncovered a particularly odoriferous method within my Tic Tac Toe game loop.

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

The purpose of the above code is to determine whether the current player is a human or computer, and then call their class specific method to make a move. While the code works, what would happen if the requirements changed, and now an animal player must be added to the game as well? If I were to keep the same code structure it would look something like this :

{% highlight java %}
while (!rules.gameOver(board)){
       if (currentPlayer instanceof HumanPlayer){
             currentPlayer.selectMove();
       } else if(currentPlayer instanceof ComputerPlayer) {
             console.computerMove();
          	currentPlayer.makeMove(currentPlayer.unbeatableComputer());
       } else if (currentPlayer instanceOf AnimalPlayer) {
		currentPlayer.animalMove();
	 }	
       console.printBoard();
       switchPlayers();
}
{% endhighlight%}

The only way to get this program to continue functioning in it's current state is to add another statement to the conditional. This is not a sustainable fix to the problem because if another type of player is added to the game, the pattern of adding statements to the conditional will continue, and this method will begin to bloat in size. This is not good, and something has to be done to prevent the coming bloat.

In his book *Refactoring*, Martin Fowler describes this code smell as: "You have a conditional that chooses different behavior depending on the type of an object." This statement accurately describes the situation the code is in because the conditional selects the appropriate make move method for each type of object. Luckily, this is a book about refactoring, and Martin gives a solution to refactor the problem code: "Move each leg of the conditional to an overriding method in a subclass. Make the original method abstract." While his solution makes sense, it uses a bit of jargon, so lets break it down into steps.

The first step in the refactoring process is to change each leg of the conditional into a method that shares the same name but does something different. This is called an overriding method because it will override an inherited method with the method you specified in the subclass. After making this change the code will look something like this:

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

Completing the first step has cleaned up each leg of the conditional, but the method still requires the conditional statement in order to run. In order to remove the conditional statement from the code entirely, the second step, making the original method abstract, must be completed. To clarify what this means, lets take a look at a model of the current class structure:

![UML](http://i57.tinypic.com/2h31r80.png)

Currently each player object has its own separate method selectMove(), but since each is a subclass of Player, we can set selectMove() as an abstract method in the player class. Doing so will allow us to remove the conditional from the method, and call selectMove() on any player object. This will allow us to access the intended behavior from each object without the need for a long and complicated conditional statement. Here are the results from the refactor: 

![UML2](http://i58.tinypic.com/14slgt1.png)

{% highlight java %}
while (!rules.gameOver(board)){
	currentPlayer.selectMove();
 	console.printBoard();
 	switchPlayers();
}
{% endhighlight%}

Look at that, after making the changes to the player objects, there is no longer a need for the bloated conditional statement, and the method no longer needs to know the type of object it is currently dealing with. This is made possible by the object oriented principle of polymorphism. Polymorphism comes from the Greek words many and forms, and that is exactly how the player class now acts: it has many forms. Because they all share the same superclass, the player objects are now hidden from the rest of the program, but they still produce the same behaviors. 

Now the code has one less smell to deal with, and we can move on to the next refactor another day.