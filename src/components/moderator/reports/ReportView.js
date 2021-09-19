import React, {useState} from 'react'
import {matchPath} from 'react-router-dom'
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    Checkbox,
    Dialog,
    Divider,
    FormControlLabel,
    Grid,
    Hidden,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Paper,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core'
import {ArrowBack, Close} from '@material-ui/icons'
import parse, { domToReact } from 'html-react-parser'
import {formatDistance} from 'date-fns'

import APIURL from '../../API/APIURL'
import ReportEntryItem from './ReportEntryItem'
import ReportSingleView from './ReportSingleView'
import relationImg from '../../../assets/svg/relation.svg'
import Snackbar from '../Snackbar'

import config from '../../../config/config'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'start',
        padding: theme.spacing(1),
    },
    root_row: {
        display: 'flex',
        flexDirection: 'row',
        height: 'fit-content',
        width: '100%'
    },
    m1: {
        margin: theme.spacing(1)
    },
    m2: {
        margin: theme.spacing(2)
    },
    articleView: {
        width: '80%',
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    },
}));

const PostView = (post) => {

    const options = {
        replace: ({ name, children }) => {
            if (!name) {
              return;
            };
        
            if (name === 'a') {
              return <span>{domToReact(children, options)}</span>;
            }
          }
    }

    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.articleView}>
            <ListItem dense alignItems="flex-start">
                <ListItemAvatar style={{alignContent: 'center'}}>
                    <Link href={config.URIs.user + post.author._id}>
                        <Avatar alt={post.author.name} src={post.author.profilePicture}/>
                    </Link>
                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <ListItemText disableTypography
                                  primary={
                                      <Typography variant="caption">
                                          <Link href={config.URIs.user + post.author._id}>
                                              <u>{post.author.name}</u>
                                          </Link>
                                          &nbsp;posted
                                          &nbsp;•&nbsp;{formatDistance(new Date(post.createdAt), new Date(), {addSuffix: true})}
                                      </Typography>
                                  }
                    />
                    <Card variant="outlined">
                        <Tooltip title="Click to open post" aria-label="add">
                            <CardActionArea href={config.URIs.post + post._id}>
                                <div style={{maxHeight: '20vh', width: '100%', overflow: 'hidden'}}>
                                    <img src={post.article.current.coverImage} style={{
                                        height: 'auto',
                                        maxWidth: '100%',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}/>
                                </div>
                                <div style={{padding: 20}}>
                                    {parse(post.article.current.content, options)}
                                </div>
                            </CardActionArea>
                        </Tooltip>
                    </Card>
                </div>
            </ListItem>
        </Paper>
    )
}

const CommentView = (comment) => {

    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.articleView}>
            <ListItem dense alignItems="flex-start">
                <ListItemAvatar style={{alignContent: 'center'}}>
                    <Link href={config.URIs.user + comment.commenter._id}>
                        <Avatar alt={comment.commenter.name} src={comment.commenter.profilePicture}/>
                    </Link>
                </ListItemAvatar>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <ListItemText disableTypography
                                  primary={
                                      <Typography variant="caption">
                                          <Link href={config.URIs.user + comment.commenter._id}>
                                              <u>{comment.commenter.name}</u>
                                          </Link>
                                          &nbsp;commented
                                          &nbsp;•&nbsp;{formatDistance(new Date(comment.createdAt), new Date(), {addSuffix: true})}
                                      </Typography>
                                  }
                    />
                    <Card variant="outlined">
                        <Tooltip title="Click to open post" aria-label="add">
                            <CardActionArea href={`/post/${comment._id}`}>
                                <div style={{padding: 20}}>
                                    <Typography variant="caption">
                                        {comment.content}
                                      </Typography>
                                </div>
                            </CardActionArea>
                        </Tooltip>
                    </Card>
                </div>
            </ListItem>
        </Paper>
    )
}

