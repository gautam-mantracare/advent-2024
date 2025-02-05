#!/bin/bash

# Get the last folder number (assumes folders are named 'day1', 'day2', etc.)
last_day=$(ls -d "day"* | grep -o '[0-9]*' | sort -n | tail -n 1)

# If no 'day' folder is found, start with day1
if [ -z "$last_day" ]; then
    next_day=1
else
    # Increment the last folder number to create the next folder
    next_day=$((last_day + 1))
fi

# Create the new folder
new_folder="day$next_day"
cp -r template $new_folder
mv $new_folder/template.js $new_folder/puzzle1.js

echo "Created folder: $new_folder"