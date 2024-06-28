import axios from 'axios'

const SampleUrl = 'http://localhost:5001';
const persistedLoginData = localStorage.getItem("persist:logindata");
const loginData = persistedLoginData ? JSON.parse(persistedLoginData) : {};
const loginInfo = loginData.userlogin ? JSON.parse(loginData.userlogin).LoginInfo[0] : null;
const AdminloginInfo = loginData.adminLogin ? JSON.parse(loginData.adminLogin).LoginInfo[0] : null;

const TOKEN = loginInfo ? loginInfo.Token : '';
const AdminToken = AdminloginInfo ? AdminloginInfo.Token : '';
export const basicRequest = axios.create({
  baseURL: SampleUrl
});

export const TokenRequest = axios.create({
  baseURL: SampleUrl,
  headers: { Authorization: `Bearer ${TOKEN}` }
});
export const AdminTokenRequest = axios.create({
  baseURL: SampleUrl,
  headers: { Authorization: `Bearer ${AdminToken}` }
});