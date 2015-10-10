/**
 * Application
 *
 */

var utils = require('utils');
var app = require('app/app');

app();

// do not click that button
var button = utils.find('.button');
button.addEventListener('click', function(){
    var elem = utils.find('.js-main-cont');
    elem.parentNode.removeChild(elem);

    // remove listeners
    button.parentNode.replaceChild(button.cloneNode(true), button);
});