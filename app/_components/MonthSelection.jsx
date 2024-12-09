"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";

function MonthSelection({ selectedMonth }) {
  const today = new Date(); // Get today's date
  const [month, setMonth] = useState(today); // Initial state is the current month

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex gap-2 items-center text-slate-500"
          >
            <CalendarDays className="h-5 w-5" />
            {moment(month).format("MMM YYYY")} {/* Display selected month */}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onDayClick={(value) => {
              const selectedMonthDate = new Date(
                value.getFullYear(),
                value.getMonth(), // Only use the month and year
                1
              );
              setMonth(selectedMonthDate);
              if (typeof selectedMonth === "function") {
                selectedMonth(selectedMonthDate);
              }
            }}
            onMonthChange={(newMonth) => {
              setMonth(newMonth);
              if (typeof selectedMonth === "function") {
                selectedMonth(newMonth);
              }
            }}
            disabled={(date) => true} // Disable all specific dates
            className="flex flex-1 justify-center "
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MonthSelection;
