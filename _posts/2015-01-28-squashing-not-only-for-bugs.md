---
layout: post
title: Squashing, Not Only for Bugs
---

When you think of the word squash in a software context, is bug the first thing
that comes to your mind? That is definitely the first thing that comes to my
mind too, but today I learned about another thing that can be squashed, git
commits. After I submitted a pull request for the project that I am currently
working on, the pull request reviewer asked me to squash my commits. At first I
had no idea what squashing was, so I did the usual and searched "squash commit"
in google. The result of that search informed me that by using the git
interactive rebase tool, I could combine many commits into a single commit. 

Well that answered one question, but it presented me we another one: why do I
want to squash all my commits into just a single one? I did some more googling,
and I think I came up with a very good reason: keeping your master branch clean
and providing a clear path of what features are being merged.  While it is important to keep
detailed track of your progress while building a feature, pulling many small
commits into the master branch can pollute the log with unneeded commits. Is it
better to have a log that is succinct or overly detailed to the point of being
unreadable? 

So now that I know why it is sometimes a good reason to squash your commits, how
do I go about doing so? If I wanted to squash my last 2 commits, first I would
enter:

{% highlight bash %}
$ git rebase -i HEAD~2

pick f7f3f6d Add new feature
pick 310154e Fix some spelling

# Rebase 710f0f8..310154e onto 710f0f8
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
{% endhighlight %}

After you enter the commad "git rebase -i <range>", you are taken to the
interactive rebase tool, shown under the command. This tool shows you the commit
range that you have selected with oldest at the top and newest at the bottom.
Now to get to the squashing! In order to squash your new erroneous commit into
the older more important commit, all you have to do is change the word "pick" to
"squash." After changing the word, save and quit your editor, and a new screen
will come up in your editor. This screen is the verbose commit screen, and this
is where you will write a new commit message for the squashed commit. Thats it! 


