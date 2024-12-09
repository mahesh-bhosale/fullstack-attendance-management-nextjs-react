import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React from 'react'
import  { useState, useEffect } from 'react';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';


function StatusList({attendanceList}) {
    const [totalStudent, setTotalStudent]=useState(0);
    const [presentPerc, setPresentPerc]=useState(0);

    // useEffect(()=>{
    //     if(attendanceList){
    //         const totalSt=getUniqueRecord(attendanceList);
    //         setTotalStudent(totalSt.length);

    //         const today=moment().format('D');
    //         const presentPerc=(attendanceList.length/(totalSt.length*Number(today))*100)
    //         setPresentPerc(presentPerc)
    //     }
    // },[attendanceList])

    useEffect(() => {
        if (attendanceList) {
            const totalSt = getUniqueRecord(attendanceList);
            setTotalStudent(totalSt.length);

            const today = moment().format('D'); // Day of the month
            const totalDays = Number(today); // Convert today to a number

            if (totalSt.length > 0 && totalDays > 0) {
                // Total attendance records divided by total possible attendance slots (students * days)
                const presentPercentage = (attendanceList.length / (totalSt.length * totalDays)) * 100;
                setPresentPerc(presentPercentage);
            } else {
                setPresentPerc(0); // Handle cases where there's no data
            }
        }
    }, [attendanceList]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap/>} title='Total Student' value={totalStudent} />
      <Card icon={<TrendingUp/>} title='Total % Present' value={presentPerc.toFixed(1)+'%'} />
      <Card icon={<TrendingDown/>} title='Total % Absent' value={(100-presentPerc).toFixed(1)+"%"} />
    </div>
  )
}

export default StatusList
