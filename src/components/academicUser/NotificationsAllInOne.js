import React from 'react'
import Posts from '../posts';
import Comments from './Comments'


function NotificationsAllInOne() {

    return (
        <div>
            <Comments/>
            <Posts/>
            <Comments/>
        </div>
    );
}

export default NotificationsAllInOne