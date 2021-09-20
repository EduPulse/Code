import React from 'react'
import {GoogleLogout} from 'react-google-login'
//import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {useHistory} from "react-router-dom";

const logURL = 'http://localhost:9000/savelog';
const logDetails = (id, role) => {
    axios.post(logURL, {id: id, role: role});
}

function GoogleAuth() {
    let history = useHistory();

    /* const responseGoogle = (res) => {
        axios({
            method: "post",
            url: `http://localhost:9000/auth/openid?openid_identifier=${res.tokenId}`,
            data: res.tokenId,
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then(function (response) {
                console.log(response);
                save(response.data);
                //handle success
                switch (response.data.role) {
                    case "admin":
                        history.push('/components/admin/AdminHome');
                        logDetails(response.data._id,response.data.role)
                        break;
                    case "moderator":
                        history.push('/moderator/dashboard');
                        logDetails(response.data._id,response.data.role)
                        break;
                    case "academic":
                        history.push('components/academicUser/AcademicUserRoute');
                        logDetails(response.data._id,response.data.role)
                        break;
                    case "general":
                        //history.push('/components/admin/AdminHome');
                        break;
                    default:
                        //history.push('/components/admin/AdminHome');
                        break;
                }
            })
            .catch(function (err) {
                //handle error
                console.log(err);
            });
    } */

    return (
        <div>
            {/* <GoogleLogin
                clientId="710127453375-59f35pb86rqrp1aok26cbaifsuv1h3nc.apps.googleusercontent.com"
                render={renderProps => (
                    
                )}
                theme="dark"
                icon="true"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            /> */}

        </div>
    )
}

function GoogleLogOut() {
    //let history = useHistory();
    const logout = (res) => {
        console.log("gya")
    }
    const onfail = (res) => {
        console.log("fail")
    }
    return (

        <GoogleLogout
            clientId="710127453375-59f35pb86rqrp1aok26cbaifsuv1h3nc.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
            onFailure={onfail}
            isSignedIn={false}
        >
        </GoogleLogout>

    )
}


export {GoogleAuth, GoogleLogOut};
