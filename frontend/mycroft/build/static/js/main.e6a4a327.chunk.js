(this.webpackJsonpmycroft=this.webpackJsonpmycroft||[]).push([[0],{24:function(e,t,a){e.exports={formWrapper:"LoginForm_formWrapper__1Mi4p",formSignin:"LoginForm_formSignin___UbO9",checkbox:"LoginForm_checkbox__T_Hcs","form-control":"LoginForm_form-control__1FP0q",footer:"LoginForm_footer__1fRHi"}},25:function(e,t,a){e.exports={formWrapper:"RegisterForm_formWrapper__3i8Pf",formRegister:"RegisterForm_formRegister__1Px6d",checkbox:"RegisterForm_checkbox__3QSuj","form-control":"RegisterForm_form-control__2ydRV",footer:"RegisterForm_footer__2HiR4"}},36:function(e,t,a){e.exports=a(50)},41:function(e,t,a){},42:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(13),o=a.n(s),m=(a(41),a(42),a(5)),i=a(15),l=a(16),c=a(17),u=a(12),h=a(22),d=a(21),g=a(24),p=a.n(g),f=a(11),b=a(19),_=a(18),v=a(9),E=a(20),w=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={username:"",password:"",error_message:""},r.inputChangeHandler=r.inputChangeHandler.bind(Object(u.a)(r)),r.formSubmitHandler=r.formSubmitHandler.bind(Object(u.a)(r)),r}return Object(c.a)(a,[{key:"inputChangeHandler",value:function(e){var t=e.target,a=t.name,r=t.value;""!==this.state.error_message&&this.setState({error_message:""}),this.setState(Object(i.a)({},a,r))}},{key:"formSubmitHandler",value:function(e){e.preventDefault(),""!==this.state.error_message&&this.setState({error_message:""}),console.log(this.state.username),console.log(this.state.password)}},{key:"render",value:function(){var e=""===this.state.error_message?null:n.a.createElement(E.a,{variant:"danger"},this.state.error_message);return n.a.createElement("div",{className:p.a.formWrapper},n.a.createElement(v.a,{id:"login-form",className:p.a.formSignin,onSubmit:this.formSubmitHandler},n.a.createElement(_.a,{className:"mb-4",alt:"Mycroft - Water",src:"/assets/logo.png"}),n.a.createElement("h1",{className:"h3 mb-3"},"Mycroft"),e,n.a.createElement(v.a.Label,{htmlFor:"inputUsername",srOnly:!0},"Username"),n.a.createElement(v.a.Control,{type:"text",id:"inputUsername",name:"username",placeholder:"Username",required:!0,autoFocus:!0,value:this.state.username,onChange:this.inputChangeHandler}),n.a.createElement(v.a.Label,{htmlFor:"inputPassword",srOnly:!0},"Password"),n.a.createElement(v.a.Control,{type:"password",id:"inputPassword",name:"password",placeholder:"Password",required:!0,value:this.state.password,onChange:this.inputChangeHandler}),n.a.createElement(b.a,{type:"submit",block:!0,size:"lg"},"Sign in"),n.a.createElement(f.b,{to:"/register"},"Create an new account"),n.a.createElement("p",{className:"mt-3 mb-3 text-muted "+p.a.footer},"Team Water")))}}]),a}(r.Component),y=Object(m.f)(w),S=a(25),C=a.n(S),H=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={username:"",password:"",error_message:""},r.inputChangeHandler=r.inputChangeHandler.bind(Object(u.a)(r)),r.formSubmitHandler=r.formSubmitHandler.bind(Object(u.a)(r)),r}return Object(c.a)(a,[{key:"inputChangeHandler",value:function(e){var t=e.target,a=t.name,r=t.value;""!==this.state.error_message&&this.setState({error_message:""}),this.setState(Object(i.a)({},a,r))}},{key:"formSubmitHandler",value:function(e){e.preventDefault(),""!==this.state.error_message&&this.setState({error_message:""}),console.log(this.state.username),console.log(this.state.password)}},{key:"render",value:function(){var e=""===this.state.error_message?null:n.a.createElement(E.a,{variant:"danger"},this.state.error_message);return n.a.createElement("div",{className:C.a.formWrapper},n.a.createElement(v.a,{id:"register-form",className:C.a.formRegister,onSubmit:this.formSubmitHandler},n.a.createElement(_.a,{className:"mb-4",alt:"Mycroft - Water",src:"/assets/logo.png"}),n.a.createElement("h1",{className:"h3 mb-3"},"Mycroft"),e,n.a.createElement(v.a.Label,{htmlFor:"inputUsername",srOnly:!0},"Username"),n.a.createElement(v.a.Control,{type:"text",id:"inputUsername",name:"username",placeholder:"Username",required:!0,autoFocus:!0,value:this.state.username,onChange:this.inputChangeHandler}),n.a.createElement(v.a.Label,{htmlFor:"inputPassword",srOnly:!0},"Password"),n.a.createElement(v.a.Control,{type:"password",id:"inputPassword",name:"password",placeholder:"Password",required:!0,value:this.state.password,onChange:this.inputChangeHandler}),n.a.createElement(b.a,{type:"submit",block:!0,size:"lg"},"Create an account"),n.a.createElement(f.b,{to:"/login"},"Sign in with an existing user"),n.a.createElement("p",{className:"mt-3 mb-3 text-muted "+C.a.footer},"Team Water")))}}]),a}(r.Component),O=Object(m.f)(H);var j=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(m.c,null,n.a.createElement(m.a,{path:"/login"},n.a.createElement(y,null)),n.a.createElement(m.a,{path:"/register"},n.a.createElement(O,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(49);var F=n.a.createElement(f.a,null,n.a.createElement(j,null));o.a.render(n.a.createElement(n.a.StrictMode,null,F),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.e6a4a327.chunk.js.map