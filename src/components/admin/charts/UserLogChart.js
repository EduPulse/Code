import React,{useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import APIURL from '../../API/APIURL';

const options = {
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Site Visits Last 7 Days'
        }
    },
    interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
          }
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

function MultiAxisLine() {
    const academicArray=[0,0,0,0,0,0,0];
    const generalArray=[0,0,0,0,0,0,0];
    const [Academic, setAcademic] = useState([]);
    const [General, setGeneral] = useState([]);

    const url = APIURL('charts/userLogins');

    useEffect(() => {
        axios.get(url)
        .then((res)=>{
            console.log(res.data)
          //  setRegData(res.data)
          setAcademic(res.data.academic)
          setGeneral(res.data.general)
        })
    }, [url])

    Academic.map(x=>
        academicArray[7-Number((formatDistanceToNow(new Date(x._id))).split(' ')[0])]=x.count
    )

    General.map(x=>
        generalArray[7-Number((formatDistanceToNow(new Date(x._id))).split(' ')[0])]=x.count
    )

    console.log(academicArray)
    console.log(generalArray)

    return (
        <>
            <div className="chart-container" style={{position:'relative',height:'40vh',width:'92vw'}}>
                <Line data={
                    {
                        labels: daysArray,
                        datasets: [
                            {
                                label: 'Academic Users',
                                data: academicArray,
                                fill: false,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.5)',
                                yAxisID: 'y',
                                tension: 0.5
                            },
                            {
                                label: 'General Users',
                                data: generalArray,
                                fill: false,
                                backgroundColor: 'rgb(54, 162, 235)',
                                borderColor: 'rgba(54, 162, 235, 0.5)',
                                yAxisID: 'y',
                                tension: 0.5
                            },
                        ],
                    }
                } options={options}/>
            </div>
        </>

    )
}

export default MultiAxisLine;