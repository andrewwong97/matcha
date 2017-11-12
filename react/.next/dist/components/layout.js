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

var _jsxFileName = '/Users/andrew/Desktop/matcha/react/components/layout.js';

exports.default = function (_ref) {
  var children = _ref.children,
      title = _ref.title;
  return _react2.default.createElement('div', { className: 'Layout', __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('meta', { charset: 'utf-8', __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }), _react2.default.createElement('title', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, title, ' | Matcha - an intelligent job matching platform'), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0', __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }), _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://unpkg.com/react-select/dist/react-select.css', __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), _react2.default.createElement('link', { rel: 'stylesheet', href: '../static/react-bootstrap-table.min.css', __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,700', __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }), _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: _main2.default }, __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  })), _react2.default.createElement('div', { className: 'App', __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement('div', { className: 'Nav-wrapper', __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, _react2.default.createElement('div', { className: 'logo', __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement('h1', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, 'Matcha')), _react2.default.createElement('ul', { className: 'Nav', __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, _react2.default.createElement('li', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement(_link2.default, { href: '/', __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement('a', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, 'Home'))), _react2.default.createElement('li', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, _react2.default.createElement(_link2.default, { href: '/login', __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, _react2.default.createElement('a', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, 'Login'))))), children));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0LmpzIl0sIm5hbWVzIjpbIkhlYWQiLCJMaW5rIiwic3R5bGVzaGVldCIsImNoaWxkcmVuIiwidGl0bGUiLCJfX2h0bWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUVQLEFBQU8sQUFBZ0IsQUFFdkI7Ozs7Ozs7O2tCQUFlLGdCQUFBO01BQUEsQUFBRyxnQkFBSCxBQUFHO01BQUgsQUFBYSxhQUFiLEFBQWE7eUJBQ3hCLGNBQUEsU0FBSyxXQUFMLEFBQWU7Z0JBQWY7a0JBQUEsQUFDSTtBQURKO0dBQUEsa0JBQ0ksQUFBQzs7Z0JBQUQ7a0JBQUEsQUFDSTtBQURKO0FBQUEsNkNBQ1UsU0FBTixBQUFjO2dCQUFkO2tCQURKLEFBQ0ksQUFDQTtBQURBO3NCQUNBLGNBQUE7O2dCQUFBO2tCQUFBLEFBQVM7QUFBVDtBQUFBLEtBQUEsT0FGSixBQUVJLEFBQ0EsNkZBQU0sTUFBTixBQUFXLFlBQVcsU0FBdEIsQUFBOEI7Z0JBQTlCO2tCQUhKLEFBR0ksQUFDQTtBQURBOzhDQUNNLEtBQU4sQUFBVSxjQUFhLE1BQXZCLEFBQTRCO2dCQUE1QjtrQkFKSixBQUlJLEFBQ0E7QUFEQTs4Q0FDTSxLQUFOLEFBQVUsY0FBYSxNQUF2QixBQUE0QjtnQkFBNUI7a0JBTEosQUFLSSxBQUNBO0FBREE7OENBQ00sS0FBTixBQUFVLGNBQWEsTUFBdkIsQUFBNEI7Z0JBQTVCO2tCQU5KLEFBTUksQUFDQTtBQURBOytDQUNPLHlCQUF5QixFQUFoQyxBQUFnQyxBQUFFLEFBQVE7Z0JBQTFDO2tCQVJSLEFBQ0ksQUFPSSxBQUlOO0FBSk07dUJBSU4sY0FBQSxTQUFLLFdBQUwsQUFBZTtnQkFBZjtrQkFBQSxBQUNFO0FBREY7cUJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtnQkFBZjtrQkFBQSxBQUNFO0FBREY7cUJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtnQkFBZjtrQkFBQSxBQUNFO0FBREY7cUJBQ0UsY0FBQTs7Z0JBQUE7a0JBQUE7QUFBQTtBQUFBLEtBRkosQUFDRSxBQUNFLEFBRUYsNEJBQUEsY0FBQSxRQUFJLFdBQUosQUFBYztnQkFBZDtrQkFBQSxBQUNFO0FBREY7cUJBQ0UsY0FBQTs7Z0JBQUE7a0JBQUEsQUFBSTtBQUFKO0FBQUEscUJBQUksQUFBQyxnQ0FBSyxNQUFOLEFBQVc7Z0JBQVg7a0JBQUEsQUFBZTtBQUFmO3FCQUFlLGNBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQURyQixBQUNFLEFBQUksQUFBZSxBQUNuQiwyQkFBQSxjQUFBOztnQkFBQTtrQkFBQSxBQUFJO0FBQUo7QUFBQSxxQkFBSSxBQUFDLGdDQUFLLE1BQU4sQUFBVztnQkFBWDtrQkFBQSxBQUFvQjtBQUFwQjtxQkFBb0IsY0FBQTs7Z0JBQUE7a0JBQUE7QUFBQTtBQUFBLEtBUDlCLEFBQ0UsQUFJRSxBQUVFLEFBQUksQUFBb0IsQUFHMUIsY0F2QkssQUFDWCxBQVlFO0FBYk4iLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbmRyZXcvRGVza3RvcC9tYXRjaGEvcmVhY3QifQ==