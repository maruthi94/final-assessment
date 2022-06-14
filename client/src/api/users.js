const createAccount = user => {
    return fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(async res => {
        if(!res.ok){
            const {error} = await res.json();
            throw new Error(error);
        }

        return res.json();
    });
};

const UsersService = { createAccount };


export default UsersService;