import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

function PieChartComponent({attendanceList}) {

    const data01 = [
        {
          "name": "Group A",
          "value": 400
        },
        {
          "name": "Group B",
          "value": 300
        }
      ];
    const [data,setData]=useState();
    useEffect(() => {
        if (attendanceList) {
            const totalSt = getUniqueRecord(attendanceList);
            
            const today = moment().format('D'); // Day of the month
            const totalDays = Number(today); // Convert today to a number

            if (totalSt.length > 0 && totalDays > 0) {
                // Total attendance records divided by total possible attendance slots (students * days)
                const presentPercentage = (attendanceList.length / (totalSt.length * totalDays)) * 100;
                setData([
                    {
                        name:'Total Present',
                        value:Number(presentPercentage.toFixed(1)),
                        fill:'#8884d8'
                    },
                    {
                        name:'Total Absent',
                        value:(100-Number(presentPercentage.toFixed(1))),
                        fill:'#82ca9d'
                    }
                ])
               
            } 
        }
    }, [attendanceList]);

    const renderCustomLabel = ({ name, value }) => {
        return ` ${value}%`;
    };
    
  return (
    <div className="border p-5 rounded-lg">
        <h2 className="font-bold p-5 text-lg">Monthly Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
      <PieChart width={730} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
        //   label
        label={renderCustomLabel} 
        />
      </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
