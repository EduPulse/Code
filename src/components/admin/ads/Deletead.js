import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import swal from 'sweetalert';


export const Deletead = (props) => {
    function deleteAd(id,client){

        swal({
            title: "Confirm?",
            text: "Ad will be removed permanently",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                axios.delete('http://localhost:9000/ad/delete',{data:{adID:id,Client:client}})
                .then(function (res,err) {
                    swal("Ad removed successfully", "", "success")
                  })
                  .catch(function (err) {
                    //handle error
                    console.log(err);
                  });

            } else {
              swal("Your imaginary file is safe!");
            }
          });

        
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

