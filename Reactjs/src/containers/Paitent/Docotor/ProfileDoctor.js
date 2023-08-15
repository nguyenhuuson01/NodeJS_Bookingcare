import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ProfileDoctor.scss';
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProFile: {},
           

        }
    }

  async componentDidMount() {
   let data = await this.getInforDoctor(this.props.doctorId);
   this.setState({
    dataProFile: data
   })

  }

  getInforDoctor = async (id) => {
    let result = {};
    if(id){
        let res = await getProfileDoctorById(id);
        if(res && res.errCode === 0) {
            result = res.data;
        }

    }
    return result;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language) {
       
    }
    if(this.props.doctorId !== prevProps.doctorId) {
        // this.getInforDoctor(this.props.doctorId)
    }
 }

    renderTimeBooking = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {

            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ? 
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') 
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} {date}</div>
                    <div><FormattedMessage id="paitent.pricefree" /></div>
                </>
            )
        }
        return <></>
    }
   
  render() {
    let {dataProFile} = this.state;
    let {language, isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId }= this.props;
    let nameVi='', nameEn='';
    if(dataProFile && dataProFile.positionData) {
        nameVi = `${dataProFile.positionData.valueVi}, ${dataProFile.lastName} ${dataProFile.firstName}`
        nameEn = `${dataProFile.positionData.valueEn}, ${dataProFile.firstName} ${dataProFile.lastName} `
    }
    return (
       <div className="profile-doctor-container">
            <div className="intro-doctor">
                <div className="content-left"
                    style={{backgroundImage: `url(${dataProFile && dataProFile.imge ? dataProFile.imge : ''})`}}>
                </div>
                <div className="content-right">
                    <div className="up">
                    {language === LANGUAGES.VI ? nameVi  : nameEn}
                    </div>
                    <div className="down">
                    {isShowDescriptionDoctor === true ?
                        <>
                            {dataProFile && dataProFile.Markdown 
                                && dataProFile.Markdown.description
                                &&
                                <span>
                                {dataProFile.Markdown.description}
                                </span>
                            }
                        </>
                        :
                        <>
                            {this.renderTimeBooking(dataTime)}
                        </>
                    }
                    </div>
                </div>
            </div>
           { isShowLinkDetail === true && 
                <div className="view-detail-doctor"> 
                 <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                </div>
            }

            {isShowPrice === true &&
            <div className="price">
            <FormattedMessage id="paitent.extra-infor-doctor.price" />: 
                {dataProFile && dataProFile.Doctor_Infor && language === LANGUAGES.VI &&
                    
                    <NumberFormat 
                    className="currency"
                    value={dataProFile.Doctor_Infor.priceTypeData.valueVi }
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                }
                {dataProFile && dataProFile.Doctor_Infor && language === LANGUAGES.EN &&
                    
                    <NumberFormat 
                    className="currency"
                     value={dataProFile.Doctor_Infor.priceTypeData.valueEn }
                     displayType={'text'}
                     thousandSeparator={true}
                     suffix={"$"}
                   />
                }
            </div>
            }
       </div>  
            
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
