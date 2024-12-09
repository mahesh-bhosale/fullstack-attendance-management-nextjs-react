// import React ,{ useEffect, useState }from 'react'
// import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
// import moment from 'moment';
// function AttendanceGrid({attendanceList,selectedMonth}) {

//     const [rowData,setRowData] = useState();
//     const [colDefs,setColDefs] = useState([
//         {field:'studentId'},
//         {field:'name'},
//         {field:'1'},
//     ]);
//     useEffect(()=>{
//         const userList=getUniqueRecord();
//         console.log(userList);
//         setRowData(userList);

//     },[attendanceList])
   

//     // used to get Distict user list
//     const getUniqueRecord=() => {
//         const uniqueRecord=[];
//         const existindUser=new Set();
        
//         attendanceList?.forEach(record => {
//             if(!existindUser.has(record.studentId)) {
//                 existindUser.add(record.studentId);
//                 uniqueRecord.push(record);
//             }
//         });
//         return uniqueRecord;
//     }

//     const daysInMonth=(year, month) =>new Date(year, month+1,0).getDate();
//     const numberOfDays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
//     console.log(numberOfDays);
//   return (
//     <div>
//       <div
//   className="ag-theme-quartz" // applying the Data Grid theme
//   style={{ height: 500 }} // the Data Grid will fill the size of the parent container
//  >
//    <AgGridReact
//        rowData={rowData}
//        columnDefs={colDefs}
//    />
//  </div>
//     </div>
//   )
// }

// export default AttendanceGrid
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from 'moment';
import { date } from 'drizzle-orm/mysql-core';
import student from '../../students/page';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';


const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth }) {

  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: 'studentId',filter:true },
    { field: 'name',filter:true },
    
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  // Correctly format year and month
  const year = moment(selectedMonth).format('YYYY');  // Correct year format
  const month = moment(selectedMonth).format('M') - 1;  // Month (M) in 0-11 range
  const numberOfDays = daysInMonth(year, month);  // Get number of days in the month
  const daysArray = Array.from({length: numberOfDays},(_,i)=>i+1)
  

  useEffect(() => {
    if(attendanceList){

        const userList = getUniqueRecord(attendanceList);
        console.log(userList);
        setRowData(userList);
        
        daysArray.forEach((date)=>{
            setColDefs(prevData=>[...prevData,{
                field:date.toString(),width:50,editable:true
            }])
            userList.forEach(obj=>{
                obj[date]=isPresent(obj.studentId,date)
            })
        })
    }
  }, [attendanceList]);


  // Check if student is present on given day or not

  const isPresent =(studentId,day)=>{
    const result=attendanceList.find(item=>item.day==day&&item.studentId==studentId)
    return result?true:false
  }

// used to mark students attendance
  const onMarkAttendance=(day,studentId,presentStatus)=>{

    const date=moment(selectedMonth).format('MM/yyyy')
    if(presentStatus){
        const data={
            day:day,
            studentId:studentId,
            present:presentStatus,
            date:date
        }

        GlobalApi.MarkAttendance(data).then(resp=>{
            console.log(resp);
            toast("Student Id:" +studentId +"Marked as present")
        })
    }
    else{
      GlobalApi.MarkAbsent(studentId,day,date)
       .then(resp=>{
            toast("Student Id:" +studentId +"Marked as absent")
        })
    }

  }
  
  return (
    <div>
      <div
        className="ag-theme-quartz"
        style={{ height: 500 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field, e.data.studentId,e.newValue)}

          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
