import React,{useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
//import { number } from 'yup';

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const d = new Date();
var x = d.getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const daysArray=[];
for(var i=7;i>=1;i--){
    if(x-i>=0){
        daysArray.push(days[x-i])
    }
    else{
        daysArray.push(days[7+(x-i)])
    }
}

const VerticalBar = () => {
    const [RegData, setRegData] = useState([]);
    const DataArray = [0,0,0,0,0,0,0]
    const url = 'http://localhost:9000/charts/userRegistrations';

    useEffect(() => {
        axios.get(url)
        .then((res)=>{
    //        console.log(res.data)
            setRegData(res.data)
        })
    }, [url])

    RegData.map(x=>
        DataArray[7-Number((formatDistanceToNow(new Date(x._id))).split(' ')[0])]=x.count
    )
   // console.log(DataArray) 

    return (
        <>
            <div className='header'>
                <h2 className='title'>New User Registrations in Last 7 Days</h2>
            </div>
            <Bar data={
                {
                    labels: daysArray,
                    datasets: [
                        {
                            label: '# of Registrations',
                            data: DataArray,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }
            } options={options}/>
        </>
    )
};

export default VerticalBar;