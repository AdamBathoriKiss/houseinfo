import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import type { Nullable } from "primereact/ts-helpers";
import type { Event } from "~/components/EventCalendar";
import { useCommonProcesses } from "~/hooks/useCommonProcesses";

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
                {selectedEvents.map(
                    (event:any, index: any) => (
		console.log(event.id),
                        <div
                            key={index}
                            className="border-l-4 border-teal-500 bg-gray-500/20 p-4 rounded flex flex-row justify-between"
                        >
							<div>
                            <div className="font-semibold text-gray-100">
                                {event.title}
                            </div>
                            <div className="text-sm text-gray-200 mt-1">
                                <i className="pi pi-clock mr-2"></i>
                                {event.time}
                            </div>
							</div>
                            <Button
                                icon="pi pi-trash"
                                tooltip="Feladat törlése"
                                onClick={() => remove("events", event.id)}
                                className="!text-red-600 !bg-transparent hover:!bg-gray-600/30"
                            />
                        </div>
                    )
                )}
            </div>
        </Dialog>
    );
}
