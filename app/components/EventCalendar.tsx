import type { Nullable } from "primereact/ts-helpers";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import EventDialog from "~/utils/dialogs/EventDialog";

export type Event = { title: string; time: string };
export type EventsMap = { [date: string]: Event[] };

export default function EventCalendar() {
    const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
    // Példa események - dátum: események párok

    const events: EventsMap = {
        "2025-10-10": [
            { title: "Csapatmegbeszélés", time: "10:00" },
            { title: "Projekt deadline", time: "17:00" },
        ],
        "2025-10-15": [{ title: "Prezentáció", time: "14:00" }],
        "2025-10-20": [
            { title: "Képzés", time: "09:00" },
            { title: "Ebéd üzleti partnerrel", time: "12:30" },
            { title: "Workshop", time: "15:00" },
        ],
        "2025-10-25": [{ title: "Havi értékelés", time: "11:00" }],
    };
    const [date, setDate] = useState<Nullable<Date>>(null);
    const [visible, setVisible] = useState(false);

    const formatDate = (date: any) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Get events for the selected date
    const dateTemplate = (date: any) => {
        const dateStr = formatDate(new Date(date.year, date.month, date.day));
        const hasEvents = events[dateStr];

        return (
            <div className="relative">
                <span>{date.day}</span>
                {hasEvents && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                )}
            </div>
        );
    };

    const handleDateSelect = (e: any) => {
        const selectedDate = e.value;
        setDate(selectedDate);

        if (selectedDate) {
            const dateStr = formatDate(selectedDate);
            const dayEvents = events[dateStr];

            if (dayEvents) {
                setSelectedEvents(dayEvents);
                setVisible(true);
            }
        }
    };

    return (
        <>
            <Calendar
                value={date}
                onChange={handleDateSelect}
                dateTemplate={dateTemplate}
                inline
                showWeek
                className="shadow-2xl rounded-md mini-cal w-[50%] max-w-[260px]"
                panelClassName="!bg-transparent !border-0"
            />
            <EventDialog
                date={date}
                visible={visible}
                setVisible={setVisible}
                selectedEvents={selectedEvents}
                formatDate={formatDate}
            />
        </>
    );
}
