import axios from "axios";

export async function getHero(searchTerm) {
    try {
        const response = await axios.get(`https://superheroapi.com/api/885656872344300/search/${searchTerm}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin',
            },
        });
        console.log(response);
    } catch (e) {
        console.log(e)
    }
}

export async function setUser(email, password) {
    try {
        await axios.post('http://challenge-react.alkemy.org/', {
            email: email,
            password: password,
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
            })
    } catch (e) {
        console.log(e);
    }
}