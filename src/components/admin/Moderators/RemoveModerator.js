import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import swal from 'sweetalert';
import APIURL from '../../API/APIURL'

const handleRemove = (ID) => {
    axios.post(APIURL('Moderators/delete'), {data: ID})
        .then(function (res, err) {
            swal("Moderator removed successfully", "", "success")

        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });
}

const RemoveModerator = (props) => {
    return (
        <div>
            <Tooltip title="Delete">
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => {
                        handleRemove(props.id)
                    }}/>

                </IconButton>
            </Tooltip>
        </div>
    )
}

export default RemoveModerator
