import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions"
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import {postPatientBookAppointment} from "../../../../services/userService";
import {toast} from "react-toastify"
import moment from "moment";
import NumberFormat from "react-number-format";
import LoadingOverlay from "react-loading-overlay";


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason:'',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            timeType:'',
            genders: '',
            isShowLoading: false,
        }
    }

  async componentDidMount() {
   this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result =  [];
    let language = this.props.language;
    if(data && data.length > 0) {
        data.map(item => {
            let object = {};
            object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            object.value = item.keyMap;
            result.push(object);
        })
    }
    return result;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.language !== prevProps.language) {
        
    }

    if(this.props.genders !== prevProps.genders){
            this.setState({
            genders: this.buildDataGender(this.props.genders)
        })
    }

    if(this.props.dataTime !== prevProps.dataTime){
        if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
            let doctorId = this.props.dataTime.doctorId;
            let timeType = this.props.dataTime.timeType;
            this.setState({
                doctorId:doctorId,
                timeType:timeType
            })
        }
    }
        
 }
 

 handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = {...this.state};
    stateCopy[id] = valueInput;
    this.setState({
        ...stateCopy,
    })
 }

 handleOnchangeDatePicker= (date) => {
    console.log(date,  new Date(date));
    this.setState({
        birthday: date
    })
 }

 handleChangeSelect = (selectedOption) => {
    this.setState({
        selectedGender: selectedOption
    })
 }

 buildTimeBooking = (dataTime) => {
    let {language} = this.props;
    if(dataTime && !_.isEmpty(dataTime)) {

        let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

        let date = language === LANGUAGES.VI ? 
            moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') 
            :
            moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY');
            return `${time} - ${date}`
        
    }
    return ''
}

builDoctorName = (dataTime)=> {
    let {language} = this.props;
    if(dataTime && !_.isEmpty(dataTime)) {
        let name = language === LANGUAGES.VI ?
        `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
        :
        `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName} `
       
            return name;
        
    }
    return ''
}

 handleConfirmBooking = async () => {
    
    //validate input
    // let date = new Date(this.state.birthday).getTime();
    this.setState({
        isShowLoading: true,
    })
    let doctorName = this.builDoctorName(this.props.dataTime);
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let date = moment(this.state.birthday).format("YYYY-MM-DDTHH:mm:ss");
   
    let res = await postPatientBookAppointment ({
        fullName: this.state.fullName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address,
        reason:this.state.reason,
        date: this.props.dataTime.date,
        birthday: date,
        selectedGender: this.state.selectedGender.value,
        doctorId: this.state.doctorId,
        timeType: this.state.timeType,
        language: this.props.language,
        timeString:timeString,
        doctorName:doctorName
    })

    this.setState({
        isShowLoading: false,
    })

    if(res && res.errCode === 0){
        toast.success("Booking a new appointment successfully");
        this.props.closeBookingModal();
    }else{
        toast.error('Booking a new appointment error!');
    }
    console.log('Confirm',this.state)
 }

  render() {
    let {isOpenModal, closeBookingModal, dataTime} = this.props;
    let doctorId= '';
    if(dataTime && !_.isEmpty(dataTime)){
        doctorId = dataTime.doctorId
    }
    return (
        <>
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading...'
            >
                <Modal isOpen={isOpenModal} 
                        className={"booking-modal-container"}
                        size="lg"
                        centered
                    >
                        <div className="booking-modal-content">
                            <div className="booking-modal-header">
                                <span className="left"><FormattedMessage id="booking.frofileuser" /></span>
                                <span className="right"
                                    onClick={closeBookingModal}
                                ><i className="fas fa-times"></i></span>
                            </div>
                            <div className="booking-modal-body">
                                
                                <div className="doctor-infor">
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescriptionDoctor={false}
                                        dataTime={dataTime}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div>
                            
                                <div className="row">
                                    <div className="col-6 form-group ">
                                        <label><FormattedMessage id="booking.fullname" /></label>
                                        <input className="form-control"
                                        value={this.state.fullName}  
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="booking.phone" /></label>
                                        <input className="form-control"
                                        value={this.state.phoneNumber}  
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="booking.addressemail" /></label>
                                        <input className="form-control"
                                        value={this.state.email}  
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}/>
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="booking.address" /></label>
                                        <input className="form-control"
                                        value={this.state.address}  
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}/>
                                    </div>
                                    <div className="col-12 form-group">
                                        <label><FormattedMessage id="booking.reasonforex" /></label>
                                        <input className="form-control"
                                        value={this.state.reason}  
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}/>
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="booking.birthday" /></label>
                                        <DatePicker
                                            onChange={this.handleOnchangeDatePicker}
                                            className="form-control "
                                            value={this.state.birthday} // birthday 
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="booking.sex" /></label>
                                        <Select
                                            value= {this.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="booking-modal-footer"> 
                                <button className="btn-booking-confirm" onClick={() => this.handleConfirmBooking()}>
                                    xác nhận
                                </button>
                                <button className="bt-booking-cancel" onClick={closeBookingModal}>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    
                </Modal>
            </LoadingOverlay>
        </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);