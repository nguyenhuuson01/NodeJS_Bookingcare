import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt);
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}

let handleUserLogin = (email, password) =>{
    return new Promise(async (resolve,reject) =>{
        try{
            let userData = {};

            let isExist = await checkUserEmail(email);
            if(isExist) {
                //user already exists
                let user = await db.User.findOne({
                    attributes: ['id','email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: {email: email},
                    raw: true

                });
                if(user) {
                    //compare password
                    let check= await bcrypt.compareSync(password, user.password); // false
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage ='OK!';
                        
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage ='Wrong password';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User's not found~`
                }

            }else{
                //return error
                userData.errCode = 1;
                userData.errMessage =`Your's Email isn't exist in our system, plz try other email`
            }
                            
            resolve(userData);

        }catch(e){
            reject(e);
        }

    }) 
}

// let compareUserPassword = () => {
//     return new Promise((resolve, reject) => {
//         try{

//         }catch(e){
//             reject(e);
//         }
//     });
// }

let checkUserEmail= (userEmail) => {
    return new Promise(async (resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }
        }catch(e){
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve,reject) => {
        try{
            let users ='';
            if(userId === 'ALL'){
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);

        }catch(e){
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise (async (resolve, reject) => {
        try{
            //check email is exist
            let check = await checkUserEmail(data.email); 
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage:'Your email is already in used. Please try again!'
                })
            } else {
                let hashPassWordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender ,
                    positionId: data.positionId,
                    roleId: data.roleId,
                    imge: data.avatar,
            })
            resolve( {
                errCode: 0,
                message: 'OK!'
            });

            }
            

        }catch(e){
            reject(e);
        }
    })
}

let deleteUser =(userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: {id: userId}
        })
        
        if(!user) {
            resolve({
                errCode: 2,
                errMessage: `the user isn't exist`
            })
        }
        // console.log('Checking: ', user)
        
        await db.User.destroy({
            where: {id: userId}
        })

        resolve({
            errCode: 0,
            errMessage: 'The user is delete'
        })
    })
}
let updateUserData = (data) =>{
    return new Promise(async (resolve, reject) => {
        try{
            if(!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve ({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                if (data.avatar) {
                    user.imge = data.avatar;
                }

                await user.save();

                
                resolve({
                    errCode: 0,
                    message: 'Update the user successfully!'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                });

            }
        }catch(e){
            reject(e);
        }
    })
       
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage:'Missing required parameter!'
                })
            }else{
                let res ={};
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput}
                });
                res.errCode= 0;
                res.data = allcode;
                resolve(res);
            }
        }catch (e){
            reject(e);

        }
    })
}

module.exports ={
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService:getAllCodeService,
}