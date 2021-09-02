import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';



export const Deletead = (props) => {
    function deleteAd(id,client){
        axios.delete('http://localhost:9000/ad/delete',{data:{adID:id,Client:client}})
        .then(res => console.log(res))
    }    

    return (
        <div style={{display:"table-cell"}}>
           <Tooltip title="Delete">
                <IconButton aria-label="delete" >
                    <DeleteIcon onClick={()=>{deleteAd(props.id,props.client)}}/>
                </IconButton>
            </Tooltip> 
        </div>
    )
}

