/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
// eslint-disable-next-line no-unused-vars
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';




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

    handleOnchangeUsername = (event) => {
        this.setState({ 
            username: event.target.value
        })
    }

    handleOnchangePassword = (event) => {
        this.setState({ 
            password: event.target.value
        })
    }

    handleLogin = async() => {
        this.setState({
        errMessage: ''
        })
        // console.log('username:', this.state.username, 'password:', this.state.password )
        // console.log('All state:', this.state)
        try {
           let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !==0){
                this.setState({
                    errMessage:data.message
                })
            }
            if(data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
               
            }
        }catch(err) {
            if(err.response) {
                if(err.response.data){
                    this.setState({
                    errMessage: err.response.data.message
                     })
                }
            }
        }
       
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if(event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }

    }

    render() {

        //JSX
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label className="">Username:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label className="">Password:</label>
                            <div className="custom-input-password"> 
                                <input 
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className="form-control" 
                                    placeholder="Enter your password"
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                     <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => {this.handleLogin () }}>Login</button>
                        </div>
                        <div className="col-12 forgotpassword">
                            <span className="forgot-password">For got your password?</span>
                        </div>
                        <div className="col-12 text-center mt-4">
                            <span className="text-other-login">Or Login With:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-twitter twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
           
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
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);