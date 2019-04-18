
import http from './httpService';
import { apiEndpoint } from '../config.json';
import jwtDecode from 'jwt-decode';

const apiUrl = `${apiEndpoint}`;
const tokenKey = "token";

// to get rid of bi-directional dependency
http.setJwt(getJwt());

export async function login(data) {
    const { data: jwt } = await http.post(`${apiUrl}/auth`, {
        email: data.username,
        password: data.password
    });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);

    } catch (ex) {
        return null;
    }
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
}