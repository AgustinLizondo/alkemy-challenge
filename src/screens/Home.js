import React, { useState } from 'react';
import HomePage from '../components/HomePage';
import SignupForm from '../components/SignupForm'

const Home = () => {
    const [logged, setLogged] = useState(false)
    return (
        <div>
            {!logged
                ? <SignupForm setter={() => setLogged(true)} />
                : <HomePage />
            }
        </div>
    )
}

export default Home
