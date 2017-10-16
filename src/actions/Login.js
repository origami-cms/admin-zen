export const login = (email, password) =>
    async dispatch => {
        console.log({email, password});
        const res = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        const data = res.JSON();
        console.log(data);
    }
