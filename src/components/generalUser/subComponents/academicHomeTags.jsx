import React, {useEffect, useState} from 'react'
import {Chip, Link} from '@material-ui/core';
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import APIURL from "../../API/APIURL";

function AcademicHomeTags() {

    // call api and get all tags then select random n tags
    let [stateTagList, setStateTagList] = useState([]);
    // load tags
    const urlGetTags = APIURL("tag_operation/");
    useEffect(() => {
        axios.get(urlGetTags).then(function (response) {
            let i = 0;
            let tags = [];
            response.data.map(data => {
                if (Math.floor(Math.random() * Math.ceil(response.data.length / 10)) !== 0)
                    tags[i++] = {label: data.verbose, value: data._id};
            })
            setStateTagList(tags);
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    const color = Array('primary', 'default', 'secondary');

    return (
        <div>
            {stateTagList.length > 0 ?
                stateTagList.map(myTag =>
                    <Link href={"/components/generalUser/tagLookup/" + myTag.value} style={{textDecoration: "none"}}>
                        <Chip variant="filled" color={color[Math.floor(Math.random() * 3)]} label={myTag.label}
                              style={{margin: 10, fontSize: 15}}/>
                    </Link>
                )
                :
                (
                    <div>
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6, marginTop: 10}}/>
                        <Skeleton animation="wave" height={10} width="60%" style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="60%" style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="60%" style={{marginBottom: 6}}/>
                    </div>
                )

            }
        </div>
    )
}

export default AcademicHomeTags