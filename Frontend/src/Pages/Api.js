
import {TokenRequest, basicRequest} from '../AxiosCreate'
import { LoginData } from '../Redux/UserSlice'
 

export const signupUser =async (data)=>{
    try{
        const SignupInfo=await basicRequest.post("/home/signup",data)
        console.log("signup sussesed",SignupInfo.data)

    }catch(err){
        console.log(err)
    }
}
export const loginUser=async (data,dispatch)=>{
    try{
          const LoginInfo=await basicRequest.post("/home/login",data)
          console.log(LoginInfo)
          dispatch(LoginData(LoginInfo.data))
          
    }catch(err){
        console.log(err)
    }
}

export const profileView = async (Id) => {
    console.log("from API:", Id);
    try {
        const ProfileData = await TokenRequest.get(`/home/ProfileData/${Id}`);
        return ProfileData.data
    } catch (err) {
        console.log(err);
    }
};

export const profileUpdate=async (data,Id)=>{
    try{
        await TokenRequest.put(`/home/UpdateProfile/${Id}`,data)
    }catch(err){
        console.log(err)
    }
}
export const getallPosts=async ()=>{
    try{
       const datas= await TokenRequest.get('/home/allPosts')
       console.log("from api of getallposts",datas.data)
       return datas.data;
    }catch(err){
        console.log(err)
    }
}
