import "./Item.css"
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import db from './firebase';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { doc, deleteDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Item({ title, url, genres, id }) {
    const deleteItem = async () => {
        const uid = localStorage.getItem("token");
        await deleteDoc(doc(collection(doc(collection(db, 'users'), uid), 'movies'), id.toString()));
    }
    const auth = getAuth();
    const [ isUserSignedIn, setIsUserSignedIn ] = useState(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserSignedIn(true)
      } else {
        setIsUserSignedIn(false)
      }
    });
    return (
        <div className="item">
            <Avatar className="item__image" alt={title + genres} src={url} />
            <div className="item__details">
                <h2>{title}</h2>
                <p>{genres}</p>
            </div>
            {
                isUserSignedIn ? (
                    <IconButton className="buttons__delete" onClick={deleteItem}> 
                    <CloseIcon fontSize="large" />
                </IconButton>
                ) : (<br />)
            } 

        </div>
    )
}

export default Item;