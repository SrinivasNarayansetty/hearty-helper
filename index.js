'use strict';

/**
 * Hearty Helper is a package containing helper functions such as geting url parameters passed, Number conversions
 *
 * @module hearty-helper
 * @typicalname heartyHelper
 * @example
 * var heartyhelper = require('hearty-helper')
 */



/**
 * @name geturlParams
 * @typicalname geturlParams
 * @param {string} text  - Url
 * @return {Object} url parameters passed in object(if no url is passed in parameter, function will consider the current window url)
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var inputString = 'http://srinivasnarayansetty.com?originCountry=IN&type=R&date=15/10/2018&version=1.1&ADT=1&CHD=0&INF=0&class=Economy&source=webpage'
 *
 * heartyhelper.geturlParams(inputString)
 * Output: {
 *      originCountry:IN
 *      type:R
 *      date:15/10/2018
 *      version:1.1
 *      ADT:1
 *      CHD:0
 *      INF:0
 *      class:Economy
 *      source:webpage
 * }
 *
 */

function geturlParams(url) {
    let prop = {}, params_arr, params;

    if (url != undefined) {
        params_arr = url.split('?')[1].split('&');
    } else {
        params = location.search.substring(1);
        params_arr = params.split("&");
    }

    for (var i = 0; i < params_arr.length; i++) {
        var current = params_arr[i].split("=");
        if (current.length > 1) {
            prop[current[0]] = decodeURIComponent(current[1].toString().replace(/\s/, "")); //rtrim
        }
    }

    return prop;
}



/**
 * @name getSessionId
 * @typicalname getSessionId
 * @param {string} text  - sessionKey
 * @return {string} sessionValue(if nothing is present with provided key, function will set random id of 30 charecters length)
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = 'cb_tab'
 *
 * heartyhelper.getSessionId(input)
 * Output: 'MbNhIUq2HhwgTGCyINGPXg8SgnlwWf'
 *
 */

function getSessionId(sessionKey) {
    var tabSession = '';
    if (window.sessionStorage) {
        tabSession = sessionStorage.getItem(sessionKey);
        if (tabSession == null) {
            tabSession = '';
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (var i = 30; i > 0; --i) tabSession += chars[Math.floor(Math.random() * chars.length)];
            sessionStorage.setItem(sessionKey, tabSession);
        }
    }
    return tabSession;
}



/**
 * @name isObject
 * @typicalname isObject
 * @param {object} input  - object
 * @return {Boolean} true if input parameter is pure object or else function will return false
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = []
 *
 * heartyhelper.isObject(input)
 * Output: false
 *
 */

function isObject(data) {
    if (Object.prototype.toString.call(data) == '[object Object]') {
        return true;
    } else {
        return false;
    }
}



/**
 * @name getSizeOfObject
 * @typicalname getSizeOfObject
 * @param {Object} input  - object
 * @return {Number} size of the passed object
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = { id: 'MbNhIUq2HhwgTGCyINGPXg8SgnlwWf' }
 *
 * heartyhelper.getSizeOfObject(input)
 * Output: 1
 *
 */

function getSizeOfObject(data) {
    var size = 0, key;
    if (!isObject(data)) {
        return null;
    } else {
        for (key in data) {
            if (data.hasOwnProperty(key)) size++;
        }
        return size;
    }
}



/**
 * @name isObjectEmpty
 * @typicalname isObjectEmpty
 * @param {Object} input  - object
 * @return {Boolean} true if input parameter is object & it is empty or else function will return false
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = { id: 'MbNhIUq2HhwgTGCyINGPXg8SgnlwWf' }
 *
 * heartyhelper.isObjectEmpty(input)
 * Output: false
 *
 */

function isObjectEmpty(data) {
    if (getSizeOfObject(data) == 0) {
        return true;
    } else {
        return false;
    }
}



/**
 * @name isJson
 * @typicalname isJson
 * @param {String/Object} input  - object
 * @return {Boolean} true if input is JSON or else it will return false
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = "{ "id": 1 , "name":"srinivas"}"
 *
 * heartyhelper.isJson(input)
 * Output: true
 *
 */

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



/**
 * @name isAlphanumeric
 * @typicalname isAlphanumeric
 * @param {string} input  - string
 * @return {Boolean} true if input is alpha numaric & false in other case
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = 'sssdee333@'
 *
 * heartyhelper.isAlphanumeric(input)
 * Output: false
 *
 */
function isAlphanumeric(c) {
    var b = new RegExp("^[a-z0-9]+$", "i");
    var a = b.test(c);
    return a;
}



/**
 * @name removeSpaces
 * @typicalname removeSpaces
 * @param {string} input  - string
 * @return {string} It return string by removing all spaces from the input string 
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = 'hello all welcome to npm'
 *
 * heartyhelper.removeSpaces(input)
 * Output: 'helloallwelcometonpm'
 *
 */

function removeSpaces(str) {
    if (str != '') {
        str = str.replace(/\s/g, '');
    }
    return str;
}



/**
 * @name getRandomString
 * @typicalname getRandomString
 * @param {number} input  - number
 * @return {string} It return random string for specified length. If length is not prrovided, it will consider is as 10 by default
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = 10
 *
 * heartyhelper.getRandomString(input)
 * Output: 'Y0X21OHdUB'
 *
 */
function getRandomString(len) {
    len = len || 10;
    charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}



