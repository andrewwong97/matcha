
          window.__NEXT_REGISTER_PAGE('/register-employer', function() {
            var comp = module.exports=webpackJsonp([8],{254:function(e,t,a){e.exports=a(255)},255:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),s=n(l),u=a(40),r=n(u),i=a(256),o=n(i);t.default=function(){return s.default.createElement(r.default,{title:"Register Employer"},s.default.createElement(o.default,null))}},256:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(54),s=n(l),u=a(41),r=n(u),i=a(10),o=n(i),d=a(2),c=n(d),f=a(3),m=n(f),h=a(11),p=n(h),v=a(12),y=n(v),g=a(0),_=n(g),b=a(55).baseUrl,E=function(e){function t(e){(0,c.default)(this,t);var a=(0,p.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));return a.state={company_name:"",email:"",password:""},a}return(0,y.default)(t,e),(0,m.default)(t,[{key:"handleChange",value:function(e){var t=e.target,a=t.value,n=t.name;this.setState((0,r.default)({},n,a))}},{key:"handleSelect",value:function(e){this.setState((0,r.default)({},e.name,e.value))}},{key:"register",value:function(){var e={method:"POST",body:(0,s.default)({first_name:this.state.company_name,email:this.state.email,password:this.state.password})};fetch(b+"/v1/register",e).then(function(e){return console.log(e)})}},{key:"render",value:function(){return _.default.createElement("div",{className:"RegisterEmployer"},_.default.createElement("h1",null,"Register Employer"),_.default.createElement("input",{onChange:this.handleChange.bind(this),name:"company_name",placeholder:"Company Name",value:this.state.company_name,type:"text"}),_.default.createElement("input",{onChange:this.handleChange.bind(this),name:"email",placeholder:"Email",value:this.state.email,type:"text"}),_.default.createElement("input",{onChange:this.handleChange.bind(this),name:"password",placeholder:"Password",value:this.state.password,type:"password"}),_.default.createElement("button",{className:"btn btn-submitRegister",onClick:this.register.bind(this)},"Sign Up"))}}]),t}(g.Component);t.default=E}},[254]);
            return { page: comp.default }
          })
        