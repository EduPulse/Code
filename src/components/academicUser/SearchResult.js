import React, {useState} from 'react'
import AcaNavbar from './navBars/acaNavbar';
import {makeStyles} from "@material-ui/core/styles";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import UserCard from "./UserCard";
import UniversityListing from "./UniversityListing";
import Grid from "@material-ui/core/Grid";
import PostListing from "./PostListing";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50%",
    },
    navBar: {
        display: "block",
        position: "absolute",
    },
    pageContent: {
        paddingTop: 100,
        margin: 30,
    },
    topOptions: {
        margin: "auto",
        display: "table",
    },
    optionUnit: {
        width: 200,
        padding: 10,
        fontWeight: 550,
    },
    resultSection: {
        padding: 25,
        margin: "auto",
    },
    postResult: {
        margin: "auto",
        // display:"none",
    },
    userResult: {
        margin: "auto",
        // display:"none",
    },
    universityResult: {
        margin: "auto",
        // display:"none",
    },

}));

export default function SearchResult() {
    const classes = useStyles();
    const [statePost, setStatePost] = useState('flex');
    const [statePeople, setStatePeople] = useState('none');
    const [stateUniversity, setStateUniversity] = useState('none');
    return (
        <div>
            <AcaNavbar className={classes.navBar}/>

            <Grid className={classes.pageContent}>

                <ButtonGroup color="" aria-label="secondary button group" className={classes.topOptions}>
                    <Button className={classes.optionUnit} onClick={() => {
                        setStatePost("flex");
                        setStatePeople("none");
                        setStateUniversity("none");
                    }}>Posts</Button>
                    <Button className={classes.optionUnit} onClick={() => {
                        setStatePost("none");
                        setStatePeople("flex");
                        setStateUniversity("none");
                    }}>People</Button>
                    <Button className={classes.optionUnit} onClick={() => {
                        setStatePost("none");
                        setStatePeople("none");
                        setStateUniversity("flex");
                    }}>University</Button>
                </ButtonGroup>
            </Grid>
            <Grid container spacing={3} className={classes.resultSection}>
                <Grid item xs={2}></Grid>
                <Grid container item xs={8}>
                    <Grid container item xs={12} spacing={3} className={classes.postResult} style={{display: statePost}}
                          justifyContent="center">
                        {/* <Grid container justifyContent="flex-start"> */}
                        <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                     authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                     publishedData={"Jul 7," + " 2021"}
                                     coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                        <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                     authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                     publishedData={"Jul 7," + " 2021"}
                                     coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                        <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                     authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                     publishedData={"Jul 7," + " 2021"}
                                     coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                        <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                     authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                     publishedData={"Jul 7," + " 2021"}
                                     coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                        <PostListing title={"Say Hello to Raspberry PI"} author={"Chathura Wanniarachchi"}
                                     authorPP={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}
                                     publishedData={"Jul 7," + " 2021"}
                                     coverImage={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_486803862_178266.jpg"}/>
                        {/* </Grid> */}
                    </Grid>

                    <Grid container spacing={3} className={classes.userResult} style={{display: statePeople}}
                          justifyContent="center">
                        <UserCard name={"Saman Rathnayake"}
                                  bio={"Computer Science Undergraduate at" + " University of Colombo School of Computing, LK"}
                                  ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                        <UserCard name={"Saman Rathnayake"}
                                  bio={"Computer Science Undergraduate at" + " University of Colombo School of Computing, LK"}
                                  ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                        <UserCard name={"Saman Rathnayake"}
                                  bio={"Computer Science Undergraduate at" + " University of Colombo School of Computing, LK"}
                                  ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                        <UserCard name={"Saman Rathnayake"}
                                  bio={"Computer Science Undergraduate at" + " University of Colombo School of Computing, LK"}
                                  ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                        <UserCard name={"Saman Rathnayake"}
                                  bio={"Computer Science Undergraduate at" + " University of Colombo School of Computing, LK"}
                                  ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>
                        <UserCard name={"Saman Rathnayake"}
                                  bio={"Computer Science Undergraduate at" + " University of Colombo School of Computing, LK"}
                                  ppLink={"https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"}/>

                    </Grid>

                    <Grid container spacing={3} className={classes.universityResult} style={{display: stateUniversity}}
                          justifyContent="center">
                        <UniversityListing name={"University of Colombo School of Computing"}
                                           description={"The University of Colombo School of Computing (UCSC) is an integral part of the University of Colombo, and has a history of fourteen years (established in September 2002) as the leading computing higher educational institute in Sri Lanka."}
                                           location={"Colombo, Sri Lanka"}
                                           coverImage={"https://www.yesman.lk/assets/img/institutes/ucsc_cover-1557334005.jpg"}/>
                        <UniversityListing name={"University of Colombo School of Computing"}
                                           description={"The University of Colombo School of Computing (UCSC) is an integral part of the University of Colombo, and has a history of fourteen years (established in September 2002) as the leading computing higher educational institute in Sri Lanka."}
                                           location={"Colombo, Sri Lanka"}
                                           coverImage={"https://www.yesman.lk/assets/img/institutes/ucsc_cover-1557334005.jpg"}/>
                        <UniversityListing name={"University of Colombo School of Computing"}
                                           description={"The University of Colombo School of Computing (UCSC) is an integral part of the University of Colombo, and has a history of fourteen years (established in September 2002) as the leading computing higher educational institute in Sri Lanka."}
                                           location={"Colombo, Sri Lanka"}
                                           coverImage={"https://www.yesman.lk/assets/img/institutes/ucsc_cover-1557334005.jpg"}/>
                        <UniversityListing name={"University of Colombo School of Computing"}
                                           description={"The University of Colombo School of Computing (UCSC) is an integral part of the University of Colombo, and has a history of fourteen years (established in September 2002) as the leading computing higher educational institute in Sri Lanka."}
                                           location={"Colombo, Sri Lanka"}
                                           coverImage={"https://www.yesman.lk/assets/img/institutes/ucsc_cover-1557334005.jpg"}/>
                        <UniversityListing name={"University of Colombo School of Computing"}
                                           description={"The University of Colombo School of Computing (UCSC) is an integral part of the University of Colombo, and has a history of fourteen years (established in September 2002) as the leading computing higher educational institute in Sri Lanka."}
                                           location={"Colombo, Sri Lanka"}
                                           coverImage={"https://www.yesman.lk/assets/img/institutes/ucsc_cover-1557334005.jpg"}/>

                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>

        </div>

    )
}