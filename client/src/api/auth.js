const login = (email, password) => {
    return fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async res => {
        if (!res.ok) {
            const { error } = await res.json();
            throw new Error(error);
        }

        return res.json();
    });
};

const AuthService = { login };

export default AuthService;
