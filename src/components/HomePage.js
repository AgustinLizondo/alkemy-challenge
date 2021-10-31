import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faMinus, faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
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

    const [intelligence, setstate] = useState(0);
    const [strength, setStrength] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [durability, setDurability] = useState(0);
    const [power, setPower] = useState(0);

    const [teamInfoShown, setTeamInfoShown] = useState(false);
    const [infoShown, setInfoShown] = useState(false);


    const ShowTeamInfo = () => {
        const teamLength = (goodOnes.length + badOnes.length + neutralOnes.length);
        return (
            <div className='teamInfo'>
                <h2>Team average stats</h2>
                {teamLength !== 0
                    ?
                    <p>
                        Intelligence: {Math.round(intelligence / teamLength)}
                        <br></br>
                        Strength: {Math.round(strength / teamLength)}
                        <br></br>
                        Speed: {Math.round(speed / teamLength)}
                        <br></br>
                        Durability: {Math.round(durability / teamLength)}
                        <br></br>
                        Power: {Math.round(power / teamLength)}
                        <br></br>
                    </p>
                    :
                    <p>
                        Intelligence: 0
                        <br></br>
                        Strength: 0
                        <br></br>
                        Speed: 0
                        <br></br>
                        Durability: 0
                        <br></br>
                        Power: 0
                        <br></br>
                    </p>
                }
                <div className='closeTab' onClick={() => setTeamInfoShown(false)}>
                    <p>Close</p>
                    <FontAwesomeIcon icon={faTimes} size={'lg'} />
                </div>
            </div >
        )
    }
    const TeamHero = ({ name, image, setTeamGroup, alignment }) => {

        const removeTeam = (heroToRemove) => {
            if (alignment === 'good') {
                setstate((actualValue) => actualValue - Number(heroToRemove.powerstats.intelligence));
                setStrength((actualValue) => actualValue - Number(heroToRemove.powerstats.strength));
                setSpeed((actualValue) => actualValue - Number(heroToRemove.powerstats.speed));
                setDurability((actualValue) => actualValue - Number(heroToRemove.powerstats.durability));
                setPower((actualValue) => actualValue - Number(heroToRemove.powerstats.power));

                setGoodOnes(goodOnes.filter((hero) => hero !== heroToRemove));
            } else if (alignment === 'bad') {
                setstate((actualValue) => actualValue - Number(heroToRemove.powerstats.intelligence));
                setStrength((actualValue) => actualValue - Number(heroToRemove.powerstats.strength));
                setSpeed((actualValue) => actualValue - Number(heroToRemove.powerstats.speed));
                setDurability((actualValue) => actualValue - Number(heroToRemove.powerstats.durability));
                setPower((actualValue) => actualValue - Number(heroToRemove.powerstats.power));

                setBadOnes(badOnes.filter((hero) => hero !== heroToRemove));
            } else {
                setstate((actualValue) => actualValue - Number(heroToRemove.powerstats.intelligence));
                setStrength((actualValue) => actualValue - Number(heroToRemove.powerstats.strength));
                setSpeed((actualValue) => actualValue - Number(heroToRemove.powerstats.speed));
                setDurability((actualValue) => actualValue - Number(heroToRemove.powerstats.durability));
                setPower((actualValue) => actualValue - Number(heroToRemove.powerstats.power));

                setNeutralOnes(neutralOnes.filter((hero) => hero !== heroToRemove));
            }
        }

        return (
            <div className='teamHero' >
                <h3 className={alignment} >{name}</h3>
                <img src={image.url} alt={name} />
                <div className='teamButtons'>
                    <FontAwesomeIcon className='icon' icon={faInfo} size={'2x'} color='white' />
                    <FontAwesomeIcon className='iconNd' icon={faMinus} size={'2x'} color='white' onClick={() => removeTeam(setTeamGroup)} />
                </div>
            </div>
        )
    }
    const ShowHeroInfo = ({ hero }) => {
        console.log(hero)
        return (
            <div className='heroInfo'>
                <h2>Hero stats</h2>
                <p>
                    Intelligence: {hero.powerstats.intelligence} <br></br>
                    Strength: {hero.powerstats.strength} <br></br>
                    Speed: {hero.powerstats.speed} <br></br>
                    Durability: {hero.powerstats.durability} <br></br>
                    Power: {hero.powerstats.power} <br></br>
                </p>
            </div >
        )
    }
    const Hero = ({ name, image, setTeamGroup, alignment }) => {
        // console.log(setTeamGroup)
        const addTeam = (hero) => {
            console.log(hero)
            if ((goodOnes.length + badOnes.length + neutralOnes.length) < 6 && (goodOnes.length <= 3 || badOnes.length <= 3 || neutralOnes.length <= 3)) {
                if (!goodOnes.includes(hero) && alignment === 'good' && goodOnes.length < 3) {
                    setstate((actualValue) => actualValue + Number(hero.powerstats.intelligence));
                    setStrength((actualValue) => actualValue + Number(hero.powerstats.strength));
                    setSpeed((actualValue) => actualValue + Number(hero.powerstats.speed));
                    setDurability((actualValue) => actualValue + Number(hero.powerstats.durability));
                    setPower((actualValue) => actualValue + Number(hero.powerstats.power));
                    setGoodOnes((actualGoodOnes) => [...actualGoodOnes, hero]);

                } else if (!badOnes.includes(hero) && alignment === 'bad' && badOnes.length < 3) {
                    setstate((actualValue) => actualValue + Number(hero.powerstats.intelligence));
                    setStrength((actualValue) => actualValue + Number(hero.powerstats.strength));
                    setSpeed((actualValue) => actualValue + Number(hero.powerstats.speed));
                    setDurability((actualValue) => actualValue + Number(hero.powerstats.durability));
                    setPower((actualValue) => actualValue + Number(hero.powerstats.power));
                    setBadOnes((actualBadOnes) => [...actualBadOnes, hero]);

                } else if (!neutralOnes.includes(hero) && alignment === 'neutral' && neutralOnes.length < 3) {
                    setstate((actualValue) => actualValue + Number(hero.powerstats.intelligence));
                    setStrength((actualValue) => actualValue + Number(hero.powerstats.strength));
                    setSpeed((actualValue) => actualValue + Number(hero.powerstats.speed));
                    setDurability((actualValue) => actualValue + Number(hero.powerstats.durability));
                    setPower((actualValue) => actualValue + Number(hero.powerstats.power));
                    setNeutralOnes((actualNeutralOnes) => [...actualNeutralOnes, hero]);

                } else {

                    alert(`You can not add more than three ${hero.biography.alignment} heros or you are trying to add the same hero twice`)

                }
            } else {

                alert('You can not add more than six heros to your team');

            }
        }
        return (
            <div className='hero' >
                <h3 className={alignment} >{name}</h3>
                <img src={image.url} alt={name} />
                <div className='heroButtons'>
                    <FontAwesomeIcon onClick={() => setInfoShown(!infoShown)} className='icon' icon={faInfo} size={'2x'} color='white' />
                    <FontAwesomeIcon className='iconNd' icon={faPlus} size={'2x'} color='white' onClick={() => addTeam(setTeamGroup)} />
                </div>
                {infoShown
                    ? <ShowHeroInfo hero={setTeamGroup} />
                    : null
                }
            </div>
        )
    }
    async function getHero(searchingTerm) {
        try {
            const data = await axios.get(`https://superheroapi.com/api/885656872344300/search/${searchingTerm}`);
            setHeros(data.data.results)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getHero('ba');
    }, []);
    const Header = () => {
        const [searchingBar, setSearchingBar] = useState(true);

        return (
            <header>
                <h1>Super Heros</h1>
                <FontAwesomeIcon icon={faSearch} size={'lg'} onClick={() => setSearchingBar(!searchingBar)} />
                {searchingBar
                    ? (
                        <form>
                            <input onChange={(evt) => { getHero(evt.target.value) }} className='inputHero' placeholder='For example: Batman' />
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
                <div className='titleTeam'>
                    <h2>Team</h2>
                    <FontAwesomeIcon onClick={() => setTeamInfoShown(!teamInfoShown)} icon={faInfo} size={'2x'} />
                    {teamInfoShown
                        ? <ShowTeamInfo />
                        : null
                    }
                </div>
                {
                    (goodOnes.map((el) => (
                        <TeamHero alignment={el.biography.alignment} key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                }

                {
                    (badOnes.map((el) => (
                        <TeamHero alignment={el.biography.alignment} key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                }

                {
                    (neutralOnes.map((el) => (
                        <TeamHero alignment={el.biography.alignment} key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                }
            </div>
            <div className='heroResults'>
                <h2>Heros Available</h2>
                {heros.length > 0
                    ? (heros.map((el) => (
                        <Hero alignment={el.biography.alignment} key={el.id} id={el.id} name={el.name} image={el.image} setTeamGroup={el} />
                    )))
                    : (<h3>Loading...</h3>)
                }
            </div>
        </div>
    )
}

export default HomePage