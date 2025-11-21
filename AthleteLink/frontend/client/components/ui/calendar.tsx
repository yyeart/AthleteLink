// components/Calendar.tsx
import * as React from "react";
import { DayPicker, Matcher } from "react-day-picker";
import "react-day-picker/dist/style.css"; // обязательно подключи стили

export interface CalendarProps {
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
  mode?: "single" | "multiple" | "range";
  defaultMonth?: Date;
  // Добавляем новые пропсы
  disabled?: Matcher | Matcher[];
  initialFocus?: boolean;
}

export function Calendar({
  selected,
  onSelect,
  mode = "single",
  defaultMonth,
  disabled,
  initialFocus = false, // по умолчанию false, если не передан
}: CalendarProps) {
  return (
    <div className="p-4 rounded-md border bg-white shadow-md">
      <DayPicker
        mode={mode}
        selected={selected as any} // Временно отключаем проверку типов
        onSelect={onSelect as any} // Временно отключаем проверку типов
        defaultMonth={defaultMonth}
        disabled={disabled} // передаём disabled
        initialFocus={initialFocus} // передаём initialFocus
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