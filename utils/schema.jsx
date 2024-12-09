import { pgTable, serial, varchar, integer, boolean, date } from "drizzle-orm/pg-core";

export const GRADES = pgTable('grades', {
    id: serial('id',{ length: 11 }).primaryKey(),  // Use 'serial' for auto-increment
    grade: varchar('grade', { length: 10 }).notNull(),
});

export const STUDENTS = pgTable('students', {
    id: serial('id',{ length: 11 }).primaryKey(),  // Use 'serial' instead of autoincrement()
    name: varchar('name', { length: 20 }).notNull(),
    grade: varchar('grade', { length: 10 }).notNull(),
    address: varchar('address', { length: 50 }),
    contact: varchar('contact', { length: 11 }),
});


export const ATTENDANCE = pgTable('attendance', {
    id: serial('id',{ length: 11 }).primaryKey(),
    studentId: integer('studentId',{ length: 11 }).notNull(),
    present: boolean('present').default(false),
    day: integer('day',{ length: 11 }).notNull(), // Removed the length specification
    date: varchar('date',{ length: 20 }).notNull(), // Changed varchar to date
  });
  