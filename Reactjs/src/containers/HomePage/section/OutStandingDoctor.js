import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

// import iconvn from '../../assets/vn.jpg';
// import iconen from '../../assets/en.png'

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.topDoctors !== this.props.topDoctors){
      this.setState({
        arrDoctors: this.props.topDoctors
      })
    } 
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if(this.props.history){
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  }



  render() {
    let arrDoctors = this.state.arrDoctors;
    let {language} = this.props;
    // arrDoctors = arrDoctors.concat (arrDoctors).concat(arrDoctors)
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="title-btn">
              <FormattedMessage id="homepage.more-info" />{" "}
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.imge) {
                    imageBase64 = new Buffer(item.imge, "base64").toString("binary");
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName} `;
                  return (
                    <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                      <div className="border-customize">
                        <div className="outer-bg">
                          <div
                            className="bg-img section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Sức khỏe tâm thần - Tư vấn, điều trị tâm lý</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
