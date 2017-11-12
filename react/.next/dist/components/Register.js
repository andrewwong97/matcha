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
            return _react2.default.createElement('div', { className: 'Register' }, _react2.default.createElement('h1', null, 'Register'), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'first_name',
                placeholder: 'First Name',
                value: this.state.first_name,
                type: 'text'
            }), _react2.default.createElement('input', {
                onChange: this.handleChange.bind(this),
                name: 'last_name',
                placeholder: 'Last Name',
                value: this.state.last_name,
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
            }), _react2.default.createElement(_reactSelect2.default, {
                name: 'jobType',
                value: this.state.jobType,
                placeholder: 'Job Type',
                options: selectJobType,
                onChange: this.handleSelect.bind(this)
            }), _react2.default.createElement(_reactSelect2.default, {
                name: 'expertise',
                value: this.state.expertise,
                placeholder: 'Expertise',
                options: selectExpertise,
                onChange: this.handleSelect.bind(this)
            }), _react2.default.createElement(_reactSelect2.default, {
                name: 'visaStatus',
                value: this.state.visaStatus,
                placeholder: 'Visa status',
                options: selectVisaStatus,
                onChange: this.handleSelect.bind(this)
            }), _react2.default.createElement(_reactSelect2.default, {
                name: 'city',
                value: this.state.city,
                placeholder: 'Preferred city',
                options: selectCity,
                onChange: this.handleSelect.bind(this)
            }), _react2.default.createElement('p', null, 'Placeholder for Login via LinkedIn'), _react2.default.createElement('p', null, 'Placeholder for Login via GitHub'), _react2.default.createElement('div', { className: 'submit-wrapper' }, _react2.default.createElement('button', {
                className: 'btn btn-submitRegister',
                onClick: this.register.bind(this)
            }, 'Sign Up'), _react2.default.createElement(_link2.default, { href: '/login' }, _react2.default.createElement('a', null, 'Have an account? Login here'))));
        }
    }]);

    return Register;
}(_react.Component);

exports.default = Register;