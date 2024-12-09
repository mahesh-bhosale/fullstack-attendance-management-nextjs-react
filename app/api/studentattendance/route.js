import { db } from "@/utils"; 
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq, and, inArray } from "drizzle-orm"; // Ensure inArray is imported
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm/sql"; // Import SQL raw expression if needed

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const grade = searchParams.get('grade');
    const month = searchParams.get('month'); // Expect month in "MM/YYYY" format

    if (!month || !/^(\d{2})\/(\d{4})$/.test(month)) {
        return NextResponse.json({ error: 'Invalid month format' }, { status: 400 });
    }

    try {
        // Fetch students of the given grade
        const students = await db
            .select()
            .from(STUDENTS)
            .where(eq(STUDENTS.grade, grade));

        if (students.length === 0) {
            return NextResponse.json([]); // No students in the given grade
        }

        const studentIds = students.map((student) => student.id);

        // Fetch attendance data with COUNT to calculate the number of present days
        const attendanceCounts = await db
            .select({
                studentId: ATTENDANCE.studentId,
                presentDays: sql`COUNT(*)`.as("presentDays"), // Count all rows where present is true
            })
            .from(ATTENDANCE)
            .where(
                and(
                    sql`ATTENDANCE.date LIKE ${month + '%'}`,   // Match month in "MM/YYYY" format
                    eq(ATTENDANCE.present, true),               // Only count records where the student was present
                    inArray(ATTENDANCE.studentId, studentIds)   // Only include students of the selected grade
                )
            )
            .groupBy(ATTENDANCE.studentId); // Group by studentId to get counts for each student

        // Merge the student and attendance data
        const result = students.map((student) => {
            const attendanceRecord = attendanceCounts.find((record) => record.studentId === student.id);
            const totalPresentDays = attendanceRecord ? attendanceRecord.presentDays : 0;
            return {
                id: student.id,
                name: student.name,
                grade: student.grade,
                presentDays: totalPresentDays, // Total present days from the count
            };
        });

        return NextResponse.json(result); // Send the final result as JSON response
    } catch (error) {
        console.error('Error fetching data:', error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
