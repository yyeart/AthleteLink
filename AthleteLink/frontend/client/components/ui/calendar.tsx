// components/Calendar.tsx
import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // обязательно подключи стили

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  mode?: "single" | "multiple" | "range";
  defaultMonth?: Date;
}

export function Calendar({
  selected,
  onSelect,
  mode = "single",
  defaultMonth,
}: CalendarProps) {
  return (
    <div className="p-4 rounded-md border bg-white shadow-md">
      <DayPicker
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        defaultMonth={defaultMonth}
        showOutsideDays
        weekStartsOn={0} // воскресенье
        styles={{
          caption: {
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          },
          nav: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          },
          table: { width: "100%", borderCollapse: "collapse" },
          head_row: { display: "flex", justifyContent: "space-between" },
          head_cell: {
            width: "2rem",
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#666",
          },
          row: { display: "flex", justifyContent: "space-between" },
          cell: {
            width: "2rem",
            height: "2rem",
            textAlign: "center",
            lineHeight: "2rem",
          },
        }}
      />
    </div>
  );
}
