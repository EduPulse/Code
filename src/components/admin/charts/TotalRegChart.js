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
        <React.Fragment>
            <div className='header'>
                <h2 className='title'>Total Registered Users Breakdown</h2>
            </div>
            <Pie data={
                {
                    labels: ['Academic', 'General'],
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
                    ]
                }
            }/>
        </React.Fragment>
    )
};

export default PieChart;