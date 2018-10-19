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


## getSessionId(key)

Receives the session key and returns the sessionId with given key.If session diesn't exists,it creates random id and set into session storage
```javascript

    var input = 'cb_tab'

    heartyhelper.getSessionId(input)
    Output: 'MbNhIUq2HhwgTGCyINGPXg8SgnlwWf'

 ```


## isObject(obj)

Receives Object as input and returns if the provided input is pure object or not
```javascript

    var input = []
    
    heartyhelper.isObject(input)
    Output: false

```


## getSizeOfObject(obj)

Receives Object as input and returns size of the object input, If the input is not object, it returns null
```javascript

    var input = { id: 'MbNhIUq2HhwgTGCyINGPXg8SgnlwWf' }
    
    heartyhelper.getSizeOfObject(input)
    Output: 1

```


## isObjectEmpty

Receives Object as input and returns if input Object is empty or not
```javascript

    var input = { id: 'MbNhIUq2HhwgTGCyINGPXg8SgnlwWf' }

    heartyhelper.isObjectEmpty(input)
    Output: false

```


## isJson

Receives Object as input and returns if input is JSON or not
```javascript

    var input = "{ "id": 1 , "name":"srinivas"}"

    heartyhelper.isJson(input)
    Output: true

```


## isAlphanumeric

Receives String as input and returns if string is aplha numaric or not
```javascript

    var input = 'sssdee333@'

    heartyhelper.isAlphanumeric(input)
    Output: false

```


## removeSpaces

Receives String as input and returns string by removing all the spaces 
```javascript

    var input = 'hello all welcome to npm'

    heartyhelper.removeSpaces(input)
    Output: 'helloallwelcometonpm'

```


## getRandomString

Receives length of random string needed as input and returns random string with given input length
```javascript

    var input = 10

    heartyhelper.getRandomString(input)
    Output: 'Y0X21OHdUB'

```


## getRandomNumber

Returns random number of length 13 without providing any input
```javascript

    //no input required

    heartyhelper.getRandomNumber()
    Output: 1539077573404

```


## setCookie

Receives parameters for cookie such as cookiee name, value, and expiry date. It sets into mentioned domain.If no domain name is provided, cookie will be set '/' domain.  
```javascript

    var input : { cname: 'b2bRefeeral', cvalue: 1, expires: parseInt(1) }

    heartyhelper.setCookie(input)
    Output: it sets cookie with given params

```


## getCookie

Receives cookie name from input and returns the value of the cookie  
```javascript

    var input = 'cname'

    heartyhelper.getCookie(input)
    Output: 'fghbfhfhf22228789'

```


## sendHttpRequest

Receives required parameters for sending http request such as reuqest type, data, url, callback, ASYNC and sends the http request and returns the response
```javascript

    var input = ('POST',{'id:1,name:'srinivas'},'http://srinivasnarayansetty.com/getData',setBotResponse,true)
    
    heartyhelper.sendHttpRequest(input)
    Output: responseText, status code

```

## Demo
Demo @[hearty-helper](https://tonicdev.com/npm/hearty-helper)
| https://tonicdev.com/npm/hearty-helper

## Author
Srinivas N [srinivas69cse@gmail.com]

## Licence
MIT @[Srinivas_N](srinivasnarayansetty.com/)














<!-- [![Coverage Status](https://coveralls.io/repos/github/SrinivasNarayansetty/hearty-helper/badge.svg)](https://coveralls.io/github/SrinivasNarayansetty/hearty-helper) -->
