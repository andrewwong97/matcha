'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hero = function (_React$Component) {
    (0, _inherits3.default)(Hero, _React$Component);

    function Hero() {
        (0, _classCallCheck3.default)(this, Hero);

        return (0, _possibleConstructorReturn3.default)(this, (Hero.__proto__ || (0, _getPrototypeOf2.default)(Hero)).apply(this, arguments));
    }

    (0, _createClass3.default)(Hero, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: 'Hero' }, _react2.default.createElement('h1', null, 'Create an account'), _react2.default.createElement('div', { className: 'signup-switch' }, _react2.default.createElement('div', { className: 'btn btn-student' }, _react2.default.createElement(_link2.default, { prefetch: true, href: '/register' }, _react2.default.createElement('a', null, 'Student'))), _react2.default.createElement('div', { className: 'btn btn-employer' }, _react2.default.createElement(_link2.default, { prefetch: true, href: '/register-employer' }, _react2.default.createElement('a', null, 'Employer')))), _react2.default.createElement(_link2.default, { href: '/login' }, _react2.default.createElement('a', null, 'Already have an account? Login here.')));
        }
    }]);

    return Hero;
}(_react2.default.Component);

exports.default = Hero;