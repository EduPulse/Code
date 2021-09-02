import React from 'react'
import {GoogleLogin,GoogleLogout} from 'react-google-login'
import googleNormal from '../../assets/buttons/btn_google_signin_dark_normal_web.png';
//import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { save } from '../auth/auth';
/* const useStyles = makeStyles((theme)=>({
    
})) */
function GoogleAuth() {
    //const classes = useStyles;

    const responseGoogle = (response)=>{
        console.log(response);
        console.log(response.tokenId);
     //   http://localhost:9000/auth/openid?openid_identifier=<tokenID>

        axios({
            method: "post",
            url: `http://localhost:9000/auth/openid?openid_identifier=${response.tokenId}`,
            data: response.tokenId,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
    }

    return (
        <div>
            <GoogleLogin
                clientId="710127453375-59f35pb86rqrp1aok26cbaifsuv1h3nc.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick} 
                    style={{padding:'0px 0px',
                    border:'none',
                    backgroundColor:'#DFDAE8'}}>
                        <img src={googleNormal} alt="google button" style={{width:'218px'}}/>
                    </button>
                  )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleAuth;
