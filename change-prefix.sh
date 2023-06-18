#!/bin/bash

# Define the directory where your source code files are located
SOURCE_DIR="./src/lib"

#Define the type of object you want to modify
OBJECT="type"

#Define Preffix you want to get rid of
OLD_PREFIX="I"

#Define the new Preffix you want
NEW_PREFIX="T"

# Find all source code files with .tsx or .ts extension
FILES=$(find "$SOURCE_DIR" -type f \( -name "*.tsx" -o -name "*.ts" \))


# Iterate over each file
for FILE in $FILES; do
    # Check if the file contains the object followed by old prefix and an uppercase letter before the object name
    if grep -q -E "\<$OBJECT[[:space:]]+$OLD_PREFIX[A-Za-z0-9_]*[^[:alnum:]_]" "$FILE"; then
        # Remove the old prefix and add the new prefix using sed
        sed -i -E "s/(\<$OBJECT[[:space:]]+)$OLD_PREFIX([A-Za-z0-9_]*[^[:alnum:]_]+)/\1$NEW_PREFIX\2/g" "$FILE"
        echo "Modified $FILE"
    elif grep -q -E "\<$OBJECT[[:space:]]+$NEW_PREFIX[A-Za-z0-9_]*[^[:alnum:]_]" "$FILE"; then
        # skips the object
        echo "Skipped $OBJECT in $FILE!"
    elif grep -q -E "\<$OBJECT[[:space:]]+[A-Za-z0-9_]*[^[:alnum:]_]" "$FILE"; then
        # Add the new prefix to the object names using sed
        sed -i -E "s/\<$OBJECT[[:space:]]+([A-Za-z0-9_]*[^[:alnum:]_])/$OBJECT $NEW_PREFIX\1/g" "$FILE"
        echo "Modified $FILE"
    fi
done
