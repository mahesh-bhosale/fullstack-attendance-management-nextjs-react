import { db } from "@/utils"; 
import { GRADES } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
    const result = await db.select().from(GRADES).limit(100).orderBy(GRADES.id);
    console.log('Database Result:', result); // Debugging line
    return NextResponse.json(result);
}
