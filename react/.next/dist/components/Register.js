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

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/andrew/Desktop/matcha/react/components/Register.js';


var baseUrl = require('../vars.json').baseUrl;

var selectJobType = [{ 'value': 'Internship', 'label': 'Internship', 'name': 'jobType' }, { 'value': 'Co-op', 'label': 'Co-op', 'name': 'jobType' }, { 'value': 'Full-Time', 'label': 'Full-Time', 'name': 'jobType' }];

var selectExpertise = [{ 'value': 'Engineering', 'label': 'Engineering', 'name': 'expertise' }, { 'value': 'Business', 'label': 'Business', 'name': 'expertise' }, { 'value': 'Product', 'label': 'Product', 'name': 'expertise' }];

var selectVisaStatus = [{ 'value': 'Citizen', 'label': 'U.S. citizen or resident', 'name': 'visaStatus' }, { 'value': 'Visa', 'label': 'Require a visa to work in the U.S.', 'name': 'visaStatus' }];

// TODO: use react-virtualized & react-virtualized-select to efficiently render 
// large list of 1000 largest cities
var selectCity = [{ 'value': 'San Francisco', 'label': 'San Francisco', 'name': 'city' }, { 'value': 'New York', 'label': 'New York', 'name': 'city' }, { 'value': 'Baltimore', 'label': 'Baltimore', 'name': 'city' }];

var Register = function (_Component) {
    (0, _inherits3.default)(Register, _Component);

    function Register(props) {
        (0, _classCallCheck3.default)(this, Register);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Register.__proto__ || (0, _getPrototypeOf2.default)(Register)).call(this, props));

        _this.state = {
            email: '',
            password: '',
            jobType: '',
            expertise: '',
            visaStatus: '',
            city: ''
        };
        return _this;
    }

    (0, _createClass3.default)(Register, [{
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

            var data = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                username: this.state.email,
                password: this.state.password, // has not yet been implemented in backend yet
                linkedin_token: '',
                github_token: '',
                skills: [],
                need_visa: this.state.visaStatus,
                location: this.state.city,
                looking_for: [this.state.jobType],
                job_matches: [],
                favorited_jobs: [],
                expertise: this.state.expertise
            };

            var myHeaders = new Headers({
                "Content-Type": 'application/json'
            });

            var options = {
                method: 'POST',
                headers: myHeaders,
                body: (0, _stringify2.default)(data)
            };

            fetch(baseUrl + '/v1/createProfile', options).then(function (response) {
                return console.log(response);
            });

            var email = this.state.email;
            this.setState({ email: '', password: '', jobType: '', expertise: '', visaStatus: '', city: '' });

            _routes2.default.pushRoute('/profile/' + email);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: 'Register', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 101
                }
            }, _react2.default.createElement('h1', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 102
                }
            }, 'Register'), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'first_name',
                placeholder: 'First Name',
                value: this.state.first_name,
                type: 'text',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 103
                }
            }), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'last_name',
                placeholder: 'Last Name',
                value: this.state.last_name,
                type: 'text',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 111
                }
            }), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'email',
                placeholder: 'Email',
                value: this.state.email,
                type: 'text',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 120
                }
            }), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'password',
                placeholder: 'Password',
                value: this.state.password,
                type: 'password',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 128
                }
            }), _react2.default.createElement(_reactSelect2.default, {
                name: 'jobType',
                value: this.state.jobType,
                placeholder: 'Job Type',
                options: selectJobType,
                onChange: this.handleSelect.bind(this),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 136
                }
            }), _react2.default.createElement(_reactSelect2.default, {
                name: 'expertise',
                value: this.state.expertise,
                placeholder: 'Expertise',
                options: selectExpertise,
                onChange: this.handleSelect.bind(this),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 144
                }
            }), _react2.default.createElement(_reactSelect2.default, {
                name: 'visaStatus',
                value: this.state.visaStatus,
                placeholder: 'Visa status',
                options: selectVisaStatus,
                onChange: this.handleSelect.bind(this),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 152
                }
            }), _react2.default.createElement(_reactSelect2.default, {
                name: 'city',
                value: this.state.city,
                placeholder: 'Preferred city',
                options: selectCity,
                onChange: this.handleSelect.bind(this),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 160
                }
            }), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 168
                }
            }, 'Placeholder for Login via LinkedIn'), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 170
                }
            }, 'Placeholder for Login via GitHub'), _react2.default.createElement('div', { className: 'submit-wrapper', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 172
                }
            }, _react2.default.createElement('button', {
                className: 'btn btn-submitRegister',
                onClick: this.register.bind(this),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 173
                }
            }, 'Sign Up'), _react2.default.createElement(_link2.default, { href: '/login', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 178
                }
            }, _react2.default.createElement('a', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 178
                }
            }, 'Have an account? Login here'))));
        }
    }]);

    return Register;
}(_react.Component);

