import React from 'react'
import MicrosoftLogin from 'react-microsoft-login'
//import MsButton from '../../assets/buttons/ms-button.png';
function MsAuth() {
    const authHandler = (err, data) => {
        console.log(err, data);
    }
    return (
        <div>
            <MicrosoftLogin 
            clientId={'090918fc-278a-4a3f-a03d-1caf00294249'} 
            authCallback={authHandler} 
            />
        </div>
    )
}

export default MsAuth
