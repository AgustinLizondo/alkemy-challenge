import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../components/styles/HomePage.css';

const HomePage = () => {

    setTimeout(() => {
        localStorage.removeItem('token');
    }, 900000);
    const [goodOnes, setGoodOnes] = useState([]);
    const [badOnes, setBadOnes] = useState([]);
    const [team, setTeam] = useState(goodOnes.concat(badOnes));
    const [heros, setHeros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('robin');
    // const [reload, setReload] = useState(true);

    const TeamHero = ({ name, image, setTeamGroup }) => {

        const removeTeam = (heroToRemove) => {
            setTeam(team.filter((hero) => hero !== heroToRemove));
            // setHeros(heros.push(heroToRemove));
            // setReload(!reload);
        }

        return (
            <div className='teamHero'>
                <h3 >{name}</h3>
                <img src={image.url} alt={name} />
                <div className='teamButtons'>
                    <FontAwesomeIcon className='icon' icon={faInfo} size={'2x'} color='white' />
                    <FontAwesomeIcon className='iconNd' icon={faMinus} size={'2x'} color='white' onClick={() => removeTeam(setTeamGroup)} />
                </div>
            </div>
        )
    }
    const Hero = ({ name, image, setTeamGroup }) => {

        const addTeam = (hero) => {
            if (team.length < 6) {
                if (!team.includes(hero)) {
                    console.log(goodOnes.length);
                    console.log(badOnes.length);
                    console.log(hero.goodness)
                    if (goodOnes.length < 3) {
                        if (hero.goodness === 'good') {
                            setGoodOnes((actualGoodOnes) => [...actualGoodOnes, hero]);
                        } else if (hero.goodness === 'bad') {
                            setBadOnes((actualBadOnes) => [...actualBadOnes, hero]);
                        }
                        alert(`You can not add more than three ${hero.goodness} heros`)

                        // setHeros(heros.filter((elementTeamHero) => elementTeamHero !== hero));
                    } else {
                        alert('You can not add the same hero twice')
                    }
                } else {
                    alert('You can not add more than six heros to your team');
                }
            }
        }
        return (
            <div className='hero'>
                <h3 >{name}</h3>
                <img src={image.url} alt={name} />
                <div className='heroButtons'>
                    <FontAwesomeIcon className='icon' icon={faInfo} size={'2x'} color='white' />
                    <FontAwesomeIcon className='iconNd' icon={faPlus} size={'2x'} color='white' onClick={() => addTeam(setTeamGroup)} />
                </div>
            </div>
        )
    }
    useEffect(() => {
        async function getHero() {
            try {
                const response = await axios.get(`https://superheroapi.com/api/885656872344300/search/${searchTerm}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Vary': 'Origin',
                    },
                }),
                    json = response.data.results;
                json.forEach(async (el) => {
                    let hero = {
                        id: el.id,
                        name: el.name,
                        image: el.image,
                        goodness: el.biography.alignment,
                        stats: {
                            intelligence: el.powerstats.intelligence,
                            strength: el.powerstats.strength,
                            speed: el.powerstats.speed,
                            durability: el.powerstats.durability,
                            power: el.powerstats.power,
                            combat: el.powerstats.combat
                        },
                        details: {
                            weight: el.appearance.weight,
                            height: el.appearance.height,
                            fullname: el.biography[0],
                            aliases: el.aliases,
                            eyesColor: el.appearance[4],
                            hairColor: el.appearance[5],
                            workingPlace: el.work.base,
                        },
                    };
                    setHeros((herosArr) => [...herosArr, hero]);
                })
            } catch (err) {
                console.log(err)
            }
        }
        getHero();
    }, [searchTerm]);

    const Header = () => {
        const [searchingBar, setSearchingBar] = useState(true);

        return (
            <header>
                <h1>Super Heros</h1>
                <FontAwesomeIcon icon={faSearch} size={'lg'} onClick={() => setSearchingBar(!searchingBar)} />
                {searchingBar
                    ? (
                        <form>
                            <input onChange={(evt) => { setSearchTerm(evt.target.value) }} className='inputHero' placeholder='For example: Batman' />
                        </form>)
                    : (null)
                }
            </header >
        )
    }

    return (
        <div className='superHerosHomePage' >
            <Header />
            <div className='tableTeam'>
                <h2>Team</h2>
                {team.length > 0
                    ? (team.map((el) => (
                        <TeamHero key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                    : (<h3>Your team is empty</h3>)
                }
            </div>
            <div className='heroResults'>
                <h2>Heros Available</h2>
                {heros.length > 0
                    ? (heros.map((el) => (
                        <Hero key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                    : (<h3>Loading...</h3>)
                }
            </div>
        </div>
    )
}

export default HomePage