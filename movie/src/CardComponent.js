import './CardComponent.css';
import TinderCard from "react-tinder-card"
import React, { useEffect, useState, useRef, useMemo } from 'react'
import db from './firebase';
import Buttons from './Buttons';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, setDoc, collection, getDocs   } from "firebase/firestore"; 
function CardComponent() {
    const uid = localStorage.getItem("token")
    const [movies, setMovies] = useState([]);
    const [userMovieIds, setUserMovieId] = useState([])

    
    async function fetchData() {
        const uuid = localStorage.getItem("token")
        if (uuid !== "") {
            const userMoviesCol = collection(doc(collection(db, 'users'), uuid), 'movies');
            const userSnapShot = await getDocs(userMoviesCol);
            setUserMovieId(userSnapShot.docs.map(doc => doc.data().tmdbId));
        }
        const moviesCol = collection(db, 'movies');
        const snapShot = await getDocs(moviesCol);
        setMovies(snapShot.docs.map(doc => doc.data()));
    }
    useEffect(() => {fetchData()}, [movies]);
    const [currentIndex, setCurrentIndex] = useState(49)
    const currentIndexRef = useRef(currentIndex);


    const outOfFrame = (name, idx) => {
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
      }
    const canSwipe = currentIndex >= 0
    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
      }
    const swiped = async (index, direction, item) => {
        updateCurrentIndex(index - 1)
        if (direction === "right") {
            await setDoc(doc(collection(doc(collection(db, 'users'), uid), 'movies'), item.tmdbId.toString()), item);
        }
    }
    const childRefs = useMemo(
        () =>
          Array(movies.length)
            .fill(0)
            .map((i) => React.createRef()),
        [movies]
      )
    
    const swipe = async (dir) => {
        console.log("test");
        console.log(currentIndex);
        if (canSwipe && currentIndex < movies.length) {
            console.log(currentIndex)
            console.log("ref", childRefs[currentIndex])
            console.log('item', movies[currentIndex])
            await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
            console.log(dir)
            if (dir === "right") {
                await setDoc(doc(collection(doc(collection(db, 'users'), uid), 'movies'), movies[currentIndex].tmdbId.toString()), movies[currentIndex]);
            }
        }
      }

    return (
        <div className="cardContainer">
            <div className="cards">
                {movies.filter(movie => 
                    !userMovieIds.includes(movie.tmdbId)
                ).map((movie, index) => (
                    <TinderCard className="swipe" 
                    ref={childRefs[index]}
                    key={movie.title} 
                    preventSwipe={['up', 'down']} 
                    onSwipe={(dir) => swiped(index, dir, movie)}
                    onCardLeftScreen={() => outOfFrame(movie.title, index)}>
                        <div className="card">
                            <img src={movie.url} alt={movie.title}/>
                            <h6>{movie.title}</h6>
                            {
                                movie.genres.split("|").map(genre => (
                                    <span className="label_genres" key={movie.name + genre}>{genre}</span>
                                ))
                            }

                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="footer__buttons">
                
            {/* <IconButton onClick={() => swipe('left')}> 
                    <CloseIcon className="footerbuttons__close" fontSize="large" />
                </IconButton>

                <IconButton onClick={() => swipe('right')}>
                    <FavoriteIcon className="footerbuttons__like" fontSize="large" />
                        </IconButton> */}
            </div>
        </div>
    )
}

export default CardComponent