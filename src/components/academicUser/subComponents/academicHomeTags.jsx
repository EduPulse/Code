import React, {useEffect, useState} from 'react'
import {Chip, Link} from '@material-ui/core';
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import APIURL from "../../API/APIURL";

function AcademicHomeTags({userID}) {

    // call api and get all tags then select random n tags
    let [stateTagList, setStateTagList] = useState([]);

    // load all tags
    useEffect(() => {
        axios.get(APIURL("tag_operation/")).then(function (responseAllTags) {
            let i = 0;
            let tags = [];

            axios.post(APIURL("tag_operation/get_home_page_tags", {user_id: userID})).then(function (response) {

                response.data.tags.map(selectedTag => {
                    responseAllTags.data.map(tagAll => {
                        if (selectedTag === tagAll._id) {
                            tags[i++] = {label: tagAll.verbose, value: tagAll._id};
                        }
                    })
                })
                setStateTagList(tags);
            });
        }).catch(function () {
            console.error("load failed");
        })
    }, []);

    const color = Array('primary', 'default', 'secondary');

    return (
        <div>
            {stateTagList.length > 0 ?
                stateTagList.map(myTag =>
                    <Link href={"/components/academicUser/tagLookup/" + myTag.value} style={{textDecoration: "none"}}>
                        <Chip variant="filled" color={color[Math.floor(Math.random() * 3)]} label={myTag.label}
                              style={{margin: 10, fontSize: 15, backgroundColor: "rgba(255,255,255,0.68)"}}/>
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