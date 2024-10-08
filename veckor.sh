#!/bin/sh

rm -rf veckor
mkdir veckor

nodejs skapaveckor.js

cd veckor
for file in *tex; do
    filename="${file%.*}.pdf"
    echo $filename
    #latex $file -o $filename.dvi
    texi2pdf $file -o $filename > /dev/null 2> /dev/null
done

rm *aux *log *tex
