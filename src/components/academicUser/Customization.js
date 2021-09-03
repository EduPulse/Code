import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
import {  makeStyles, Card, CardHeader  } from '@material-ui/core';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../themes';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/

const useLightStyle = makeStyles((theme) => ({
    cardStyle: {
        marginBottom: '30px',
        borderRadius: '10px',
        backgroundColor: '#DFDAE8',
        color: '#000000'
    },
}));

const useDarkStyle = makeStyles((theme) => ({
    cardStyle: {
        marginBottom: '30px',
        borderRadius: '10px',
        backgroundColor: '#000000',
        color: '#FFFFFF'
    },
}));

function Customization() {

    const [theme, setTheme] = useState('light');
    const classes = useLightStyle();
    // window.theme = 'light';

    const handleTheme = (event) => {
        window.theme = event.target.value;
        setTheme(event.target.value);

        // if (theme === "light") {
        //     classes = useLightStyle();
        // }
        // else {
        //     classes = useDarkStyle();
        // }
    }

    // const onLightTheme = () => {
    //     setTheme('light');
    //     window.theme = theme;
    // }
    // const onDarkTheme = () => {
    //     window.theme = "dark";
    //     window.theme = theme;
    // }

    return (
        <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
            <div>
                <Card >
                    <CardHeader title="Customized Theme" />
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="theme" name="theme" value={theme} onChange={handleTheme} >
                            <FormControlLabel value="light" control={<Radio />} label="Light theme" />
                            <FormControlLabel value="dark" control={<Radio />} label="Dark theme" />
                        </RadioGroup>
                    </FormControl>
                </Card>
                <h2>theme: { theme }</h2>
                <h2>window.theme: { window.theme }</h2>
                
            </div>
        </ThemeProvider>
    );
}

export default Customization