import axios from "axios";

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