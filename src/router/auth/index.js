import {jwtDecode} from 'jwt-decode';

export function isTokenValid(token) {
    console.log(token)
    if (!token) return false;

    try {
        const decoded = jwtDecode(token,);
        const currentTime = Date.now() / 1000;
        console.log(decoded.exp > currentTime)
        return decoded.exp > currentTime;
    } catch (e) {
        console.log(e)
        return false;
    }
}