import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import type { Nullable } from "primereact/ts-helpers";
import { useEffect, useState } from "react";
import type { Event, EventsMap } from "~/components/EventCalendar";
import CreateEvent from "./CreateEvent";
import { useAuth } from "../AuthProvider";
import EventService from "~/services/event.service";

export default function EventDialog({
	date,
	buildingId,
	visible,
	setVisible,
	selectedEvents,
	formatDate,
	onEventsChanged,
}: {
	date: Nullable<Date>;
	buildingId: number;
	visible: boolean;
	setVisible: (visible: boolean) => void;
	selectedEvents: Event[];
	formatDate: (date: Date) => string;
	onEventsChanged: (newEvents: EventsMap) => void;
}) {
	const { user } = useAuth();
	const [createDialog, setCreateDialog] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | null>(null);

	const handleEdit = (event: Event) => {
		setEditingEvent(event);
		setCreateDialog(true);
	};

	const handleCreateNew = () => {
		setEditingEvent(null);
		setCreateDialog(true);
	};

	const handleCloseCreate = () => {
		setCreateDialog(false);
		setEditingEvent(null);
	};

	const handleSuccess = async () => {
		try {
			const rawEvents = await EventService.getAllByBuilding(buildingId);

			const newEventsMap: EventsMap = {};
			rawEvents.forEach((event: Event) => {
				const dateKey = formatDate(new Date(event.startTime || event.endTime || date!));
				if (!newEventsMap[dateKey]) newEventsMap[dateKey] = [];
				newEventsMap[dateKey].push(event);
			});

			onEventsChanged(newEventsMap);
		} catch (error) {
			console.error("❌ Frissítés hiba:", error);
		}
		setCreateDialog(false);
		setEditingEvent(null);
	};

	const confirmDelete = async (event: Event, type: string) => {
		if (!confirm(`Biztosan törölni szeretnéd ${type === "day" ? "ezt a napot" : "az egész eseményt"}?`)) {
			return;
		}

		try {
			if (type === "day") {
				await EventService.deleteEventDay(event.id, event.occurrenceId);
			} else {
				await EventService.deleteEventCompletely(event.id);
			}

			const rawEvents = await EventService.getAllByBuilding(buildingId);

			const newEventsMap: EventsMap = {};
			rawEvents.forEach((ev: Event) => {
				const dateKey = formatDate(new Date(ev.startTime || ev.endTime!));
				if (!newEventsMap[dateKey]) newEventsMap[dateKey] = [];
				newEventsMap[dateKey].push(ev);
			});

			onEventsChanged(newEventsMap);
			setVisible(false);
		} catch (error) {
			console.error("Törlési hiba:", error);
			alert("Hiba történt a törlés során");
		}
	};

	return (
		<Dialog
			header={date ? `${formatDate(date)}` : "Események"}
			visible={visible}
			contentClassName="!bg-[#343d4a]"
			headerClassName="!bg-[#343d4a]"
			className="lg:w-[25vw]"
			onHide={() => {
				setVisible(false);
				setCreateDialog(false);
				setEditingEvent(null);
			}}
		>
			<div className="space-y-4">
				{!createDialog ? (
					<>
						{selectedEvents.length > 0 ? (
							selectedEvents.map((event: Event, index: number) => (
								<div
									key={`${event.id}-${event.occurrenceId || index}`}
									className="flex flex-row justify-between border-l-4 border-teal-500 bg-gray-500/20 p-4 rounded"
								>
									<div className="flex-1">
										<div className="font-semibold text-gray-100">{event.title}</div>
										<div className="text-sm text-gray-300 mt-1">{event.description}</div>
										<div className="text-sm text-gray-200 mt-1">
											<i className="pi pi-clock mr-2"></i>
											{event.time}
										</div>
									</div>
									<div className="flex flex-row">
										<Button
											icon="pi pi-pencil"
											tooltip="Esemény szerkesztése"
											onClick={() => handleEdit(event)}
											className="!text-blue-400 !bg-transparent hover:!bg-gray-600/30"
										/>
										<Button
											icon="pi pi-trash"
											tooltip="Nap törlése"
											onClick={() => confirmDelete(event, "day")}
											className="!text-red-600 !bg-transparent hover:!bg-gray-600/30"
										/>
										<Button
											icon="pi pi-times"
											tooltip="Teljes esemény törlése"
											onClick={() => confirmDelete(event, "all")}
											className="!text-red-800 !bg-transparent hover:!bg-gray-600/30"
										/>
									</div>
								</div>
							))
						) : (
							<div className="text-center text-gray-400 py-4">Nincs esemény ezen a napon</div>
						)}
						<div className="flex justify-center">
							<Button
								icon="pi pi-plus"
								tooltip="Új esemény hozzáadása"
								onClick={handleCreateNew}
								className="!w-12 !h-12 !rounded-full !bg-indigo-500/20 hover:!bg-indigo-500/40 flex items-center justify-center !shadow-lg !border-0"
							/>
						</div>
					</>
				) : (
					<div>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-gray-100 font-semibold">
								{editingEvent ? "Esemény szerkesztése" : "Új esemény"}
							</h3>
							<Button
								icon="pi pi-times"
								onClick={handleCloseCreate}
								className="!text-gray-300 !bg-transparent hover:!bg-gray-600/30"
							/>
						</div>
						<CreateEvent
							id={editingEvent?.id ? Number(editingEvent.id) : undefined}
							title={editingEvent?.title}
							description={editingEvent?.description || ""}
							startTime={editingEvent?.startTime ? new Date(editingEvent.startTime) : date || new Date()}
							endTime={
								editingEvent?.endTime
									? new Date(editingEvent.endTime)
									: date
										? new Date(date.getTime() + 24 * 60 * 60 * 1000)
										: undefined
							}
							buildingId={buildingId}
							organizerId={user.id}
							onSuccess={handleSuccess}
						/>
					</div>
				)}
			</div>
		</Dialog>
	);
}
