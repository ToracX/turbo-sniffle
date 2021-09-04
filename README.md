# Overview

Lightweight homebridge plugin that allows you to control your DreamScreen Ambient TV device with homekit.
Features full control over color, video, ambient and sleep mode.                
It uses my python script featured here: https://github.com/ToracX/DreamScreenCommander


## Installation:


install homebridge: ```npm install -g homebridge```                        
install this plugin: ```npm install -g homebridge-dreamscreen```                   
update your ```~/.homebridge/config.json``` file with correct ip adress, see below.

## Example config:
#### Dont forget to set the correct ip.
```
"accessories": [
  {
   	  "accessory": "Dreamscreen",
   	  "name": "TV Backlight",
      "ipadress": "192.168.178.187"
  }
]
```
#### The ip adress of you're dreamscreen can be found in the app under "Update and Reset".

## Using the plugin
You get two accesoires packed in one tile, seperating them is completely possible 

First accesoiry is the led slider, this has two main functions.
* Changing brightness, simply by sliding to an exact percentage.
* Changing color, when you change the color the dreamscreen gets set to ambient mode and will display the set color.

Second accesoiry is the switch, this is used for setting the mode. 
* Flipping it on enables video mode / amiblight. 
* Flipping it off puts the dreamscreen to sleep.

Third accesoiry is the switch, this is used for setting the mode.
* Flipping it on enables ambient mode. 
* Flipping it off puts the dreamscreen to video mode.

4th accesoiry is the switch, this is used for setting the mode.
* Flipping it on enables music mode. 
* Flipping it off puts the dreamscreen to video mode.

5th accesoiry is the switch, this is used for switch between ambient modes.
* Flipping it on enables Pop Scene. 
* Flipping it off puts the dreamscreen to Forrest Scene.

6th accesoiry is the switch, this is used for switch between ambient modes.
* Flipping it on enables July 4th Scene. 
* Flipping it off puts the dreamscreen to Holiday Scene.

7th accesoiry is the switch, this is used for switch between ambient modes.
* Flipping it on enables Ocean Scene. 
* Flipping it off puts the dreamscreen to Rainbow Scene.

8th accesoiry is the switch, this is used for switch between ambient modes.
* Flipping it on enables Twinkle Scene. 
* Flipping it off puts the dreamscreen to Fireside Scene.


## Ideas for usage
* Automatically adjust Dreamscreen brightness based on room ambient brightness
* Control your Dreamscreen inputs with scenes.
* Set time based events to turn on and off the leds.

If you have any questions, ideas or improvements please fill in an issue form and I will look at it as soon as possible.
