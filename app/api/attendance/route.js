import Attendance from "@/app/dashboard/attendance/page";
import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){

    const searchParams=req.nextUrl.searchParams;
    const grade=searchParams.get('grade');
    const month=searchParams.get('month');
    console.log("Grade:", grade, "Month:", month); 
    const result=await db.select({
        name:STUDENTS.name,
        present:ATTENDANCE.present,
        day:ATTENDANCE.day,
        date:ATTENDANCE.date,
        grade:STUDENTS.grade,
        studentId:STUDENTS.id,
        attendance:ATTENDANCE.id
    }).from(STUDENTS)
    .leftJoin(ATTENDANCE, and( eq(STUDENTS.id,ATTENDANCE.studentId),eq(ATTENDANCE.date,month)))
    .where(eq(STUDENTS.grade,grade))
    

    return NextResponse.json(result);
}

export async function POST(req, res){
    const data=await req.json();
    const result=await db.insert(ATTENDANCE)
    .values({
        studentId:data.studentId,
        present:data.present,
        day:data.day,
        date:data.date,
    });
    
    return NextResponse.json(result);
}

export async function DELETE(req){
    const searchParams=req.nextUrl.searchParams;
    const studentId=searchParams.get('studentId');
    const date=searchParams.get('date');
    const day=searchParams.get('day');

    const result= await db.delete(ATTENDANCE)
    .where(
        and(
            eq(ATTENDANCE.studentId,studentId)),
            eq(ATTENDANCE.day,day),
            eq(ATTENDANCE.date,date)

        )

    return NextResponse.json(result);
}

