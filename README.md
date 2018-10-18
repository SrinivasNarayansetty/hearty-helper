## hearty-helper [![NPM version](https://img.shields.io/npm/v/hearty-helper.svg)](https://www.npmjs.com/package/hearty-helper)

Hearty helper is a small libraray that can provide small helper functions like getting Url parameters, get Session Id, is Object, checking if Empty Object, get Size of Object, etc,.


# Installation

npm i npm i hearty-helper


# Usage 

var heartyhelper = require('hearty-helper')


## geturlParams(url)

Receives the url from input and will return all the parameters passed into one object
```javascript

var inputString = 'http://srinivasnarayansetty.com?originCountry=IN&type=R&date=15/10/2018&version=1.1&ADT=1&CHD=0&INF=0&class=Economy&source=webpage'
 
  heartyhelper.geturlParams(inputString)
  Output: {
       originCountry:IN
       type:R
       date:15/10/2018
       version:1.1
       ADT:1
       CHD:0
       INF:0
       class:Economy
       source:webpage
  }
  
 ```












<!-- [![Coverage Status](https://coveralls.io/repos/github/SrinivasNarayansetty/hearty-helper/badge.svg)](https://coveralls.io/github/SrinivasNarayansetty/hearty-helper) -->
