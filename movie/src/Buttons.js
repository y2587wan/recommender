
import React from 'react'
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Buttons.css';
const Buttons = ({swipeleft, swiperight}) => {
    return (
        <div className="footer__buttons">
            <IconButton onClick={swiperight}> 
                <CloseIcon className="footerbuttons__close" fontSize="large" />
            </IconButton>

            <IconButton onClick={swiperight}>
                <FavoriteIcon className="footerbuttons__like" fontSize="large" />
            </IconButton>
        </div>
    )
}

export default Buttons