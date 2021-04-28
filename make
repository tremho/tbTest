#!/bin/zsh

rm -fr build
cd ../thunderbolt-framework; tsc; cd ../tbTest
npm install ../thunderbolt-framework

node_modules/.bin/tbx build

