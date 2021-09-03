import React from "react";
import MatChip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    chip: {
        marginInline: theme.spacing(0.5),
        marginBlock: theme.spacing(0.2),
        height: 16,
        fontSize: theme.typography.subtitle2,

        backgroundColor: 'transparent',
        color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
        border: `1px solid ${theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
    },
    chipCritical: {
        color: 'red',
        border: '1px solid red'
    },
    chipOpen: {
        color: 'orange',
        border: '1px solid orange'
    },
    chipInReview: {
        color: 'green',
        border: '1px solid green'
    },
    chipInfo: {
        color: theme.palette.primary.main,
        border: '1px solid '+theme.palette.primary.main
    }
}));

export default function Chip (label, type, key) {

    const classes = useStyles();
    if(type === undefined || type === null) return(<MatChip label={label} className={`${classes.chip}`} key={key}/>);
    else if(type === 'critical') return(<MatChip label={label} className={`${classes.chip} ${classes.chipCritical}`} key={key}/>);
    else if(type === 'info') return(<MatChip label={label} className={`${classes.chip} ${classes.chipInfo}`} key={key}/>);
    else if(type === 'open') return(<MatChip label={label} className={`${classes.chip} ${classes.chipOpen}`} key={key}/>);
    else if(type === 'in-review') return(<MatChip label={label} className={`${classes.chip} ${classes.chipInReview}`} key={key}/>);
    else return(<MatChip label={label} className={`${classes.chip}`} key={key}/>);
}