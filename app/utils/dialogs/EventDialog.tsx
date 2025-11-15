import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import type { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import type { Event } from "~/components/EventCalendar";
import { useCommonProcesses } from "~/hooks/useCommonProcesses";
import CreateEvent from "./CreateEvent";

export default function EventDialog({
    date,
    visible,
    setVisible,
    selectedEvents,
    formatDate,
}: {
    date: Nullable<Date>;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    selectedEvents: Event[];
    formatDate: (date: Date) => string;
}) {
    const { remove } = useCommonProcesses();
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

    // Feltételezzük, hogy minden esemény ugyanabban az épületben van
    const buildingId = selectedEvents[0]?.buildingId || 0;

    return (
        <Dialog
            header={date ? `${formatDate(date)}` : "Események"}
            visible={visible}
            contentClassName="!bg-[#343d4a]"
            headerClassName="!bg-[#343d4a]"
            style={{ width: "450px" }}
            onHide={() => setVisible(false)}
        >
            <div className="space-y-4">
                {!createDialog ? (
                    <>
                        {selectedEvents.map((event: Event, index: number) => (
                            <div
                                key={event.id || index}
                                className="flex flex-row justify-between border-l-4 border-teal-500 bg-gray-500/20 p-4 rounded"
                            >
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-100">
                                        {event.title}
                                    </div>
                                    <div className="text-sm text-gray-300 mt-1">
                                        {event.description}
                                    </div>
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
                                        tooltip="Esemény törlése"
                                        onClick={() => remove("events", event.id)}
                                        className="!text-red-600 !bg-transparent hover:!bg-gray-600/30"
                                    />
                                </div>
                            </div>
                        ))}
                        <Divider align="center">
                            <Button
                                icon="pi pi-plus"
                                onClick={handleCreateNew}
                                className="!text-indigo-300 !bg-transparent !w-full hover:!bg-gray-600/30"
                            />
                        </Divider>
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
                            description={editingEvent?.description}
                            startTime={editingEvent?.startTime ? new Date(editingEvent.startTime) : date || new Date()}
                            endTime={editingEvent?.endTime ? new Date(editingEvent.endTime) : undefined}
                            buildingId={buildingId}
                        />
                    </div>
                )}
            </div>
        </Dialog>
    );
}