#!/bin/bash
cd /home/ubuntu
sudo docker rmi -f $(docker images -a -q)
sudo docker pull sand050965/taipei-day-trip:latest