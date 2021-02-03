#!/bin/bash

# Delete the preexisting files so if something with this script goes wrong it'll fail noisily when you go to commit.
rm public/resume.*

# Tell Bash to exit if a command fails.
set -e 
set -o pipefail

# Use PDFJam to convert development resume webpage to PDF so that characters don't get merged into single glyphs.
# Exported PDFSHIFT_API_KEY variable from my environment and the first argument (`dry`-run or not) are used for arguments.
# The `:` after the key starts the password portion of the authentication string, which is empty.
curl \
    -u "$PDFSHIFT_API_KEY:" \
    -d source="https://develop.davidbol.es/resume" \
    -d pages="1"\
    -d format="Ledger"\
    -d landscape="true"\
    -d sandbox="$(if [ "$1" == "dry" ]; then echo "true"; else echo "false"; fi)"\
    https://api.pdfshift.io/v2/convert/ \
    -o public/resume.pdf
# PDFJam has a weird spacing bug so it's exported larger than it should be and cropped.
pdfjam --trim '0in 6in 2.5in 0in' --clip true public/resume.pdf --outfile public/resume.pdf
# Convert the PDF to an image with 288 PPI (4*PDF's 72, but that's arbitrary).
convert -density 300 public/resume.pdf public/resume.png

echo "Done!"