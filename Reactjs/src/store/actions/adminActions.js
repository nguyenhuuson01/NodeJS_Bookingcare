import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, 
     deleteUserService, editUserService,
      getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService,
      getAllSpecialty,getAllClinic
       } from "../../services/userService";
import {toast} from "react-toastify"

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

export const fetchGenderStart =  () => {

    return  async (dispatch, getState) => {
        try{

            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed())
            }
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log("fetstartdgender err:" ,e)
        }
        
    }
}
export const fetchPositionStart =  () => {

    return  async (dispatch, getState) => {
        try{
           
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed())
            }
        }catch(e){
            dispatch(fetchPositionFailed());
            console.log("fetchPositionFailed err:" ,e)
        }
        
    }
}

export const fetchRoleStart =  () => {

    return  async (dispatch, getState) => {
        try{
            
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed())
            }
        }catch(e){
            dispatch(fetchRoleFailed());
            console.log("fetchRoleFailed err:" ,e)
        }
        
    }
}

export const createNewUser = (data) => {
    return  async (dispatch, getState) => {
        try{
            
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new user successfully!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFailed())
            }
        }catch(e){
            dispatch(saveUserFailed());
            console.log("saveUserFailed err:" ,e)
        }
        
    }
}

export const editAUser = (inputData) => {
    return  async (dispatch, getState) => {
        try{
            
            let res = await editUserService(inputData);
            if(res && res.errCode === 0){
                toast.success("Update the user successfully!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Update the user error!");
                dispatch(editUserFailed())
            }
        }catch(e){
            toast.error("Update the user error!");
            dispatch(editUserFailed());
            console.log("editUserFailed err:" ,e)
        }
        
    }
}

export const deleteAUser = (userId) => {
    return  async (dispatch, getState) => {
        try{
            
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success("Delete the user successfully!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed())
            }
        }catch(e){
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
            console.log("deleteUserFailed err:" ,e)
        }
        
    }
}

export const fetchAllUsersStart =  () => {

    return  async (dispatch, getState) => {
        try{
            
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0){
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }else{
                toast.error("Fetch all user error!");
                dispatch(fetchAllUserFailed())
            }
        }catch(e){
            toast.error("Fetch all user error!");

            dispatch(fetchAllUserFailed());
            console.log("fetchAllUserFailed err:" ,e)
        }
        
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
    
})

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const fetchTopDoctor = () => {   
    
    return  async (dispatch, getState) => {
        try{
            let res = await getTopDoctorHomeService ('');
            if (res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctor: res.data
                })
        
            }else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                
                })
            }
         
        }catch(e){
            console.log('fetch top doctor failed', e)
            dispatch({
               type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
               
               })
        }
    }
}
 
export const fetchALLDoctors = () => {   
    
    return  async (dispatch, getState) => {
        try{
            let res = await getAllDoctors ();
            if (res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
        
            }else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                
                })
            }
         
        }catch(e){
            console.log('FETCH_ALL_DOCTORS_FAILED', e)
            dispatch({
               type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
               
               })
        }
    }
}

export const saveDetailDoctor = (data) => {   
    
    return  async (dispatch, getState) => {
        try{
            let res = await saveDetailDoctorService (data);
            if (res && res.errCode === 0){
                toast.success("Save the doctor successfully!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }else {
                toast.error(" Save the doctor error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        }catch(e){
            toast.error(" Save the doctor error!");
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e)
            dispatch({
               type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
               
            })
        }
    }
}




export const fetchALLScheduleTimes = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllCodeService("TIME");
            if( res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({ 
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        }catch(e){
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED:', e)
            dispatch ({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}


export const getAllRequiredDoctorInfor =  () => {

    return  async (dispatch, getState) => {
        try{
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if(resPrice && resPrice.errCode === 0 
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                &&resSpecialty && resSpecialty.errCode === 0
                &&resClinic && resClinic.errCode === 0){
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data,
                        resClinic: resClinic.data
                    }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            }else{
                dispatch(fetchRequiredDoctorInforFailed())
            }
        }catch(e){
            dispatch(fetchRequiredDoctorInforFailed());
            console.log("fefetchRequiredDoctorInforFailed err:" ,e)
        }
        
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
    
})