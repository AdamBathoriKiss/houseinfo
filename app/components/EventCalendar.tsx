import type { Nullable } from "primereact/ts-helpers";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import EventDialog from "~/utils/dialogs/EventDialog";
import { Button } from "primereact/button";

export type Event = { 
    id: string | number; 
    title: string; 
    time: string;  // Ez a formázott idő a megjelenítéshez
    description: string | null;
    buildingId: number;
    // Opcionális mezők, amiket a backend ad vissza
    startTime?: Date | string;
    endTime?: Date | string;
    isAllDay?: boolean;
};

// EventCalendar props interface
interface EventCalendarProps {
    events: any;
    buildingId: number;
}

export type EventsMap = { [date: string]: Event[] };

export default function EventCalendar({ events: eventsData, buildingId }: EventCalendarProps) {
    const [events, setEvents] = useState<EventsMap>({});
    const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
    // Példa események - dátum: események párok

    useEffect(() => {
        // ✅ Ellenőrzés, hogy eventsData valóban létezik
        if (eventsData && typeof eventsData === 'object') {
            setEvents(eventsData);
        }
    }, [eventsData]);

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
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full"></div>
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
            }
                setVisible(true);
        }
    };

    return (
        <>
            <Calendar
                value={date}
                onChange={handleDateSelect}
                dateTemplate={dateTemplate}
                inline
                className="shadow-2xl rounded-md mini-cal w-[50%] max-w-[260px]"
                panelClassName="!bg-transparent !border-0"
            />
            <EventDialog
                date={date}
                visible={visible}
                setVisible={setVisible}
                selectedEvents={selectedEvents}
                buildingId={buildingId}
                formatDate={formatDate}
            />
        </>
    );
}
