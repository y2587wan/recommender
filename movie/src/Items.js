import "./Items.css"
import Item from "./Item"
import React, { useEffect, useState } from 'react'
import db from './firebase';
import { doc, collection, getDocs   } from "firebase/firestore";
const queryParams = new URLSearchParams(window.location.search);
const token = queryParams.get('token');


function Items() {
    const [items, setItem] = useState([
    ]);
    useEffect(() => {
        async function fetchData() {
                const uid = localStorage.getItem("token")
                const moviesCol = collection(doc(collection(db, 'users'), uid !== "" && uid != null ?  uid : token), 'movies');
                const snapShot = await getDocs(moviesCol);
                setItem(snapShot.docs.map(doc => doc.data()));
        }
        fetchData()
    }, [items]);

    return (
        <div className="items">
            {
                
            items.map(item => (
                <Item key={item.title} title={item.title} url={item.url} genres={item.genres.replaceAll('|', ',')} id={item.tmdbId}/>
            )) }
        </div>
    )
}

export default Items;