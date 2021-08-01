#!/bin/zsh

rm -fr build
echo "remove npm @tremho modules"
npm uninstall @tremho/jove-desktop @tremho/jove-common @tremho/jove-cli

echo "updating common"
cd ../thunderbolt-common; tsc;  npm link
echo "updating desktop"
cd ../thunderbolt-desktop; tsc; npm link
echo "updating mobile"
cd ../thunderbolt-mobile; tsc; npm link
echo "updating cli"
cd ../thunderbolt-cli; tsc; npm link
cd ../tbTest


echo "linking desktop, common and cli"
# Note npm link is removing others in @tremho on each invocation. So do first one and then others manually
npm link @tremho/jove-desktop
cd node_modules/@tremho
ln -s ../../../thunderbolt-common jove-common
ln -s ../../../thunderbolt-cli jove-cli
cd ../..


cd node_modules/@tremho/jove-desktop
npm install
cd ../jove-cli
npm install
cd ../../..


# todo: fix bug in framework that fails if these don't exist
rm -fr build .gen
mkdir build .gen

tbx build --clean

