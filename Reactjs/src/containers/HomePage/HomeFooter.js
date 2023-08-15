import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";

// import iconvn from '../../assets/vn.jpg';
// import iconen from '../../assets/en.png'

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2023 Nguyeenx Sown. More inpormation Call Sonw.{" "}
          <a target="_blank" href="https://www.youtube.com/watch?v=cYsk0t7pBA4">
            &#8594; Click here &#8592;
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
