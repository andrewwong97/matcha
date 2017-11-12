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

var _jsxFileName = '/Users/andrew/Desktop/matcha/react/components/Listings.js';


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
				return _react2.default.createElement('li', { className: 'job-listing', __source: {
						fileName: _jsxFileName,
						lineNumber: 17
					}
				}, _react2.default.createElement('div', { className: 'logo-placeholder', __source: {
						fileName: _jsxFileName,
						lineNumber: 18
					}
				}), _react2.default.createElement('div', { className: 'listing-text', __source: {
						fileName: _jsxFileName,
						lineNumber: 19
					}
				}, _react2.default.createElement('p', { className: 'company', __source: {
						fileName: _jsxFileName,
						lineNumber: 20
					}
				}, 'Company Name'), _react2.default.createElement('p', { className: 'name', __source: {
						fileName: _jsxFileName,
						lineNumber: 21
					}
				}, listing.name), _react2.default.createElement('p', { className: 'salary', __source: {
						fileName: _jsxFileName,
						lineNumber: 22
					}
				}, listing.salary)));
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
			return _react2.default.createElement('div', { className: 'Listings', __source: {
					fileName: _jsxFileName,
					lineNumber: 39
				}
			}, _react2.default.createElement('h1', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 40
				}
			}, 'Listings'), _react2.default.createElement('div', { className: 'listing-container', __source: {
					fileName: _jsxFileName,
					lineNumber: 41
				}
			}, this.renderListings()));
		}
	}]);

	return Listings;
}(_react.Component);

exports.default = Listings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTGlzdGluZ3MuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJiYXNlVXJsIiwicmVxdWlyZSIsIkxpc3RpbmdzIiwicHJvcHMiLCJzdGF0ZSIsImxpc3RpbmdzIiwibWFwIiwibGlzdGluZyIsIm5hbWUiLCJzYWxhcnkiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwic2V0U3RhdGUiLCJyZW5kZXJMaXN0aW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7Ozs7OztBQUVoQixJQUFNLFVBQVUsUUFBQSxBQUFRLGdCQUF4QixBQUF3Qzs7SSxBQUVsQzttQ0FDTDs7bUJBQUEsQUFBWSxPQUFPO3NDQUFBOzt3SUFBQSxBQUNaLEFBQ047O1FBQUEsQUFBSzthQUZhLEFBRWxCLEFBQWEsQUFDRjtBQURFLEFBQ1o7U0FFRDs7Ozs7bUNBRWdCLEFBQ2hCO1VBQU8sS0FBQSxBQUFLLE1BQUwsQUFBVyxZQUFYLEFBQXVCLE9BQXZCLEFBQThCLDZCQUNwQyxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLElBQUksVUFBQSxBQUFDLFNBQUQ7MkJBRXRCLGNBQUEsUUFBSSxXQUFKLEFBQWM7Z0JBQWQ7a0JBQUEsQUFDQztBQUREO0tBQUEseUNBQ00sV0FBTCxBQUFlO2dCQUFmO2tCQURELEFBQ0MsQUFDQTtBQURBO3dCQUNBLGNBQUEsU0FBSyxXQUFMLEFBQWU7Z0JBQWY7a0JBQUEsQUFDQztBQUREO3VCQUNDLGNBQUEsT0FBRyxXQUFILEFBQWE7Z0JBQWI7a0JBQUE7QUFBQTtPQURELEFBQ0MsQUFDQSxpQ0FBQSxjQUFBLE9BQUcsV0FBSCxBQUFhO2dCQUFiO2tCQUFBLEFBQXFCO0FBQXJCO2VBRkQsQUFFQyxBQUE2QixBQUM3Qix1QkFBQSxjQUFBLE9BQUcsV0FBSCxBQUFhO2dCQUFiO2tCQUFBLEFBQXVCO0FBQXZCO2VBUG9CLEFBRXRCLEFBRUMsQUFHQyxBQUErQjtBQVJwQyxBQUNDLEFBWUQsSUFaQzs7OztzQ0Fja0I7Z0JBQ25COztTQUFNLFVBQU4sQUFBZ0Isb0JBQW9CLEVBQUMsUUFBckMsQUFBb0MsQUFBUyxTQUE3QyxBQUNDLEtBQUssVUFBQSxBQUFDLFVBQUQ7V0FBYyxTQUFkLEFBQWMsQUFBUztBQUQ3QixNQUFBLEFBRUMsS0FBSyxVQUFBLEFBQUMsTUFBUyxBQUNmO1dBQUEsQUFBSyxTQUFTLEVBQUMsVUFBZixBQUFjLEFBQVcsQUFDekI7QUFKRCxBQUtBOzs7OzJCQUVRLEFBQ1I7MEJBQ0MsY0FBQSxTQUFLLFdBQUwsQUFBZTtlQUFmO2lCQUFBLEFBQ0M7QUFERDtJQUFBLGtCQUNDLGNBQUE7O2VBQUE7aUJBQUE7QUFBQTtBQUFBLE1BREQsQUFDQyxBQUNBLDZCQUFBLGNBQUEsU0FBSyxXQUFMLEFBQWU7ZUFBZjtpQkFBQSxBQUNpQjtBQURqQjtXQUhGLEFBQ0MsQUFFQyxBQUNpQixBQUFLLEFBSXhCOzs7OztBQXpDcUIsQSxBQTRDdkI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiTGlzdGluZ3MuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FuZHJldy9EZXNrdG9wL21hdGNoYS9yZWFjdCJ9