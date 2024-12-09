import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const grade = url.searchParams.get("grade");
    const month = url.searchParams.get("month");

    console.log("Grade:", grade, "Month:", month);

    const result = await db
      .select({
        name: STUDENTS.name,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendance: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(
        ATTENDANCE,
        and(eq(STUDENTS.id, ATTENDANCE.studentId), eq(ATTENDANCE.date, month))
      )
      .where(eq(STUDENTS.grade, grade));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const result = await db.insert(ATTENDANCE).values({
      studentId: data.studentId,
      present: data.present,
      day: data.day,
      date: data.date,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");
    const date = url.searchParams.get("date");
    const day = url.searchParams.get("day");

    const result = await db.delete(ATTENDANCE).where(
      and(
        eq(ATTENDANCE.studentId, studentId),
        eq(ATTENDANCE.day, day),
        eq(ATTENDANCE.date, date)
      )
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete attendance" }, { status: 400 });
  }
}
