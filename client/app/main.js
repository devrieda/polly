/** @jsx React.DOM */

var Router = require('react-nested-router').Router
var env = require('../config/env')

require('./router').renderComponent(document.querySelector('#polly'));

// TODO: figure out what module.exports was used for -- functional tests?
//module.exports = app

