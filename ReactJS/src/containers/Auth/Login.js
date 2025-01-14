import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from '../../assets/images/user.svg';
import passIcon from '../../assets/images/pass.svg';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         isShowPassword: false,
         errMessage: ''
      }
   }

   handleOnhangeUsername = (event) => {
      this.setState({
         username: event.target.value,
      })
   }

   handleOnhangePassword = (event) => {
      this.setState({
         password: event.target.value,
      })
   }

   handleShowHidePassword = () => {
      this.setState({
         isShowPassword: !this.state.isShowPassword,
      })
   }

   render() {

      return (
         <>
            <div className="LoginFrom">
               <div className="LoginFrom_title"><span>Login Form</span></div>
               <form action="#">
                  <div className="form-group">
                     <label>Username:</label>
                     <div className='row LoginFrom_EmailPhone'>
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Email or Phone" required className="form-control"
                           value={this.state.username}
                           onChange={(event) => { this.handleOnhangeUsername(event) }}
                        />
                     </div>
                  </div>
                  <div className="form-group">
                     <label>Password:</label>
                     <div className='customPassword'>
                        <div className='row LoginFrom_Password'>
                           <i className="fas fa-lock"></i>
                           <input type={this.state.isShowPassword ? 'text' : 'password'} placeholder="Password" required className="form-control"
                              onChange={(event) => { this.handleOnhangePassword(event) }}
                           />
                        </div>
                        <span className='iconPassword'
                           onClick={() => { this.handleShowHidePassword() }}
                        >
                           {
                              this.state.isShowPassword ?
                                 <FontAwesomeIcon icon={faEye} />
                                 :
                                 <FontAwesomeIcon icon={faEyeSlash} />
                           }
                           {/* <i class={this.state.isShowPassword ? 'fa-solid fa-eye iconPassword' : 'fa-solid fa-eye-low-vision iconPassword'}></i> */}
                        </span>
                     </div>
                  </div>
                  <div className='col-12' style={{ color: "red" }}>
                     {this.state.errMessage}
                  </div>
                  <div className="LoginFrom_pass"><a href="#">Forgot password?</a></div>
                  <div className="row LoginFrom_buttonSubmit">
                     <input type="submit" value="Login" onClick={() => { this.handleLogin() }} />
                  </div>
                  <p className='text-center title_Social'>Or login with</p>
                  <div className='LoginFrom_social'>
                     <FontAwesomeIcon className='icon' icon={faGoogle} />
                     <FontAwesomeIcon className='icon' icon={faFacebook} />
                  </div>
               </form>
            </div>
         </>
      )
   }
}

const mapStateToProps = state => {
   return {
      language: state.app.language
   };
};

const mapDispatchToProps = dispatch => {
   return {
      navigate: (path) => dispatch(push(path)),
      // userLoginFail: () => dispatch(actions.adminLoginFail()),
      // userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
