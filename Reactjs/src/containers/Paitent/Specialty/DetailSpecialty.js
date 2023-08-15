import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Docotor/DoctorSchedule";
import DoctorExtraInfor from "../Docotor/DoctorExtraInfor";
import ProfileDoctor from "../Docotor/ProfileDoctor";
import {getAllDetailSpecialtyById, getAllCodeService} from "../../../services/userService";
import _, { result } from "lodash";
import { LANGUAGES } from "../../../utils";
 
class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
          arrDoctorId: [],
          dataDetailspecialty: {},
          listProvince: [],
        }
    }

  async componentDidMount() {
   if(this.props.match && this.props.match.params && this.props.match.params.id) {
    let id = this.props.match.params.id;

    let res = await getAllDetailSpecialtyById({
      id: id,
      location: 'ALL'
    });

    let resProvince = await getAllCodeService('PROVINCE');

    if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0)  {
      let data = res.data;
      let arrDoctorId= [];
      if(data && !_.isEmpty(res.data)) {
        let arr = data.doctorSpecialty;
        if(arr && arr.length > 0) {
          arr.map(item =>{
            arrDoctorId.push(item.doctorId)
          })
        }
      }

      let dataProvince = resProvince.data;
      if(dataProvince && dataProvince.length > 0) {
        dataProvince.unshift({
          createdAt: null,
          keyMap: 'ALL',
          type: 'PROVINCE',
          valueEn: 'ALL',
          valueVi: 'Toàn Quốc'
        })
      }

      this.setState({
        dataDetailspecialty: res.data,
        arrDoctorId: arrDoctorId,
        listProvince: dataProvince ? dataProvince : []     

      })
    }
   }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language) {
       
    }
 }

 handleOnchangeSelect = async (event) => {
  if(this.props.match && this.props.match.params && this.props.match.params.id) {
    let id = this.props.match.params.id;
    let location = event.target.value;

    let res = await getAllDetailSpecialtyById({
      id: id,
      location: location
    });

    if(res && res.errCode === 0 )  {
      let data = res.data;
      let arrDoctorId= [];
      if(data && !_.isEmpty(res.data)) {
        let arr = data.doctorSpecialty;
        if(arr && arr.length > 0) {
          arr.map(item =>{
            arrDoctorId.push(item.doctorId)
          })
        }
      }
    
      this.setState({
        dataDetailspecialty: res.data,
        arrDoctorId: arrDoctorId,    
      })
    }
   }
  }
 

  render() {
    let {arrDoctorId, dataDetailspecialty, listProvince} = this.state;
    let {language} = this.props;
    
    return (
      <div className="detail-specialty">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailspecialty && !_.isEmpty(dataDetailspecialty)
              &&
            <div dangerouslySetInnerHTML={{__html: dataDetailspecialty.descriptionHTML}}></div>
            }
          </div>
          <div className="search-sp-doctor">
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
            {listProvince && listProvince.length > 0 && 
              listProvince.map((item, index) => {
                return(
                  <option key={index} value={item.keyMap}>
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </option>
                )
                
              })}
            </select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor">
                  <div className="conten-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                        // dataTime={dataTime}
                      />
                    </div>
                  </div>
                  <div className="conten-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} key={index} />
                    </div>
                    <div className="doctor-extrainfo">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
