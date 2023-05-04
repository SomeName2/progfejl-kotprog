#! /bin/bash
sudo docker run -it --rm -v "$PWD":/usr/app -w /usr/app --name node --network progfejl -p 3000:3000 node /bin/bash
