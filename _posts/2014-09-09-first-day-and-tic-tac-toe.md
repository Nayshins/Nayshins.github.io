Yesterday was my first day as a resident apprentice at 8th Light, and I will have you know that I only panicked once, the whole morning. My morning started at 9:00 AM when I met my mentor Colin downstairs at the 8th Light offices, and after going over the apprenticeship goals, I received my first apprentice project, which was to create an unbeatable game of Tic Tac Toe in Java. This project also came with the caveat that I must follow the three rules of test driven design (TDD). 

Having done some work with Java before, I was aware of the challenge that I had ahead of me. The first time I worked through the unbeatable Tic Tac Toe game, I used Ruby as my programming language of choice because of my familiarity it. While Java is a very large language, I quickly found that I was missing Ruby's enumerable module and functional blocks. Because of Java's static typing, what took me only one line in ruby, took much more coding in Java. For example the code to find the index of a certain piece on the board in ruby:
{% highlight ruby %}
 def locations(piece) #returns the index of 'X', 'O', or ' '
    grid.each_index.select { |index| grid[index] == piece }
  end
{% endhighlight %}

compared to Java:
{% highlight java %}
 public ArrayList<Integer> getLocations(char x) {
        ArrayList<Integer> locations = new ArrayList<Integer>();
        for (int i = 0; i < grid.length; i++) {
            if (grid[i] == x) {
                locations.add(i);
            }
        }
        return locations;
    }
{% endhighlight %}

While Java is much more verbose, the benefit is that I know exactly what the function will return no matter what because of the static typing. 

Now that I've got my first day behind me, I am ready to continue on the Tic Tac Toe project today, and hopefully make it to the point where I can rewrite the Negamax Algorithm in Java.