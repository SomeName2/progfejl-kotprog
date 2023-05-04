#! /bin/bash
sudo docker run -it --rm -v "$PWD":/usr/app -w /usr/app --name angular --network progfejl -p 4200:4200 angular /bin/bash