/**
 * @name getRandomNumber
 * @typicalname getRandomNumber
 * @param {} input  - no input required
 * @return {string} It return random number of 13 charecters length
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * //no input needed
 *
 * heartyhelper.getRandomNumber()
 * Output: 1539077573404
 *
 */

function getRandomNumber() {
    var d = new Date();
    return d.getTime();
}



/**
 * @name setMultipleAttr
 * @typicalname setMultipleAttr
 * @param {params} input  - input DOM element & attributes
 * @return { DOM element } sets attributes for the given DOM element
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input : div DOM element ,{name:'srinivas',id:'hearty-tag'}
 *
 * heartyhelper.setMultipleAttr(input)
 * Output: <div name="srinivas" id="hearty-tag"></div>
 *
 */

function setMultipleAttr(elmName, obj) {
    var elemName = elmName;
    for (var key in obj) {
        elemName.setAttribute(key, obj[key]);
    }
    return elemName;
}



/**
 * @name createField
 * @typicalname createField
 * @param {params} input  - input DOM element & attributes
 * @return {DOM element} sets attributes for the given DOM element
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * input : ('div',{name:'srinivas',id:'hearty-tag'})
 *
 * heartyhelper.createField(input)
 * Output: <div name="srinivas" id="hearty-tag"></div>
 *
 */
function createField(elmName, elemAttr) {
    var elem = document.createElement(elmName);
    var res = setMultipleAttr(elem, elemAttr);
    return res;
}



/**
 * @name addClass
 * @typicalname addClass
 * @param {params} input  - attribute type, attribute value & class name
 * @return {DOM element} sets class name for the given DOM element
 *
 * @usage
 * var heartyhelper = require('hearty-helper')
 * input : (id, 'hearty-tag', 'hearty-element')
 *
 * heartyhelper.addClass(input)
 * Output: <div id="hearty-tag" class="hearty-element hearty-tag"></div>
 *
 */


function addClass(elementType, attrValu, clsnam) {
    var elem;
    if (elementType == 'class') {
        elem = document.getElementsByClassName(attrValu)[0];
    } else if (elementType == 'id') {
        elem = document.getElementById(attrValu);
    }
    if (elem.classList) {
        elem.classList.add(clsnam);
    } else {
        elem.className = elem.className + ' ' + clsnam;
    }
}



/**
 * @name removeClass
 * @typicalname removeClass
 * @param {params} input  - attribute type, attribute value & class name
 * @return {DOM element} removes class name for the given DOM element
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * input : (id, 'hearty-tag', 'hearty-element')
 *
 * heartyhelper.removeClass(input)
 * Output: <div id="hearty-tag" class="hearty-tag"></div>
 *
 */
function removeClass(elementType, attrValu, clsnam) {
    var elem;
    if (elementType == 'class') {
        elem = document.getElementsByClassName(attrValu)[0];
    } else if (elementType == 'id') {
        elem = document.getElementById(attrValu);
    }
    if (elem.classList) {
        elem.classList.remove(clsnam);
    } else {
        var classList = elem.className.split(' ');
        var cl = '';
        for (var i in classList) {
            cl += classList[i] != clsnam ? classList[i] + ' ' : '';
        }
        elem.className = cl;
    }
}




/**
 * @name setCookie
 * @typicalname setCookie
 * @param {Object} input  - params object that contains cookie name, cookie value, cookie expire date, domain name
 * @return {DOM element} sets the cookie for provided domain with params
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = { cname: 'b2bRefeeral', cvalue: 1, expires: parseInt(1) }
 *
 * heartyhelper.setCookie(input)
 * Output: it sets cookie with given params
 *
 */

function setCookie(params) {
    params = params || {};
    if (typeof params.path === "undefined") {
        params.path = "/"
    }
    if (typeof params.domain === "undefined") {
        params.domain = ".yatra.com"
    }
    if (typeof params.expires === "number") {
        var expiry = params.expires
            , curr = params.expires = new Date();
        curr.setDate(curr.getDate() + expiry)
    }
    document.cookie = [params.cname, "=", params.cvalue, params.expires ? "; expires=" + params.expires.toUTCString() : "", params.path ? "; path=" + params.path : "", params.domain ? "; domain=" + params.domain : "", params.secure ? "; secure" : ""].join("")
}



/**
 * @name getCookie
 * @typicalname getCookie
 * @param {string} input  - cookie name
 * @return {string } get the cookie value with provided input name
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = 'cname'
 *
 * heartyhelper.getCookie(input)
 * Output: 'fghbfhfhf22228789'
 *
 */
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}


/**
 * @name sendHttpRequest
 * @typicalname sendHttpRequest
 * @param {string} input  - post request data
 * @return {string } It posts the data to the given url and will receive response in callback function
 *
 * @usage
 * var heartyhelper = require('hearty-helper') 
 * var input = ('POST',{'id:1,name:'srinivas'},'http://srinivasnarayansetty.com/getData',setBotResponse,true)
 *
 * heartyhelper.sendHttpRequest(input)
 * Output: responseText, status code
 *
 */

function sendHttpRequest(type, data, url, callback, ASYNC) {
    var requestData = isJson(data) ? data : JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, ASYNC);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(requestData)
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200 && typeof callback != undefined) {
            callback(JSON.parse(this.responseText), this.status);
        } else {
            console.log('error occured posting data: ' + this.status);
        }
    }

}





















