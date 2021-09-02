import React, {useEffect, useState} from 'react'
import {Chip, Link} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import APIURL from "../../API/APIURL";

export default function ArticleTags({tagList}) {


    const color = Array('primary', 'default', 'secondary');

    let [stateTagListRow, setStateTagListRow] = useState([]);
    // call api to get all tags
    // load tags
    const urlGetTags = APIURL("tag_operation/");
    useEffect(() => {
        axios.get(urlGetTags).then(function (response) {
            if (response.data)
                setStateTagListRow(response.data)
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    return (

        <CardContent>
            {/*TODO can create link based on tags myTag.id contains tagID*/}
            {stateTagListRow.map(myTag =>
                tagList.map(postTag =>
                    // compare tag ids and create tag list to show
                    myTag._id === postTag ? (
                        <Link href={"/tagLookup/" + postTag} style={{textDecoration: "none"}}>
                            <Chip variant="outlined" color={color[Math.floor(Math.random() * 3)]}
                                  label={myTag.verbose} style={{margin: 10, fontSize: 18, padding: 10}}/>
                        </Link>
                    ) : (
                        <span/>
                    )))
            }
        </CardContent>

    )
}
