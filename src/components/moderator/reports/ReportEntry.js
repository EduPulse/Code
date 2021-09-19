import React from 'react'
import {Link} from "react-router-dom";
import {Avatar, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {formatDistance} from "date-fns"

import config from '../../../config/config'

import Chip from './Chip'

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        margin: theme.spacing(.5),
        width: '100%'
    },
    root: {
        display: "flex",
        flexDirection: "row",
        padding: theme.spacing(1),
        width: '100%'
    },
    left: {
        display: "flex",
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    right: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        textAlign: "left",
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    inline: {
        display: "inline",
    },
    body: {
        textAlign: "justify"
    },
    chipArray: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        listStyle: "none",
        justifyContent: "right",
        padding: theme.spacing(0.2)

    },
}));

const capitalize = (text) => {
    return text.split(' ').reduce((a, b) => {
        return a + ' ' + b.charAt(0).toUpperCase() + b.slice(1)
    }, '').trim();
}

const strip = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent.replace(/([A-Z])/g, ' $1').trim() || "";
}

export default function ReportEntry(props) {

    const classes = useStyles();

    const report = props.report;

    const data = {
        id: props._id,
        name: (report.type === 'post') ? report._id.post.author.name : report._id.comment.commenter.name,
        userId: (report.type === 'post') ? report._id.post.author._id : report._id.comment.commenter._id,
        avatar: (report.type === 'post') ? report._id.post.author.profilePicture : report._id.comment.commenter.profilePicture,
        role: (report.type === 'post') ? report._id.post.author.role : report._id.comment.commenter.role,
        title: (report.type === 'post') ? report._id.post.article.current.title : null,
        body: (report.type === 'post') ? strip(report._id.post.article.current.content) : report._id.comment.content,
        type: report.type,
        time: (report.type === 'post') ? report._id.post.createdAt : report._id.comment.createdAt,
        categories: report.categories,
        counts: report.counts
    }

    const selectThisReport = () => {
        props.select(data.id);
    };

    return (
        <React.Fragment>
            <ListItem button divider selected={props.isSelected(data.id)} alignItems="flex-start" style={{width: '100%'}}
                      onClick={selectThisReport}>
                <ListItemAvatar style={{alignContent: 'center'}}>
                    <Link to={config.URIs.user + data.userId}>
                        <Avatar alt={data.name} src={data.avatar}/>
                    </Link>
                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <ListItemText disableTypography
                                  primary={
                                      <Typography variant="caption">
                                          <Link to={config.URIs.user + data.userId} underline="hover">
                                              {data.name}
                                          </Link>
                                          {(data.type === 'post') ? ' posted' : ' commented'}
                                          &nbsp;•&nbsp;{formatDistance(new Date(data.time), new Date(), {addSuffix: true})}
                                      </Typography>
                                  }
                                  secondary={
                                      <Typography variant="subtitle2" className={classes.body} color="textPrimary">
                                          <b>{data.title}</b>
                                          {(data.type === 'post') ? ` - ${data.body.slice(0, 200)} ...` : `${data.body.slice(0, 200)} ...`}
                                      </Typography>
                                  }
                    />
                    <div component='ul' className={classes.chipArray}>
                        {Chip(capitalize(data.type), 'info', 'chip-type')}
                        {(data.counts.open >= 5) ? Chip(capitalize('Open: ' + data.counts.open), 'critical', 'chip-open') : Chip(capitalize('Open: ' + data.counts.open), 'open', 'chip-open')}
                        {Chip(capitalize('In Review: ' + data.counts.inReview), 'in-review', 'chip-review')}
                        {
                            data.categories.map((category, index) => {
                                return (Chip(capitalize(category), null, 'chip-cat-' + index));
                            })
                        }
                    </div>
                </div>
            </ListItem>
        </React.Fragment>
    );
}