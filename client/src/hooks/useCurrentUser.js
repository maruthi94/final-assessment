import jwt_decode from 'jwt-decode';
import { useState } from 'react';

const readFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = jwt_decode(token);
    return decoded;
};

export const useCurrentUser = () => {
    const [user, setCurrentUser] = useState(readFromLocalStorage);
    const setUser = token => {
        if (token === null) {
            localStorage.removeItem('token');
            setCurrentUser(null);
        } else {
            const decoded = jwt_decode(token);
            localStorage.setItem('token', token);
            setCurrentUser(decoded);
        }
    };
    return [user, setUser];
};
