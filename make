#!/bin/zsh

rm -fr build
cd ../thunderbolt-common; tsc;  npm link
cd ../thunderbolt-desktop; tsc; npm link
cd ../thunderbolt-mobile; tsc; npm link
cd ../thunderbolt-cli; tsc; npm link
cd ../tbTest
npm link thunderbolt-desktop
npm link thunderbolt-common
npm link thunderbolt-cli
tbx build .

