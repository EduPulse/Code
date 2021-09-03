import React, { useState } from 'react'
import {Link} from "react-router-dom";
import {Card, CardActionArea, makeStyles, Typography, Avatar, Backdrop} from "@material-ui/core";
import {formatDistance} from "date-fns"

import ReportView from './ReportView';
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
        padding: theme.spacing(1)
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const capitalize = (text) => {
    return text.split(' ').reduce((a, b) => {
        return a + ' ' + b.charAt(0).toUpperCase() + b.slice(1)
    }, '').trim();
}

export default function ReportCard(props) {

    const classes = useStyles();

    const report = props.report;
    const [open, setOpen] = useState(false);

    const data = {
        id: (report.type === 'post') ? report._id.post._id : report._id.comment._id,
        name: (report.type === 'post') ? report._id.post.author.name : report._id.comment.author.name,
        userId: (report.type === 'post') ? report._id.post.author._id : report._id.comment.author._id,
        avatar: (report.type === 'post') ? report._id.post.author.profilePicture : report._id.comment.author.profilePicture,
        role: (report.type === 'post') ? report._id.post.author.role : report._id.comment.author.role,
        title: "I'm Bond. You are???",
        body: `Rem aperiam cumque velit doloremque optio sunt. Dolores mollitia rerum nostrum vero ipsum. Eligendi sunt totam ab rerum iste qui.
        Sit neque aut accusantium atque eum molestiae et. At quia hic commodi ut suscipit atque qui nisi. Laudantium et perferendis et fuga necessitatibus quod.
        Illo facere aspernatur totam est. Quas et tempora dolores. Velit et distinctio maxime commodi voluptatibus ut ut. Quo est qui quia veniam ut voluptates mollitia et. Reprehenderit non necessitatibus nam aut ut. Rem alias neque qui molestias quaerat.
        Quam dolorum aut et quae quibusdam. Ea tempore nihil magnam doloribus facere. Ipsa dolores maiores consequatur eaque saepe omnis. Voluptatem recusandae autem ut aspernatur hic repudiandae omnis.`,
        type: report.type,
        time: 1629400743893,
        categories: report.categories,
        counts: report.counts
    }

    const handleClose = () => {
        setOpen(false);
    };
    const openPopOver = () => {
        setOpen(true);
    };

    return(
        <Card className={classes.card}>
            <CardActionArea className={classes.root} onClick={openPopOver}>
                <div className={classes.left}>
                    <Link to={`/users/${data.userId}`}>
                        <Avatar alt={data.name} src={data.avatar}/>
                    </Link>
                </div>
                <div className={classes.right}>
                    <Typography variant="caption">
                        <Link to={`/users/${data.userId}`}>
                            <u>{data.name}</u>
                        </Link>
                        {(data.type === 'post') ? ' posted' : ' commented'}
                        &nbsp;•&nbsp;{formatDistance(new Date(data.time), new Date(), {addSuffix: true})}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.body}>
                        <b>{data.title}</b>
                        {` - ${data.body.slice(0, 200)}${(data.body.length > 200 ? '...' : '')}`}
                    </Typography>
                    <div component='ul' className={classes.chipArray}>
                        {Chip(capitalize(data.type), 'info')}
                        {(data.counts.open >= 5) ? Chip(capitalize('Open: ' + data.counts.open), 'critical') : Chip(capitalize('Open: ' + data.counts.open), 'open')}
                        {Chip(capitalize('In Review: ' + data.counts.inReview), 'in-review')}
                        {
                            data.categories.map((category) => {
                                return (Chip(capitalize(category)));
                            })
                        }
                    </div>
                </div>
            </CardActionArea>
            <Backdrop className={classes.backdrop} open={open}>
                {(open) ? <ReportView reports={report.reports} close={handleClose}/> : null}
            </Backdrop>
        </Card>
    );
}