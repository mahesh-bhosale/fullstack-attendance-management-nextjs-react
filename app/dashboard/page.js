"use client";

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import MonthSelection from '../_components/MonthSelection';
import GradeSelect from '../_components/GradeSelect';
import GlobalApi from '../_services/GlobalApi';
import moment from 'moment';
import StatusList from './_components/StatusList';
import BarChartComponent from './_components/BarChartComponent';
import PieChartComponent from './_components/PieChartComponent';

function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState('FE');
  const [attendanceList, setAttendanceList] = useState([]);
  const [totalPresentData, setTotalPresentData] = useState([]);

  useEffect(() => {
    GetTotalPresentCountByDay();
    getStudentAttendance();
  }, [selectedMonth, selectedGrade]); // Fix: Removed the OR condition

  // Get the student attendance for given month and grade
  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(selectedGrade, moment(selectedMonth).format('MM/yyyy'))
      .then(resp => {
        setAttendanceList(resp.data);
      });
  };

  const GetTotalPresentCountByDay = () => {
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'), selectedGrade)
      .then(resp => {
        setTotalPresentData(resp.data);
      });
  };

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
      </div>

      <StatusList attendanceList={attendanceList} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='md:col-span-2'>
          <BarChartComponent attendanceList={attendanceList} totalPresentData={totalPresentData} />
        </div>
        <div>
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
