import React, {useEffect, useState} from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import APIURL from '../../API/APIURL';


const PieChart = () => {
    const [Count, setCount] = useState({})
    const url = APIURL('charts/totalusers');
    useEffect(() => {
        axios.get(url)
            .then((res) => {
                console.log(res)
                setCount(res.data)
            })
    }, [url])

    return (
        <>
            
            <Pie data={
                {labels: ['Academic', 'General'],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [Count.academic, Count.general],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.4)',
                            'rgba(54, 162, 235, 0.4)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    },
                ]}
            } options= {
                {plugins: {
                    title: {
                        display: true,
                        text: 'Total Registered Users Breakdown'
                    }
                }}
            }
            />
        </>
    )
};

export default PieChart;