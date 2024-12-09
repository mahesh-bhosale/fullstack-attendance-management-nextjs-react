"use client"
import React from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
// import { useEffect } from 'react/cjs/react.production.min'
import  { useState, useEffect } from 'react';

import StudentListTable from './_components/StudentListTable'

function student() {

  const [studentList,setStudentList]=useState([]);
  useEffect(()=>{
    GetAllStudents();
  },[])

  const GetAllStudents=()=>{
    GlobalApi.GetAllStudents().then(resp=>{
      setStudentList(resp.data);
    })
  }
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex 
        justify-between items-cent'>students
        </h2>
        <AddNewStudent refreshData={GetAllStudents}/>
        
        <StudentListTable studentList={studentList}
        refreshData={GetAllStudents}/>
    </div>
  )
}

export default student