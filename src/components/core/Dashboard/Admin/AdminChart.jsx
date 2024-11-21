import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables)

export default function AdminChart({data}) {

    const [currChart, setCurrChart] = useState("students");
    const generateRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
          const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)})`;
          colors.push(color);
        }
        return colors;
      };
    
      const chartDataStudents = {
        labels: data.courses.map((course) => course.courseName),
        datasets: [
          {
            data: data.courses.map((course) => course.studentEnrolled.length),
            backgroundColor: generateRandomColors(data.courses.length),
          },
        ],
      };
    const studentVSinstructorChart = {
        labels: ["Instructors", "Students"],
        datasets: [
          {
            data: [data.instructor, data.students],
            backgroundColor: generateRandomColors(2),
          },
        ],
      };
      const categoryVSincomeChart = {
        labels: data.categoryData.map((category) => category.name),
        datasets: [
          {
            data: data.categoryData.map((category) => category.income*0.2),
            backgroundColor: generateRandomColors(data.categoryData.length),
          },
        ],
      };
      const courseVScategoryChart = {
        labels: data.categoryData.map((category) => category.name),
        datasets: [
          {
            data: data.cat.map((category) => category.length),
            backgroundColor: generateRandomColors(data.categoryData.length),
          },
        ],
      };

    
      // Options for the chart
      const options = {
        maintainAspectRatio: false,
      };
  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold max-sm:grid max-sm:grid-cols-2  ">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("studentVSinstructor")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "studentVSinstructor"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setCurrChart("categoryVSincome")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "categoryVSincome"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setCurrChart("categoryVScourse")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "categoryVScourse"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Courses
        </button>
      </div>
      <div className="relative mx-auto aspect-square  sm:h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents :
          currChart === "studentVSinstructor"? studentVSinstructorChart:
          currChart === "categoryVSincome"?categoryVSincomeChart:courseVScategoryChart}
          options={options}
        />
      </div>
    </div>
    );
}
