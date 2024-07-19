import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import {Pie} from "react-chartjs-2" 

Chart.register(...registerables);

const InstructorChart = ({courses}) => {
    const [currChar, setCurrChart] = useState("students");

    const getRandomColor = (numColor) =>{
        let colors = [];
        for(let i=0; i<numColor; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors;
    }

    // create data for chart displaying studnet info
    const chartDataForStudents = {
        labels:courses.map((course) => course.courseName),
        datasets:[{
            data: courses.map((course) => course.totalStudentsEnrolled),
            backgroundColor : getRandomColor(courses.length)
        }]
    }

    // create data for chart displaying amount and revenue 
    const chartDataForIncome = {
        labels:courses.map((course) => course.courseName),
        datasets:[{
            data: courses.map((course) => course.totalRevenue),
            backgroundColor: getRandomColor(courses.length)
        }]
    }

    const options ={


    };
  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6 w-full">
    <p className="text-lg font-bold text-richblack-5">Visualize</p>
    <div className="space-x-4 font-semibold">
      {/* Button to switch to the "students" chart */}
      <button
        onClick={() => setCurrChart("students")}
        className={`rounded-sm p-1 px-3 transition-all duration-200 ${
          currChar === "students"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
        }`}
      >
        Students
      </button>
      {/* Button to switch to the "income" chart */}
      <button
        onClick={() => setCurrChart("income")}
        className={`rounded-sm p-1 px-3 transition-all duration-200 ${
          currChar === "income"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
        }`}
      >
        Income
      </button>

      </div>

      <div className="relative mx-auto aspect-square">
         <Pie data={currChar === "students" ? chartDataForStudents : chartDataForIncome} options={options} />
      </div>
    </div>
  )
}

export default InstructorChart
