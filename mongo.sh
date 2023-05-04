#! /bin/bash
sudo docker run --rm -v "$PWD"/db:/data/db --name mongo --network progfejl mongo
