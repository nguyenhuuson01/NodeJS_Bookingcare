import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./managePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor, postSendRemedy } from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";


class managePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
          currentDate: moment(new Date()).startOf('day').valueOf(),
          isOpenRemedyModal: false,
          dataPatient:[],
          data: {},
          isShowloading: false
        } 
    }

  async componentDidMount() {
   this.getDataPatient();
  }

  getDataPatient = async () => {
    let {user} = this.props;
    let {currentDate} = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
     })
     if(res && res.errCode === 0){
      this.setState({
        dataPatient: res.data,
      })
     }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language) {
       
    }
 }

 handleOnchangeDatePicker =  (date) => {
  this.setState({
      currentDate: date
  }, async () => {
    await this.getDataPatient();
  })
  
}

handleBtnConfirm = (item) => {
  let data = {
    doctorId: item.doctorId,
    patientId: item.patientId, 
    email: item.patientData.email,
    timeType: item.timeType,
    patientName: item.patientData.firstName
    
  }
  this.setState({
    isOpenRemedyModal: true,
    dataModal: data

   })
  // console.log('>>>>>>.',data);
}

closeRemedyModal = () => {
  this.setState({
    isOpenRemedyModal: false,
    dataModal: {}

   })
}

sendRemedy = async (dataChild) => {
  let {dataModal} = this.state;
  this.setState({
    isShowloading: true
  })
  
  let res = await postSendRemedy ({
    email: dataChild.email,
    imgBase64: dataChild.imgBase64,
    doctorId: dataModal.doctorId,
    patientId: dataModal.patientId,
    timeType: dataModal.timeType,
    language: this.props.language,
    patientName: dataModal.patientName,
  })
  // console.log('check', res)
  if(res && res.errCode === 0){
    this.setState({
      isShowloading: false
    })
    toast.success('Send Remedy Success');
    this.closeRemedyModal(); 
    await this.getDataPatient();

  } else {
    this.setState({
      isShowloading: false
    })
    toast.error('Send Remedy Failed');
  }
}

  render() {
    let {dataPatient, isOpenRemedyModal, dataModal} = this.state;
    let {language} = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowloading}
          spinner
          text='Loading...'
        >
        
          <div className="manemge-patient-contaier">
            <div className="m-p-tilte">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control "
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                  <table>
                  <tbody>
                      <tr>
                        <th style={{width:'5%'}}>STT</th>
                        <th style={{width:'20%'}}>Thời gian</th>
                        <th style={{width:'25%'}}>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th style={{width:'5%'}}>Giới tính</th>
                        <th style={{width:'15%'}}>Actions</th>
                      </tr>
                      {
                        dataPatient && dataPatient.length > 0 ?
                        dataPatient.map((item, index) => {
                          let time = language === LANGUAGES.VI ?
                          item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                          let gender = language === LANGUAGES.VI ?
                          item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                          return (
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{time}</td>
                              <td>{item.patientData.firstName}</td>
                              <td>{item.patientData.address}</td>
                              <td>{gender}</td>
                              <td >
                                <button className="mp-btnconfirm"
                                onClick={() => this.handleBtnConfirm(item)}
                                >
                                  Xacs Nhaanj
                                </button>
                              </td>
                          </tr>
                          )
                        })
                        : 
                        <tr>
                          <td colSpan="6">Nodata... </td>
                        </tr>
                      }
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
          <RemedyModal
          isOpenModal = {isOpenRemedyModal}
          dataModal = {dataModal}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(managePatient);
