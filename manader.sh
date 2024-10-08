#!/bin/sh

rm -rf manader
mkdir manader

nodejs skapamanader.js

cd manader
for file in *tex; do
    filename="${file%.*}.pdf"
    echo $filename
    texi2pdf $file -o $filename > /dev/null 2> /dev/null
done

rm *aux *log *tex