'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _layout = require('../components/layout');

var _layout2 = _interopRequireDefault(_layout);

var _RegisterEmployer = require('../components/RegisterEmployer');

var _RegisterEmployer2 = _interopRequireDefault(_RegisterEmployer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return _react2.default.createElement(_layout2.default, { title: 'Register Employer' }, _react2.default.createElement(_RegisterEmployer2.default, null));
};