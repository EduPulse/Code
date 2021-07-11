import React from 'react'
import NavBarWP from "./navBarWP";
import {makeStyles} from "@material-ui/core/styles";
import Article from "./article";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50%",
    },
    navBar: {
        display: "block",
        position:"absolute",
    },
    article:{
        paddingTop:100,
        position:"inherit",
        display:"block",
        width:"60%",
        margin:"auto",
    }
}));

export default function PreviewArticle() {
    const classes = useStyles();
    return (
        <div>
            <NavBarWP className={classes.navBar}/>

            <div className={classes.article}>
                <Article customWidth={"100%"}/>
            </div>

        </div>
    )
}
