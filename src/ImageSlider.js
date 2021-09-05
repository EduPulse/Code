import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const images = [
    {url: "./assets/bg.jpg"},
    {url: "./assets/2.jpg"},
    {url: "./assets/3.jpg"},

];


const Slideshow = () => {
    return (
        <div>
            <AwesomeSlider>
                <div data-src="/1.jpg"/>
                <div data-src="/2.jpg"/>
                <div data-src="/3.jpg"/>
            </AwesomeSlider>
        </div>
    )
}

export default Slideshow;