export default function (props) {

    if (!props.report || !props._id) {
        return (null);
    }
    ;

    const classes = useStyles();

    const report = props.report;

    const pathParams = matchPath();

    // selected report entry
    const [entryItemSelected, setEntryItemSelected] = useState(() => {
        let index = 0;
        if (props.selected) {
            let tempIndex = report.reports.findIndex(item => item._id === props.selected);
            if (tempIndex >= 0)
                index = tempIndex;
        }
        return index;
    });
    const isEntryItemSelected = (key) => {
        return (key === entryItemSelected)
    };

    const [fetching, setFetching] = useState(false);

    const [enableSubmit, setEnableSubmit] = useState(false);

    const setSubmit = () => {
        if(report.reports.filter(item => item.checked).length > 0) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }
    }

    // review, revert or close reports
    const reviewEntryReportItem = (index) => {
        //update report document
        let tempReport = report;
        if (tempReport.reports[index].status !== 'in review') {
            tempReport.counts.inReview += 1;
            tempReport.counts.open -= 1;
            tempReport.reports[index].status = 'in review';
        }
        tempReport.reports[index].checked = true;
        props.updateReport(tempReport);
        setSubmit();
    };
    const revertEntryReportItem = (index, comment) => {

        //update report document
        let tempReport = report;
        if (tempReport.reports[index].status !== 'open') {
            tempReport.counts.inReview -= 1;
            tempReport.counts.open += 1;
            tempReport.reports[index].status = 'open';
        }
        tempReport.reports[index].checked = false;
        tempReport.reports[index].comment = (comment) ? comment : tempReport.reports[index].comment;
        props.updateReport(tempReport);
        setSubmit();
    };
    const closeEntryReportItem = (index, comment) => {

        //update report document
        let tempReport = report;
        tempReport.counts.inReview -= 1;
        tempReport.counts.total -= 1;
        tempReport.reports[index].status = 'closed';
        tempReport.reports[index].comment = (comment) ? comment : tempReport.reports[index].comment;
        tempReport.reports[index].checked = false;
        props.updateReport(tempReport);
        setSubmit();
    };

    // submit form checked?
    const [reportStatus, setReportStatus] = useState(true);
    const [removeContent, setRemoveContent] = useState(false);

    // close view
    const handleViewClose = () => {
        props.close();
    }

    const [alert, setAlert] = useState({
        open: false,
        message: null,
        type: null
    })

    const submit = (event) => {
        event.preventDefault();
        setFetching(true);
        const data = {
            _ids: report.reports.filter(item => item.checked).map(item => item._id),
            status: (reportStatus) ? 'closed' : 'open',
            comment: document.getElementById(`${props._id}-form-comment`).value,
            content: {
                _id: props._id,
                type: report.type,
                remove: removeContent
            }
        };
        fetch(APIURL('reports'), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => {
            setFetching(false);
            if (response.ok) {
                // handleViewClose();
                if (data.status === 'open') {
                    report.reports.forEach((item, index) => {
                        if (item.checked) revertEntryReportItem(index, data.comment);
                    })
                } else {
                    report.reports.forEach((item, index) => {
                        if (item.checked) closeEntryReportItem(index, data.comment);
                    })
                }
            } else {
                throw new Error(`${response.status}, ${response.statusText}`);
            }
        }).catch(error => {
            setAlert({
                open: true,
                message: error.toString(),
                type: 'error'
            });
        })
    }

    return (
        <Dialog fullScreen open={props.open}>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container className={classes.root_row} style={{alignItems: 'center'}}>
                        <Grid item xs={4} className={classes.root_row} style={{justifyContent: 'flex-start'}}>
                            <Hidden mdUp>
                                <IconButton aria-label="back button"><ArrowBack/></IconButton>
                            </Hidden>
                        </Grid>
                        <Grid item xs={4} className={classes.root_row} style={{justifyContent: 'center'}}>
                            <Typography variant="h6">Reports</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.root_row} style={{justifyContent: 'flex-end'}}>
                            <IconButton aria-label="close button" onClick={handleViewClose}><Close/></IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5} style={{height: '90%'}}>
                    <List style={{overflow: 'auto', height: '77%'}}>
                        {report.reports.map((curReport, index) => <ReportEntryItem index={index} report={curReport}
                                                                                   key={curReport._id}
                                                                                   isEntryItemSelected={isEntryItemSelected}
                                                                                   setEntryItemSelected={setEntryItemSelected}
                                                                                   review={reviewEntryReportItem}
                                                                                   revert={revertEntryReportItem}
                        />)}
                    </List>
                    <Divider variant="fullWidth"/>
                    <form onSubmit={submit}>
                        <Grid container style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            paddingBlock: '3vh'
                        }}>
                            <Grid item xs={8}>
                                <Tooltip title="Add comment">
                                    <TextField id={`${props._id}-form-comment`} label="Comment" multiline minRows={5}
                                               maxRows={5} variant="outlined" style={{width: '90%', marginLeft: 10}}/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4}
                                  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Tooltip title="Close selected reports after update">
                                    <FormControlLabel checked={reportStatus}
                                                      onChange={() => setReportStatus(!reportStatus)}
                                                      control={<Checkbox id={`${props._id}-form-check`}
                                                                         color="primary"/>} label="Close reports"
                                                      disabled={fetching}
                                    />
                                </Tooltip>
                                <Tooltip title={"Remove " + report.type}>
                                    <FormControlLabel checked={removeContent}
                                                      onChange={() => setRemoveContent(!removeContent)}
                                                      control={<Checkbox id={`${props._id}-form-content`}
                                                                         color="primary"/>}
                                                      label={"Remove " + report.type}
                                                      disabled={fetching}
                                    />
                                </Tooltip>
                                <Tooltip title="Update selected reports">
                                    <span>
                                        <Button color="primary" variant="contained" type="submit"
                                                disabled={fetching || (enableSubmit === false)}>
                                                Update
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={7} style={{height: '90%'}}>
                    <Grid container
                          style={{display: 'flex', flexDirection: 'row', height: '90vh', justifyContent: 'left'}}>
                        <Grid item>
                            <Divider orientation="vertical" variant="middle" style={{marginInline: 20}}/>
                        </Grid>
                        <Grid item style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '92%',
                            height: '100%',
                            overflow: 'auto'
                        }}>
                            <div>
                                <ReportSingleView report={report.reports[entryItemSelected]}/>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                                width: '100%',
                                justifyContent: 'flex-end'
                            }}>
                                <img src={relationImg}
                                     style={{width: '10%', height: 'auto', alignSelf: 'flex-start', opacity: '0.2'}}/>
                                {(report.type === 'post') ? PostView(report._id.post) : CommentView(report._id.comment)}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={alert.open} message={alert.message} type={alert.type} close={() => {
                const tempAlert = alert;
                tempAlert.open = false;
                setAlert({...tempAlert});
            }}/>
        </Dialog>
    )
}