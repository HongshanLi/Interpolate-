#!/bin/bash

# copying pdf files from dev server to prod server and verse versa

echo "copying files to the production server"

rsync -abviuzP assets/pdfDocuments/ root@206.189.199.148:/home/hongshan/Interpolate-/backend/assets/pdfDocuments/

echo "coying files to the dev server"


rsync -abviuzP root@206.189.199.148:/home/hongshan/Interpolate-/backend/assets/pdfDocuments/ assets/pdfDocuments/
