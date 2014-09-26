As I described in my previous blog, one of the largest complaints that I have had while building my android app has been the speed of the emulator. Yesterday I decided that something had to be done about it because my previously quick Tic Tac Toe algorithm had become abysmally slow. What used to take less than a second on the console, was now taking over 10 seconds. It was time to do some research and figure out how to make it faster.

##Graphics Acceleration

The main reason that the emulator is slow is simply the fact that it is an emulator. Emulators are inherently slow because what they do is make a software representation of a piece of hardware, and the software copy is nowhere near as powerful as the hardware device. This is especially true when it comes to graphics processing.  

The Android SDK now allows you to enable graphics acceleration. When enabled, this moves the graphics processing from inside the emulator to the dedicated graphics processing unit (GPU)  that is built into your computer. When enabled you should see a drastic improvement in the way the graphics load on the emulator.

The only thing that you must do in order to implement the graphics acceleration on the Android Virtual Device (AVD) is to set GPU emulation to yes during the initial set up of the device. That's it. If you are using Android Studio as your IDE this is what the check box looks like:

![GPU acceleration](http://i58.tinypic.com/w2k9zb.png)

After setting this option, and restarting the emulator you should notice a difference in the quality of the graphics rendered.

## Processor Acceleration

This is also a problem that has the same root as the graphics, the emulator is trying to emulate the processor instead of using the processor that is running your computer. If you are using one of the newer intel processors, you have an option to install a hardware accelerator that will make the emulator an order of magnitude faster.  

The first step in order to implement processor acceleration is to download the Intel Hardware Accelerated Execution Manager (HAXM). You can download that [here at intel.](https://software.intel.com/en-us/android/articles/intel-hardware-accelerated-execution-manager) check to make sure the that the HAXM is running by going to your console and running: 
{% highlight bash %}
kextstat | grep intel
{% endhighlight %}
This should return a status message that contains the following extension name:
{% highlight bash %}
com.intel.kext.intelhaxm
{% endhighlight %}

If you don't see the message, make sure that you have properly installed the HAXM.

Once you have installed the HAXM, you will need to download the x86 Emulator System Image. Since most android phones use an ARM processor, this allows you to run an emulator that matches your computers processor architecture instead of having to emulate an ARM core. You can download the system image [here.](https://software.intel.com/en-us/android/articles/android-44-kitkat-x86-emulator-system-image)

After you have downloaded and installed the system image, go to the AVD manager where you enabled the GPU acceleration. In the drop down box called CPU/ABI, select the Intel Atom (x86) processor.
 
![Processor](http://i62.tinypic.com/122i1cx.png)

## Boot It Up
Now that you have enabled these two steps, boot up your emulator and you should see a noticeable improvement in its speed. In another blog post I will go over some changes that you can do to your program that will make it run faster as well.