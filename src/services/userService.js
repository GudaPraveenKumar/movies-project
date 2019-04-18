import http from './httpService';
import { apiEndpoint } from '../config.json';

const apiUrl = `${apiEndpoint}/users`;

export function register(user) {
    return http.post(apiUrl, {
        email: user.username,
        name: user.name,
        password: user.password
    })
}

