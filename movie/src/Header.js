import "./Header.css"
import React, { useEffect } from "react"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CategoryIcon from "@mui/icons-material/Category";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {Helmet} from "react-helmet";
import { Snapshare }  from "react-snapshare";

function Header({ page, url }) {
    console.log(url)
    const uid = localStorage.getItem("token");
    const urlShare = "https://movie-eeb2c.web.app/items?token=" + uid;
    const auth = getAuth();
    const signOut = () => {
    localStorage.setItem('token', '');
      auth.signOut();
    }
    useEffect(() => {

            (function (d, s, id) {
                var js,
                  sjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://sdk.snapkit.com/js/v1/create.js";
                sjs.parentNode.insertBefore(js, sjs);
              })(document, "script", "snapkit-creative-kit-sdk");

    }, [url]);
    (function (d, s, id) {
        var js,
          sjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://sdk.snapkit.com/js/v1/create.js";
        sjs.parentNode.insertBefore(js, sjs);
      })(document, "script", "snapkit-creative-kit-sdk");
    return (
        
        <div>
            {
                page === "items" ? (
                    <div  className="header">
                        <Helmet> 
                        <meta
                            property="snap:sticker"
                            content="https://kit.snapchat.com/ckweb/test/image.png"
                            />
                            <meta property="snap:app_id" content="YOUR_APP_ID_HERE" />
                            <meta property="snap:publisher_id" content="YOUR_PUBLISHER_ID_HERE" />
                        </Helmet>
                        <Link to="/">
                            <IconButton> 
                                <ArrowBackIosIcon fontSize="large" className="header__icon" />
                            </IconButton>
                        </Link>
                        <IconButton onClick={() => {
                            window.open("https://www.snapchat.com/scan?attachmentUrl=" + urlShare, 'newwin', 'height=400px,width=400px');
                        }}>
                        <ShareIcon>
                        </ShareIcon>
                        <Snapshare
                            dataShareUrl={urlShare}
                            className="snapchat-creative-kit-share"
                        />
                        </IconButton>
                        <Link to="/items">
                            <IconButton>
                                <FormatListBulletedIcon fontSize="large" className="header__icon"/>
                            </IconButton>
                        </Link>
                    </div>
                ) : (
                    <div  className="header"> 
                        <Link to="/">
                            <IconButton onClick={signOut}>
                                <LogoutIcon fontSize="large" className="header__icon"/>
                            </IconButton>
                        </Link>
                        <Link to="/items">
                            <IconButton>
                                <FormatListBulletedIcon fontSize="large" className="header__icon"/>
                            </IconButton>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default Header