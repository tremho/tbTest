#!/bin/zsh

rm -fr build
cd ../thunderbolt-common; tsc
cd ../thunderbolt-desktop; tsc
cd ../thunderbolt-mobile; tsc
cd ../thunderbolt-cli; tsc
cd ../tbTest
npm link ../thunderbolt-desktop
npm link ../thunderbolt-common
tbx build .

