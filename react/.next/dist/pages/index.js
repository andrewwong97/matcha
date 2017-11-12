'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _layout = require('../components/layout');

var _layout2 = _interopRequireDefault(_layout);

var _Listings = require('../components/Listings');

var _Listings2 = _interopRequireDefault(_Listings);

var _Hero = require('../components/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	return _react2.default.createElement(_layout2.default, { title: 'Home' }, _react2.default.createElement(_Hero2.default, null), _react2.default.createElement(_Listings2.default, null));
};