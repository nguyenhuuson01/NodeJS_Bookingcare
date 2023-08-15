import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from '../../assets/logo.svg'
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { withRouter } from "react-router";
// import Slider from 'react-slick';
// import iconvn from '../../assets/vn.jpg';
// import iconen from '../../assets/en.png'

import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event : actions
  };
  returnTohome = () => {
    if(this.props.history) {
      this.props.history.push('/home');
    }
  };
  render() {
    let language = this.props.language;

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img className="header-logo" src={logo} onClick={() => this.returnTohome()}/> 
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true &&
          <div className="home-header-banner">
          <div className="content-up">
            <div className="title">
              <h1>
                <div>
                  <p>
                    <FormattedMessage id="banner.title1" />
                  </p>
                </div>
                <div>
                  <b>
                    <FormattedMessage id="banner.title2" />
                  </b>
                </div>
              </h1>
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm kiếm..." />
            </div>
          </div>
          <div className="content-dow">
            <div className="options">
              <div className="optinos-child">
                <div className="icon1-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child1" />
                  <br></br>
                  <FormattedMessage id="banner.child2" />
                </div>
              </div>
              <div className="optinos-child">
                <div className="icon2-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child1" />
                  <br></br>
                  <FormattedMessage id="banner.child3" />
                </div>
              </div>
              <div className="optinos-child">
                <div className="icon3-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child1" />
                  <br></br>
                  <FormattedMessage id="banner.child4" />
                </div>
              </div>
              <div className="optinos-child">
                <div className="icon4-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child5" />
                  <br></br>
                  <FormattedMessage id="banner.child6" />
                </div>
              </div>
              <div className="optinos-child">
                <div className="icon5-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child7" />
                  <br></br>
                  <FormattedMessage id="banner.child8" />
                </div>
              </div>
              <div className="optinos-child">
                <div className="icon6-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child1" />
                  <br></br>
                  <FormattedMessage id="banner.child9" />
                </div>
              </div>
              <div className="optinos-child">
                <div className="icon7-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.wrap" />
                  <br></br>
                  <FormattedMessage id="banner.surgery" />
                </div>
              </div>
              <div className="optinos-child">
                <div className="icon8-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.product" />
                  <br></br>
                  <FormattedMessage id="banner.medical" />
                </div>
              </div>
              <div className="optinos-child">
                <div className="icon9-child"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.tests" />
                  <br></br>
                  <FormattedMessage id="banner.health" />
                </div>
              </div>
            </div>
          </div>
        </div>
        }
    
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
