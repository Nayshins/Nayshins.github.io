---
layout: post
title: Lesson in Deployment
---

Last week a craftsman 8th Light, Doug, approached me with an opportunity to deploy an application called Cyber Dojo to Amazon Web Services. This was not my first time deploying an application, and I have come to learn that each one behaves differently. I agreed to help him deploy it, and he sent me a link to the instructions that I would need to deploy the application. After going over the instructions, I felt confident that I could set it up, and then thought the famous last words "how hard could it be?"

The first step in deploying the application was to spin up a virtual machine on the Amazon cloud that had a specific rails image installed on it, and this is where I made my first mistake. Cyber Dojo depends on a system called Docker to run and contain coding exercises in a multitude of different languages, and it requires a 64 bit architecture in order to be installed. I unknowingly spun up a 32 bit image on the virtual machine instead of a 64 bit image on my first install. When I got to the next step, installing Docker, the build failed and I quickly figured out the mistake I made. 

##Whelp, lets try that again...

Having figured out my first error, I spun up a new machine with a 64 bit architecture, and started the install process again. Everything went smoothly up until I had to install Docker again. The installation failed again, but for a different reason. Docker had an issue with the way that they signed their package, and the build script that Cyber Dojo included would not accept the unsigned package. I was able to remedy the situation by manually installing docker and accepting the unsigned package. After getting Docker installed, the rest of the deployment went smoothly, and I had a working application deployed on Amazon Web Services.

##Not out of the woods yet!

The next day Doug came to me and said that the application was running slowly, so we went to take a look at what could make the application run so slowly. Well it turns out that it was running slowly because overnight about 20 new processes were installed on the machine overnight. How on earth did that happen? Since I was using the ec2 CLI tools to access the server, I did not realize that the root password for the linux box was set to "password" by the rails image installer. This is the probably the second worst thing you can do besides not put a password on a public facing server! After rebuilding the server and making sure the root password was not "password", the server remained stable, and it was able to be used for a training class the next week.

## Lessons Learned

I learned two really important lessons from deploying this app:

1. NEVER use "password" as a password on a public facing server
2. DO NOT allow SSH access to the root of a public facing server

Overall this was a great experience, and I look forward to working on more deployments in the future!