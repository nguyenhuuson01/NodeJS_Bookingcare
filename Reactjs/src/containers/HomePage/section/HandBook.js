import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HandBook.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

// import iconvn from '../../assets/vn.jpg';
// import iconen from '../../assets/en.png'

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-hand-book">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="title-btn">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-img section-hand-book"></div>
                <div>Nguyên nhân và cách chữa trị mụn bọc</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-hand-book"></div>
                <div>Nguyên nhân và cách chữa trị mụn bọc</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-hand-book"></div>
                <div>Nguyên nhân và cách chữa trị mụn bọc</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-hand-book"></div>
                <div>Nguyên nhân và cách chữa trị mụn bọc</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-hand-book"></div>
                <div>Nguyên nhân và cách chữa trị mụn bọc</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-hand-book"></div>
                <div>Nguyên nhân và cách chữa trị mụn bọc</div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
