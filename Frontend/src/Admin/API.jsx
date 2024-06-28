import {AdminTokenRequest, basicRequest} from '../AxiosCreate'
import { LoginData } from '../Redux/Admin'


export const loginAdmin=async (data,dispatch)=>{
    try{
          const LoginInfo=await basicRequest.post("/admin/login",data)
          console.log(LoginInfo)
          dispatch(LoginData(LoginInfo.data))
          
    }catch(err){
        console.log(err)
    }
}
export const getallusers=async ()=>{
    try{
         const allusers=await AdminTokenRequest.get('/admin/allUsers')
         return allusers;
    }catch(err){
        console.log(err)
    }
}
export const addadmin=async (data)=>{
    try{
        const datas =await AdminTokenRequest.post('/admin/signup',data)
    }catch(err){
        console.log(err);
    }
}