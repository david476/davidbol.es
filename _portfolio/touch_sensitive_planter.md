---
layout: portfolio_item/top_image_grid
title: Touch Sensitive Planter
description: A plant(er) that talks when you touch it!
tags: [electronics, laser cutting, arduino]
images: [featured.jpg, CAD.png, CAD_exploded.png, base.jpg, acrylic_cement.jpg, electronics.jpg]
---
## Intro
This project was originally conceived of during the walk back from a trip to OSH for my gardening [Design Lab](http://www.designtechhighschool.org/about/curriculum/designadvisory). We had to build a planter for the class, but I decided to spice it up a little. At the time I had been playing around with simple Arduino capacitive touch sensors and I figured that plants might be conductive enough to act as one. Add some lights and sounds and you get a touch sensitive planter! At the moment it pulses colors in relation to how close you are and says a sassy remark if you touch it.

## Theory of Operation
The coolest part of this project, detecting you touching the plant, is dependent on [this Arduino library](https://playground.arduino.cc/Main/CapacitiveSensor?from=Main.CapSense). A somewhat conductive object (in this case a plant) is connected to the Arduino through a resistor. The object behaves like a capacitor, being charged and discharged by the Arduino but relatively slowly thanks to the resistor. Another pin on the Arduino is connected directly to the object and the time that it takes for the object to change voltage can be measured. Humans are surprisingly conductive and are quite large; when they touch the object (or even just get close!) it slows down the charge/ discharge time significantly letting your code know to talk!.

## Electronics
I worked out the electronics early in the project, while still in the gardening Design Lab. It’s all controlled and powered through an Arduino UNO. 5v power and Neopixel data are distributed through a splitter cable I soldered up. Power and data are then shared from Neopixel to Neopixel around the top panel of the base. The Adafruit AudioFx board is powered off that splitter and has a trigger cable running from pin 4 to Arduino pin 4. I had been planning to trigger each sound individually but eventually found it easier to use the built in random trigger, necessitating only the one trigger wire. The speaker is wired across just one of the channels of the sound board.

## Physical Design
I started out designing it by measuring out all the electronics. Since the planter had to contain them, I had to design around them. After playing around with a couple ideas, I settled on the simple stacked shapes you see now. I preferred wood for the construction, due to its price, aesthetic and metric dimensions (I found 5mm plywood quite easily). For increased water-resistance and to add some variation however, I decided on white 4.5mm acrylic for the planter portion.

## CAD
I decided to design the entire project in 3D as this was my first more intricate laser cutting project. I started by modeling the inside faces and extruding them based on their material thickness. Adding the teeth were a bit more complicated however. Since all the joints on the planter section weren't 90&deg;, all the teeth needed a corresponding cutout to fit them. For looks I also decided to make the teeth align with the edge of the joint. Using a bit of trig and angles measured in CAD, I worked out the dimensions as shown. Something to note if you care about orientation of your material, make sure that you choose the correct side of your part to export.

## Construction
After laser cutting out all the pieces I glued the wood and electronics together with got glue and the acrylic with a mix acrylic cement and super glue. The top of the base is not glued on and is trapped on the antenna, allowing for repairs or changes if needed. Otherwise, it’s pretty self explanatory!

## Programming
I’d rather not go into a detailed explanation of the code but here's a quick overview. On startup it initializes the Neopixel and touch sensor objects, then runs touch offset and scale calibrations. Once the loop begins, the touch sensor is read, Neopixel color values are incremented, the sounds are played if desired and the loop is delayed based on the touch value.

## Testing
Right after I finished our school attended Maker Faire Bay Area so I brought it along. Little kids really seemed to like it, they kept pulling the plant out of the soil! This project was also displayed at the Oracle Education Foundation’s Design Lab at Oracle Open World.
