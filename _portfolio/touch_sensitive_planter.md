---
layout: portfolio_item/top_image_grid
title: Touch Sensitive Planter
description: A plant that talks when you touch it!
tags: [electronics, laser cutting, arduino]
images: [featured.jpg, CAD.png, CAD_exploded.png, base.jpg, acrylic_cement.jpg, electronics.jpg]
---
## Intro
This project was originally conceived of during the walk back from a trip to OSH for my gardening Design Lab. We had to build a planter for the class, but I decided to spice it up a little. At the time I had been playing around with simple Arduino capacitive sensors and I figured that plants might be conductive enough to act as a sensor. Add some lights and sounds and you get a touch sensitive planter! At the moment it pulses colors in relation to how close you are and says a sassy remark if you touch it.

## Electronics
I worked out the electronics early in the project, while still in the gardening Design Lab. It’s all controlled and powered through an Arduino UNO. 5v power and Neopixel data are shared through a splitter cable I soldered up. Power and data are then shared from Neopixel to Neopixel around the top panel of the base. The Adafruit AudioFx board is powered off the same splitter and has a trigger cable running from pin 4 to Arduino pin 4. I had been planning to trigger each sound individually but eventually found it easier to use the built in random trigger, necessitating only the one trigger wire. The speaker is just wired across one of the channels of the sound board.

## Physical Design
I started out designing it by measuring out all the electronics. Since the planter had to contain them, I had to work out the physical size around them. After playing around with a couple ideas, I settled on the simple stacked shapes you see now. I preferred wood for the construction, due to its price, aesthetic and metric dimensions (I found 5mm plywood quite easily). For increased water-resistance and to add some variation however, I decided on white 4.5mm acrylic for the planter portion.

## CAD
I decided to CAD the entire project in 123D Design as this was my first more intricate laser cutting project. I started by modeling the inside faces and extruding them based on their material thickness. Adding the teeth were a bit more complicated however. Since all the joints on the planter section were obtuse, all the teeth needed a corresponding cutout to fit them. For looks I also decided to make the teeth align with the edge of the joint. Using a bit of trig and angles measured in CAD, I worked out the dimensions as shown. Something to note if you care about orientation of your material, make sure that you choose the correct side of your part to export.

## Construction
After laser cutting out all the pieces I glued the wood and electronics together with got glue and the acrylic with a mix acrylic cement and super glue. The top of the base is not glued on and is trapped on the antenna, allowing for repairs or changes if needed. Otherwise, it’s pretty self explanatory!

## Programming
I’d rather not go into a detailed explanation of the code, but I’ll do a general overview; if you want to know more, feel free to contact me. On startup it initializes the Neopixel and touch sensor objects, then runs touch offset and scale calibrations. Once the loop begins, the touch sensor is read, Neopixel color values are incremented, the sounds are played if desired and the loop is delayed based on the touch value.

## Testing
Right after I finished our school attended Maker Faire Bay Area so I brought it along. Little kids really seemed to like it, they kept pulling the plant out of the soil! This project was also displayed at the Oracle Education Foundation’s Design Lab at Oracle Open World.
