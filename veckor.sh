#!/bin/sh

rm -rf veckor
mkdir veckor

nodejs skapaveckor.js

cd veckor
for folder in */ ; do
    echo "In $folder"
    cd $folder
    for texFile in *tex; do
        filename="${texFile%.*}.pdf"
        echo " - $filename"
        #latex $file -o $filename.dvi
        texi2pdf $texFile -o $filename > /dev/null 2> /dev/null
    done
    cd ..
done

find -name "*aux" -or -name "*log" -or -name "*tex" | xargs rm
