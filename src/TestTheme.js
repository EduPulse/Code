import React, {useState} from 'react';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './themes';
import {GlobalStyles} from './global';

window.author = "Stephanie";

function TestTheme() {

    const [theme, setTheme] = useState('light');

    // The function that toggles between themes
    const toggleTheme = () => {
        // if the theme is not light, then set it to dark
        if (theme === 'light') {
            console.log(theme);
            setTheme('dark');

            // otherwise, it should be light
        } else {
            console.log(theme);
            setTheme('light');
        }
    }

    window.book = "New moon"
    return (

        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles/>
                {/* Pass the toggle functionality to the button */}
                <button onClick={toggleTheme}>Toggle theme</button>
                <h1>It's a light theme!</h1>
                <h2>Book is {window.book}</h2>
                <footer>
                </footer>
            </>
        </ThemeProvider>
    );
}

export default TestTheme;