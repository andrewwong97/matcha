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
            return _react2.default.createElement('div', { className: 'RegisterEmployer' }, _react2.default.createElement('h1', null, 'Register Employer'), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'company_name',
                placeholder: 'Company Name',
                value: this.state.company_name,
                type: 'text'
            }), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'email',
                placeholder: 'Email',
                value: this.state.email,
                type: 'text'
            }), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'password',
                placeholder: 'Password',
                value: this.state.password,
                type: 'password'
            }), _react2.default.createElement('button', {
                className: 'btn btn-submitRegister',
                onClick: this.register.bind(this)
            }, 'Sign Up'));
        }
    }]);

    return RegisterEmployer;
}(_react.Component);

exports.default = RegisterEmployer;