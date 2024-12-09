"use client"
import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import MonthSelection from '@/app/_components/MonthSelection';
import GradeSelect from '@/app/_components/GradeSelect';
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button';

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState('FE');

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const onSearchHandler = async () => {
    setLoading(true);

    try {
      // Extract year and month from selectedMonth
      const year = moment(selectedMonth).format('YYYY');
      const month = moment(selectedMonth).format('M') - 1;
      const numberOfDays = daysInMonth(year, month);

      const response = await GlobalApi.GetStudentAttendanceList(selectedGrade, moment(selectedMonth).format('MM/YYYY'));

      if (response.status === 200) {
        const dataWithAttendance = response.data.map(student => {
          const attendancePercentage = numberOfDays
            ? ((student.presentDays / numberOfDays) * 100).toFixed(2)
            : "0.00";
          const isDefaulter = attendancePercentage < 75;
          return {
            ...student,
            attendancePercentage,
            isDefaulter: isDefaulter ? 'Yes' : 'No'
          };
        });
        setAttendanceData(dataWithAttendance);
      } else {
        console.error('Error fetching attendance data:', response.statusText);
        setAttendanceData([]);
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Attendance Report - Grade ${selectedGrade} for ${selectedMonth}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['ID', 'Name', 'Grade', 'Present Days', 'Attendance Percentage (%)', 'Defaulter']],
      body: attendanceData.map((student) => [
        student.id,
        student.name,
        student.grade,
        student.presentDays,
        `${student.attendancePercentage}%`,
        student.isDefaulter
      ]),
    });

    doc.save(`attendance_report_grade_${selectedGrade}_${selectedMonth}.pdf`);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>

      <div className="flex gap-4 p-5 my-5 border rounded-lg shadow-sm">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button onClick={()=>onSearchHandler()}>Search</Button>
        
      </div>

      {loading && <p className="text-center text-lg">Loading attendance data...</p>}

      {!loading && attendanceData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border-collapse border border-gray-300 shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Present Days</th>
                <th className="border px-4 py-2">Attendance Percentage (%)</th>
                <th className="border px-4 py-2">Defaulter</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student) => (
                <tr key={student.id} className="text-center">
                  <td className="border px-4 py-2">{student.id}</td>
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.grade}</td>
                  <td className="border px-4 py-2">{student.presentDays}</td>
                  <td className="border px-4 py-2">{student.attendancePercentage}%</td>
                  <td className="border px-4 py-2">{student.isDefaulter}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={downloadPDF}
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      )}

      {!loading && attendanceData.length === 0 && (
        <p className="text-center text-lg">No attendance data available for this grade and month.</p>
      )}
    </div>
  );
}
