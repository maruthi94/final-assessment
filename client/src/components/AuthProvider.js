import AuthService from '../api/auth';
import UsersService from '../api/users';
import AuthContext from '../context/auth-context';
import { useCurrentUser } from '../hooks/useCurrentUser';

function AuthProvider({ children }) {
    const [user, setUser] = useCurrentUser();

    const createAccount = user => {
        return UsersService.createAccount(user);
    };

    const login = async (email, password) => {
        return AuthService.login(email, password).then(({ token }) => setUser(token));
    };

    const logout = () => {
        setUser(null);
    };

    const value = { createAccount, login, logout, isLoggedIn: !!user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
