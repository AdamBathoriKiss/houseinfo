import type { Nullable } from "primereact/ts-helpers";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import EventDialog from "~/utils/dialogs/EventDialog";
import { Button } from "primereact/button";

export type Event = {
	occurrenceId: number;
	id: string | number;
	title: string;
	time: string;
	description: string | null;
	buildingId: number;
	startTime?: Date | string;
	endTime?: Date | string;
	isAllDay?: boolean;
};

interface EventCalendarProps {
	events: any;
	buildingId: number;
}

export type EventsMap = { [date: string]: Event[] };

export default function EventCalendar({ events: eventsData, buildingId }: EventCalendarProps) {
	const [events, setEvents] = useState<EventsMap>({});
	const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
	const [date, setDate] = useState<Nullable<Date>>(null);
	const [visible, setVisible] = useState(false);
	const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

	useEffect(() => {
		if (eventsData && typeof eventsData === "object") {
			setEvents(eventsData);
		}
	}, [eventsData]);

	const formatDate = (date: any) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

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
			setSelectedDateKey(dateStr);
			const dayEvents = events[dateStr];

			if (dayEvents) setSelectedEvents(dayEvents);
			else setSelectedEvents([]);
			setVisible(true);
		}
	};

	const handleEventsChanged = (newEventsData: EventsMap) => {
		setEvents(newEventsData);

		if (selectedDateKey) {
			const dayEvents = newEventsData[selectedDateKey];
			setSelectedEvents(dayEvents ?? []);
		}
	};

	return (
		<>
			<Calendar
				value={date}
				onChange={handleDateSelect}
				dateTemplate={dateTemplate}
				inline
				className="rounded-md px-4 w-full !bg-transparent"
				panelClassName="!bg-transparent !border-0 !overflow-hidden"
			/>

			<EventDialog
				date={date}
				visible={visible}
				setVisible={setVisible}
				selectedEvents={selectedEvents}
				buildingId={buildingId}
				formatDate={formatDate}
				onEventsChanged={handleEventsChanged}
			/>
		</>
	);
}
