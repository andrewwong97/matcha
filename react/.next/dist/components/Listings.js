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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = require('../vars.json').baseUrl;

var Listings = function (_Component) {
	(0, _inherits3.default)(Listings, _Component);

	function Listings(props) {
		(0, _classCallCheck3.default)(this, Listings);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Listings.__proto__ || (0, _getPrototypeOf2.default)(Listings)).call(this, props));

		_this.state = {
			listings: []
		};
		return _this;
	}

	(0, _createClass3.default)(Listings, [{
		key: 'renderListings',
		value: function renderListings() {
			return this.state.listings == null ? 'Loading listings...' : this.state.listings.map(function (listing) {
				return _react2.default.createElement('li', { className: 'job-listing' }, _react2.default.createElement('div', { className: 'logo-placeholder' }), _react2.default.createElement('div', { className: 'listing-text' }, _react2.default.createElement('p', { className: 'company' }, 'Company Name'), _react2.default.createElement('p', { className: 'name' }, listing.name), _react2.default.createElement('p', { className: 'salary' }, listing.salary)));
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			fetch(baseUrl + '/v1/listings/all', { method: 'GET' }).then(function (response) {
				return response.json();
			}).then(function (data) {
				_this2.setState({ listings: data });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'Listings' }, _react2.default.createElement('h1', null, 'Listings'), _react2.default.createElement('div', { className: 'listing-container' }, this.renderListings()));
		}
	}]);

	return Listings;
}(_react.Component);

exports.default = Listings;