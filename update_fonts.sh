#!/bin/bash
FILE=fonts.zip
curl -s "https://fonts.google.com/download?family=Roboto%20Slab|Lato|Raleway" > $FILE && unzip $FILE -d public/fonts
rm $FILE
echo "Done!"