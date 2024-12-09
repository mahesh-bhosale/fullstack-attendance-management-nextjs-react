"use client"
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
import { addMonths } from "date-fns";

// Accept selectedMonth as a prop
function MonthSelection({ selectedMonth }) {
    const today = new Date();
    const nextMonths = addMonths(today, 0);
    const [month, setMonth] = useState(nextMonths);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex gap-2 items-center text-slate-500"
          >
            <CalendarDays className="h-5 w-5" />
            {moment(month).format("MMM YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
              onMonthChange={(value) => {
                // Ensure selectedMonth is a function before calling it
                if (typeof selectedMonth === 'function') {
                  selectedMonth(value);
                }
                setMonth(value);
              }}
            className="flex flex-1 justify-center"
          />
        </PopoverContent>
      </Popover>
    </div>


  );
}

export default MonthSelection;