exports.default = Register;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUmVnaXN0ZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJMaW5rIiwiU2VsZWN0IiwiUm91dGVyIiwiYmFzZVVybCIsInJlcXVpcmUiLCJzZWxlY3RKb2JUeXBlIiwic2VsZWN0RXhwZXJ0aXNlIiwic2VsZWN0VmlzYVN0YXR1cyIsInNlbGVjdENpdHkiLCJSZWdpc3RlciIsInByb3BzIiwic3RhdGUiLCJlbWFpbCIsInBhc3N3b3JkIiwiam9iVHlwZSIsImV4cGVydGlzZSIsInZpc2FTdGF0dXMiLCJjaXR5IiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm5hbWUiLCJzZXRTdGF0ZSIsIm9wdGlvbiIsImRhdGEiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwidXNlcm5hbWUiLCJsaW5rZWRpbl90b2tlbiIsImdpdGh1Yl90b2tlbiIsInNraWxscyIsIm5lZWRfdmlzYSIsImxvY2F0aW9uIiwibG9va2luZ19mb3IiLCJqb2JfbWF0Y2hlcyIsImZhdm9yaXRlZF9qb2JzIiwibXlIZWFkZXJzIiwiSGVhZGVycyIsIm9wdGlvbnMiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsInB1c2hSb3V0ZSIsImhhbmRsZUNoYW5nZSIsImJpbmQiLCJoYW5kbGVTZWxlY3QiLCJyZWdpc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUTs7OztBQUNmLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTyxBQUFZOzs7Ozs7Ozs7QUFFbkIsSUFBTSxVQUFVLFFBQUEsQUFBUSxnQkFBeEIsQUFBd0M7O0FBRXhDLElBQU0sZ0JBQWdCLENBQ2xCLEVBQUMsU0FBRCxBQUFVLGNBQWMsU0FBeEIsQUFBaUMsY0FBYyxRQUQ3QixBQUNsQixBQUF1RCxhQUN2RCxFQUFDLFNBQUQsQUFBVSxTQUFT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QkQsQUEyQkMsQUFRWTtBQVJaO0FBQ0MsZ0NBT1csQUFBQztzQkFBRCxBQUNTLEFBQ0w7dUJBQU8sS0FBQSxBQUFLLE1BRmhCLEFBRXNCLEFBQ2xCOzZCQUhKLEFBR2dCLEFBQ1o7eUJBSkosQUFJYSxBQUNUOzBCQUFVLEtBQUEsQUFBSyxhQUFMLEFBQWtCLEtBTGhDLEFBS2MsQUFBdUI7OzhCQUxyQztnQ0FuQ2IsQUFtQ2EsQUFRQTtBQVJBO0FBQ0ksZ0NBT0osQUFBQztzQkFBRCxBQUNTLEFBQ0w7dUJBQU8sS0FBQSxBQUFLLE1BRmhCLEFBRXNCLEFBQ2xCOzZCQUhKLEFBR2dCLEFBQ1o7eUJBSkosQUFJYSxBQUNUOzBCQUFVLEtBQUEsQUFBSyxhQUFMLEFBQWtCLEtBTGhDLEFBS2MsQUFBdUI7OzhCQUxyQztnQ0EzQ2IsQUEyQ2EsQUFRQTtBQVJBO0FBQ0ksZ0NBT0osQUFBQztzQkFBRCxBQUNTLEFBQ0w7dUJBQU8sS0FBQSxBQUFLLE1BRmhCLEFBRXNCLEFBQ2xCOzZCQUhKLEFBR2dCLEFBQ1o7eUJBSkosQUFJYSxBQUNUOzBCQUFVLEtBQUEsQUFBSyxhQUFMLEFBQWtCLEtBTGhDLEFBS2MsQUFBdUI7OzhCQUxyQztnQ0FuRGIsQUFtRGEsQUFRQTtBQVJBO0FBQ0ksZ0NBT0osQUFBQztzQkFBRCxBQUNTLEFBQ0w7dUJBQU8sS0FBQSxBQUFLLE1BRmhCLEFBRXNCLEFBQ2xCOzZCQUhKLEFBR2dCLEFBQ1o7eUJBSkosQUFJYSxBQUNUOzBCQUFVLEtBQUEsQUFBSyxhQUFMLEFBQWtCLEtBTGhDLEFBS2MsQUFBdUI7OzhCQUxyQztnQ0EzRGIsQUEyRGEsQUFRWjtBQVJZO0FBQ0ksZ0NBT2hCLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQW5FRCxBQW1FQyxBQUVBLHVEQUFBLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQXJFRCxBQXFFQyxBQUVBLHFEQUFBLGNBQUEsU0FBSyxXQUFMLEFBQWU7OEJBQWY7Z0NBQUEsQUFDQztBQUREOytCQUNDLGNBQUE7MkJBQUEsQUFDVyxBQUNWO3lCQUFTLEtBQUEsQUFBSyxTQUFMLEFBQWMsS0FGeEIsQUFFVSxBQUFtQjs7OEJBRjdCO2dDQUFBO0FBQUE7QUFDQyxlQUZGLEFBQ0MsQUFLZSw0QkFBQSxBQUFDLGdDQUFLLE1BQU4sQUFBVzs4QkFBWDtnQ0FBQSxBQUFvQjtBQUFwQjsrQkFBb0IsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBOUV0QyxBQUNDLEFBdUVDLEFBTWdCLEFBQW9CLEFBS3RDOzs7OztBQXRKcUIsQSxBQXlKdkI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiUmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FuZHJldy9EZXNrdG9wL21hdGNoYS9yZWFjdCJ9