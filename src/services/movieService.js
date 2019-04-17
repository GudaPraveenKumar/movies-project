import http from './httpService';
import {apiEndpoint} from '../config.json';

const apiUrl = `${apiEndpoint}/movies`;

function movieUrl(id){
    return `${apiUrl}/${id}`
}

export function getMovies() {
    return http.get(`${apiUrl}`);
}

export function getMovie(movieId){
    return http.get(movieUrl(movieId));
}

export function saveMovie(movie){
    if(movie._id){
        const body = {...movie};
        delete body._id;
        return http.put(movieUrl(movie._id), body);
    }else{
        return http.post(`${apiUrl}`, movie);
    }
    
}

export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId))
}