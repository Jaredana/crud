#!/bin/bash
#cd /home/laps/Documents/projects/MEANStackProjects/crud
xdg-open 'http:/localhost:4200/'
(cd node;npm start &);(cd crud;ng serve &)

