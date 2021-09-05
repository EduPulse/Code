import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    media: {
        height: 140,
    },
});

function Post() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Best Practises in Coding
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        #programming #tutorials
                    </Typography>
                    <br></br>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Today’s Agile world moves fast. Customers are demanding more features.
                        Stakeholders want it done faster. And budgets seem to always be shrinking.
                        This can add up to a lot of pressure for the one’s who are actually building
                        the service or product. The ones who are actually sitting at the keyboard and
                        typing away. Those people are the programmers and developers who every day must
                        figure out how to construct the items required in a faster, cheaper and more efficient way.
                    </Typography>
                    <br></br>
                    <Typography variant="body2" color="textSecondary" component="p">
                        With the pressure that’s seen in a lot of Agile projects, it can be easy to get lax
                        when it comes to writing code. Even the best programmers may find themselves falling
                        prey to shortcuts when faced with looming deadlines. But in the end, those practices
                        only lead to poor quality, wasted effort, and, perhaps, worst of all, bad coding habits.
                        Instead of bad coding habits, set yourself up for success with these coding best practices.
                        Once you implement them, they’ll save you and your team time, resources, and headaches.
                        Here are fifteen of the best coding practices that you can start utilizing today for your
                        team and yourself.
                    </Typography>
                    <br></br>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Today’s Agile world moves fast. Customers are demanding more features.
                        Stakeholders want it done faster. And budgets seem to always be shrinking.
                        This can add up to a lot of pressure for the one’s who are actually building
                        the service or product. The ones who are actually sitting at the keyboard and
                        typing away. Those people are the programmers and developers who every day must
                        figure out how to construct the items required in a faster, cheaper and more efficient way.
                    </Typography>
                    <br></br>
                    <Typography variant="body2" color="textSecondary" component="p">
                        With the pressure that’s seen in a lot of Agile projects, it can be easy to get lax
                        when it comes to writing code. Even the best programmers may find themselves falling
                        prey to shortcuts when faced with looming deadlines. But in the end, those practices
                        only lead to poor quality, wasted effort, and, perhaps, worst of all, bad coding habits.
                        Instead of bad coding habits, set yourself up for success with these coding best practices.
                        Once you implement them, they’ll save you and your team time, resources, and headaches.
                        Here are fifteen of the best coding practices that you can start utilizing today for your
                        team and yourself.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Post