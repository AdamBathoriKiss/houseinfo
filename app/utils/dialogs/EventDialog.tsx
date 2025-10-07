import { Dialog } from "primereact/dialog";
import type { Nullable } from "primereact/ts-helpers";
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import type { Event, EventsMap } from "~/components/EventCalendar";

export default function EventDialog({date, visible, setVisible, selectedEvents, formatDate}: {date: Nullable<Date>, visible: boolean, setVisible: (visible: boolean) => void, selectedEvents: Event[] , formatDate: (date: Date) => string}) {
    
    return (
           <Dialog
                header={date ? `Események - ${formatDate(date)}` : "Események"}
                visible={visible}
                style={{ width: "450px" }}
                onHide={() => setVisible(false)}
            >
                <div className="space-y-4">
                    {selectedEvents.map((event: { title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; time: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                        <div
                            key={index}
                            className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"
                        >
                            <div className="font-semibold text-gray-800">
                                {event.title}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                <i className="pi pi-clock mr-2"></i>
                                {event.time}
                            </div>
                        </div>
                    ))}
                </div>
            </Dialog>
    )
}