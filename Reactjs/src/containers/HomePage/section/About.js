import React, { Component } from "react";
import { connect } from "react-redux";
// import "./About.scss";
import { FormattedMessage } from "react-intl";

// import iconen from '../../assets/en.png'

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói gì về độ đẹp trai của Nguyeenx Sonw
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/m8fizDQTbYY"
              title="1977 Vlog - Chuyển động 24h Parody - Phiên bản nghiêm túc | VTV24"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <a href="https://vtvgo.vn/trang-chu.html">Click</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
