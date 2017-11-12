'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _main = require('../static/scss/main.scss');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var children = _ref.children,
      title = _ref.title;
  return _react2.default.createElement('div', { className: 'Layout' }, _react2.default.createElement(_head2.default, null, _react2.default.createElement('meta', { charset: 'utf-8' }), _react2.default.createElement('title', null, title, ' | Matcha - an intelligent job matching platform'), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }), _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://unpkg.com/react-select/dist/react-select.css' }), _react2.default.createElement('link', { rel: 'stylesheet', href: '../static/react-bootstrap-table.min.css' }), _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,700' }), _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: _main2.default } })), _react2.default.createElement('div', { className: 'App' }, _react2.default.createElement('div', { className: 'Nav-wrapper' }, _react2.default.createElement('div', { className: 'logo' }, _react2.default.createElement('h1', null, 'Matcha')), _react2.default.createElement('ul', { className: 'Nav' }, _react2.default.createElement('li', null, _react2.default.createElement(_link2.default, { href: '/' }, _react2.default.createElement('a', null, 'Home'))), _react2.default.createElement('li', null, _react2.default.createElement(_link2.default, { href: '/login' }, _react2.default.createElement('a', null, 'Login'))))), children));
};