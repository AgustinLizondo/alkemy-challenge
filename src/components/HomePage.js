import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { getHero } from '../services/axios'

const teamHero = ({ hero }) => {
    return (
        <div className='TeamHero'>
            <h2>{hero.name}</h2>
            <img src={hero.image} alt={hero.id} />
            <FontAwesomeIcon icon={faInfo} size={32} />
        </div>
    )
}

const HomePage = () => {
    // const [team, setTeam] = useState(null);
    getHero('batman')
    return (
        <div>
            <h1>Super Heros</h1>

            <div className='tableTeam'>
                {/* {team.forEach((el) => {
                    console.log(el)
                })} */}
            </div>
        </div>
    )
}

export default HomePage
