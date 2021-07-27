#!/bin/zsh

rm -fr build
cd ../thunderbolt-common; tsc;  npm link
cd ../thunderbolt-desktop; tsc; npm link
cd ../thunderbolt-mobile; tsc; npm link
cd ../thunderbolt-cli; tsc; npm link
cd ../tbTest
npm link @tremho/jove-desktop
npm link @tremho/jove-common
npm link @tremho/jove-cli
tbx build --clean 




