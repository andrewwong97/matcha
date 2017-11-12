'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _jsxFileName = '/Users/andrew/Desktop/matcha/react/components/RegisterEmployer.js';


var baseUrl = require('../vars.json').baseUrl;

var RegisterEmployer = function (_Component) {
    (0, _inherits3.default)(RegisterEmployer, _Component);

    function RegisterEmployer(props) {
        (0, _classCallCheck3.default)(this, RegisterEmployer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RegisterEmployer.__proto__ || (0, _getPrototypeOf2.default)(RegisterEmployer)).call(this, props));

        _this.state = {
            company_name: '',
            email: '',
            password: ''
        };
        return _this;
    }

    (0, _createClass3.default)(RegisterEmployer, [{
        key: 'handleChange',
        value: function handleChange(event) {
            var target = event.target;
            var value = target.value;
            var name = target.name;

            this.setState((0, _defineProperty3.default)({}, name, value));
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(option) {
            this.setState((0, _defineProperty3.default)({}, option.name, option.value));
        }
    }, {
        key: 'register',
        value: function register() {
            var options = {
                method: 'POST',
                body: (0, _stringify2.default)({
                    first_name: this.state.company_name,
                    email: this.state.email,
                    password: this.state.password
                })
            };

            fetch(baseUrl + '/v1/register', options).then(function (response) {
                return console.log(response);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: 'RegisterEmployer', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 47
                }
            }, _react2.default.createElement('h1', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 48
                }
            }, 'Register Employer'), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'company_name',
                placeholder: 'Company Name',
                value: this.state.company_name,
                type: 'text',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 49
                }
            }), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'email',
                placeholder: 'Email',
                value: this.state.email,
                type: 'text',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'password',
                placeholder: 'Password',
                value: this.state.password,
                type: 'password',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                }
            }), _react2.default.createElement('button', {
                className: 'btn btn-submitRegister',
                onClick: this.register.bind(this),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 73
                }
            }, 'Sign Up'));
        }
    }]);

    return RegisterEmployer;
}(_react.Component);

exports.default = RegisterEmployer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUmVnaXN0ZXJFbXBsb3llci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImJhc2VVcmwiLCJyZXF1aXJlIiwiUmVnaXN0ZXJFbXBsb3llciIsInByb3BzIiwic3RhdGUiLCJjb21wYW55X25hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm5hbWUiLCJzZXRTdGF0ZSIsIm9wdGlvbiIsIm9wdGlvbnMiLCJtZXRob2QiLCJib2R5IiwiZmlyc3RfbmFtZSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImhhbmRsZUNoYW5nZSIsImJpbmQiLCJyZWdpc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7Ozs7Ozs7O0FBRWhCLElBQU0sVUFBVSxRQUFBLEFBQVEsZ0JBQXhCLEFBQXdDOztJQUVuQixBOzhDQUNqQjs7OEJBQUEsQUFBWSxPQUFPOzRDQUFBOzs4SkFBQSxBQUNULEFBQ047O2NBQUEsQUFBSzswQkFBUSxBQUNLLEFBQ2Q7bUJBRlMsQUFFRixBQUNQO3NCQUxXLEFBRWYsQUFBYSxBQUdDO0FBSEQsQUFDVDtlQUlQOzs7OztxQyxBQUVZLE9BQU8sQUFDaEI7Z0JBQU0sU0FBUyxNQUFmLEFBQXFCLEFBQ3JCO2dCQUFNLFFBQVEsT0FBZCxBQUFxQixBQUNyQjtnQkFBTSxPQUFPLE9BQWIsQUFBb0IsQUFFcEI7O2lCQUFBLEFBQUssMkNBQUwsQUFDSyxNQURMLEFBQ1ksQUFFZjs7OztxQyxBQUVZLFFBQVEsQUFDakI7aUJBQUEsQUFBSywyQ0FBVyxPQUFoQixBQUF1QixNQUFPLE9BQTlCLEFBQXFDLEFBQ3hDOzs7O21DQUVVLEFBQ1A7Z0JBQU07d0JBQVUsQUFDSixBQUNSOztnQ0FDZ0IsS0FBQSxBQUFLLE1BREEsQUFDTSxBQUN2QjsyQkFBTyxLQUFBLEFBQUssTUFGSyxBQUVDLEFBQ2xCOzhCQUFVLEtBQUEsQUFBSyxNQUx2QixBQUFnQixBQUVOLEFBQWUsQUFHSSxBQUk3QjtBQVB5QixBQUNqQixpQkFERTtBQUZNLEFBQ1o7O2tCQVFFLFVBQU4sQUFBZ0IsZ0JBQWhCLEFBQWdDLFNBQWhDLEFBQ0ssS0FBSyxVQUFBLEFBQUMsVUFBRDt1QkFBYyxRQUFBLEFBQVEsSUFBdEIsQUFBYyxBQUFZO0FBRHBDLEFBR0g7Ozs7aUNBR1EsQUFDTDttQ0FDSSxjQUFBLFNBQUssV0FBTCxBQUFlOzhCQUFmO2dDQUFBLEFBQ0k7QUFESjthQUFBLGtCQUNJLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQURKLEFBQ0ksQUFDQTswQkFDYyxLQUFBLEFBQUssYUFBTCxBQUFrQixLQURoQyxBQUNjLEFBQXVCLEFBQ2pDO3NCQUZKLEFBRVMsQUFDTDs2QkFISixBQUdnQixBQUNaO3VCQUFPLEtBQUEsQUFBSyxNQUpoQixBQUlzQixBQUNsQjtzQkFMSixBQUtTOzs4QkFMVDtnQ0FGSixBQUVJLEFBUUE7QUFSQTtBQUNJOzBCQVFVLEtBQUEsQUFBSyxhQUFMLEFBQWtCLEtBRGhDLEFBQ2MsQUFBdUIsQUFDakM7c0JBRkosQUFFUyxBQUNMOzZCQUhKLEFBR2dCLEFBQ1o7dUJBQU8sS0FBQSxBQUFLLE1BSmhCLEFBSXNCLEFBQ2xCO3NCQUxKLEFBS1M7OzhCQUxUO2dDQVZKLEFBVUksQUFRQTtBQVJBO0FBQ0k7MEJBUVUsS0FBQSxBQUFLLGFBQUwsQUFBa0IsS0FEaEMsQUFDYyxBQUF1QixBQUNqQztzQkFGSixBQUVTLEFBQ0w7NkJBSEosQUFHZ0IsQUFDWjt1QkFBTyxLQUFBLEFBQUssTUFKaEIsQUFJc0IsQUFDbEI7c0JBTEosQUFLUzs7OEJBTFQ7Z0NBbEJKLEFBa0JJLEFBUUE7QUFSQTtBQUNJLGdDQU9KLGNBQUE7MkJBQUEsQUFDYyxBQUNWO3lCQUFTLEtBQUEsQUFBSyxTQUFMLEFBQWMsS0FGM0IsQUFFYSxBQUFtQjs7OEJBRmhDO2dDQUFBO0FBQUE7QUFDSSxlQTVCWixBQUNJLEFBMEJJLEFBTVg7Ozs7O0FBMUV5QyxBOztrQkFBekIsQSIsImZpbGUiOiJSZWdpc3RlckVtcGxveWVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbmRyZXcvRGVza3RvcC9tYXRjaGEvcmVhY3QifQ==