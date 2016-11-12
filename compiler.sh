#!/usr/bin/env bash

npm install -g gulp
npm install
git config --global user.email "ZarinPal@Travis"
git config --global user.name "ZarinPal@Travis"
git config --global push.default simple
eval "$(ssh-agent -s)" #start the ssh agent
chmod 600 .deploy_key # this key should have push access
ssh-add .deploy_key
git clone -b gh-pages git@github.com:ZarinPal/HomePage.git public
gulp --production
cd public
git add --all .
git commit -m "new release"
git push origin HEAD:gh-pages
