import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday','Tuesday'],
  datasets: [
    {
      label: 'Academic Users',
      data: [42, 57, 22, 49, 33, 45, 59],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y-axis-1',
      tension: 0.5
    },
    {
      label: 'General Users',
      data: [30, 39, 28, 52, 45, 33, 42],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.5)',
      yAxisID: 'y-axis-2',
      tension: 0.5
    },
  ],
};

const options = {
  maintainAspectRatio: false,

  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
};



function MultiAxisLine() {
    return (
      <div>
        <div className='header'>
          <h2 className='title'>Site Visits Last 7 Days</h2>
        </div>

        <div className="chart-container" style={{position:"relative",height:"40vh",width:"68vw"}}>
            <Line data={data} options={options} />
        </div>
      </div>
        
    )
}

export default MultiAxisLine;