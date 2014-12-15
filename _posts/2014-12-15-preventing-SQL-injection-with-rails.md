---
layout: post
title: Preventing SQL Injection With Rails
---

After a few months of not working with ruby or rails, I am once again working in my native tongue, and it is an exciting experience to apply my new skills to the first language I learned. Today I worked on a story to improve a controller method to use one query instead of 3, and it required using some raw SQL in the code. This gave me a flashback to when I was in Dev Bootcamp working on the SQL injection assignment because whenever you use raw SQL in your code, you open yourself up to an attack known as SQL injection. SQL injection is a very simple attack on your system that occurs when a malicious user enters SQL into your program via one of your user facing endpoints (e.g. a search bar or url), and you in turn insert the malicious SQL into your program. 
An example of an unprotected query:
{% highlight ruby%}
user_input = params[:input]

secret_data = SecretData.where("client_email = #{user_input}")

# If a malicious user were to input this '); DELETE FROM SecretData" into the query, all of the data in the table would be deleted
{%endhighlight%}

The malicious SQL works by first ending the programs existing SQL query, and then insert its own SQL statement that deletes all the data from the table. While this is an incredibly simple attack, there is an equally simple way to protect your program from such attacks, and in rails this can be done by parameterizing your query. An example of a parameterized query is:

{% highlight ruby%}
user_input = params[:input]

secret_data = SecretData.where("client_email = ?", user_input)
{%endhighlight%}

This parameterized query prevents SQL injection by sanitizing the SQL statement, and prevents the statement from being closed by the input SQL string. By making this simple change you prevent your program from being attacked by a very simple yet dangerous cyber attack. 
