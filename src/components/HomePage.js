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
    const [neutralOnes, setNeutralOnes] = useState([]);
    const [heros, setHeros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('bat');
    // const [reload, setReload] = useState(true);

    const TeamHero = ({ name, image, setTeamGroup }) => {

        const removeTeam = (heroToRemove) => {
            if (heroToRemove.goodness === 'good') {
                setGoodOnes(goodOnes.filter((hero) => hero !== heroToRemove));
            } else if (heroToRemove.goodness === 'bad') {
                setBadOnes(badOnes.filter((hero) => hero !== heroToRemove));
            } else {
                setNeutralOnes(neutralOnes.filter((hero) => hero !== heroToRemove));
            }
        }
        // setHeros(heros.push(heroToRemove));
        // setReload(!reload);

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
            if ((goodOnes.length + badOnes.length + neutralOnes.length) < 6 && (goodOnes.length < 3 || badOnes.length < 3 || neutralOnes.length < 3)) {
                if (!goodOnes.includes(hero) && hero.goodness === 'good' && goodOnes.length < 3) {
                    setGoodOnes((actualGoodOnes) => [...actualGoodOnes, hero]);
                } else if (!badOnes.includes(hero) && hero.goodness === 'bad' && badOnes.length < 3) {
                    setBadOnes((actualBadOnes) => [...actualBadOnes, hero]);
                } else if (!neutralOnes.includes(hero) && hero.goodness === 'neutral' && neutralOnes.length < 3) {
                    setNeutralOnes((actualNeutralOnes) => [...actualNeutralOnes, hero]);
                } else {
                    alert(`You can not add more than three ${hero.goodness} heros or you are trying to add the same hero twice`)
                }
            } else {
                alert('You can not add more than six heros to your team');
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
    async function getHero(searchingTerm) {
        try {
            const data = await axios.get(`https://superheroapi.com/api/885656872344300/search/${searchingTerm}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Vary': 'Origin',
                }
            });
            setHeros(data.data.results)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getHero(searchTerm);
    }, [searchTerm]);


    // heros.forEach(async (el) => {
    //     let hero = {
    //         id: el.id,
    //         name: el.name,
    //         image: el.image,
    //         goodness: el.biography.alignment,
    //         stats: {
    //             intelligence: el.powerstats.intelligence,
    //             strength: el.powerstats.strength,
    //             speed: el.powerstats.speed,
    //             durability: el.powerstats.durability,
    //             power: el.powerstats.power,
    //             combat: el.powerstats.combat
    //         },
    //         details: {
    //             weight: el.appearance.weight,
    //             height: el.appearance.height,
    //             fullname: el.biography[0],
    //             aliases: el.aliases,
    //             eyesColor: el.appearance[4],
    //             hairColor: el.appearance[5],
    //             workingPlace: el.work.base,
    //         },
    //     };
    //     setHeros((herosArr) => [...herosArr, hero]);
    // })

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
                {goodOnes.length > 0

                    ? (goodOnes.map((el) => (
                        <TeamHero key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                    // : (<h3 className='goodTeam'>Your good team is empty</h3>)
                    : null
                }

                {badOnes.length > 0

                    ? (badOnes.map((el) => (
                        <TeamHero key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                    // : (<h3 className='badTeam'>Your bad team is empty</h3>)
                    : null
                }

                {neutralOnes.length > 0

                    ? (neutralOnes.map((el) => (
                        <TeamHero key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                    // : (<h3 className='badTeam'>Your bad team is empty</h3>)
                    : null
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