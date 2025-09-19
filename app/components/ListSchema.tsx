import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Residents, News, Tasks, Bills, Documents } from "./MainPage";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import dataTableColumns from "~/utils/dataTableColumns";
import "../app.css";

export interface ListSchemaProps {
    dataTableValue: Residents[] | News[] | Tasks[] | Bills[] | Documents[];
    title: string;
    type: string;
}

export default function ListSchema({
    dataTableValue,
    title,
    type,
}: ListSchemaProps) {
    const [onDialogOpened, setOnDialogOpened] = useState<boolean>(false);

    const header = () => {
        return (
            <div className="flex justify-between p-4 !bg-[#343d4a] backdrop-blur-lg   shadow-sm">
                <h4 className="font-semibold">{title}</h4>
                <span
                    className="pi pi-window-maximize cursor-pointer hover:text-blue-500"
                    onClick={() => setOnDialogOpened(!onDialogOpened)}
                ></span>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            {header()}

            {/* DataTable konténer - flex-1 használja a maradék helyet */}
            <div className="flex-1 overflow-hidden">
                <DataTable
                    value={dataTableValue}
                    unstyled
                    className="h-full !bg-[#343d4a] backdrop-blur-lg shadow-sm text-gray-300 px-3"
                    emptyMessage="Nincs megjelenítendő adat"
                    pt={{
                        wrapper: {
                            className: "h-full overflow-auto backdrop-blur-3xl",
                        },
                        table: {
                            className:
                                "w-full text-start table-auto border-collapse",
                        },
                        thead: {
                            className:
                                "!px-1 bg-transparent text-gray-50 text-left px-3",
                        },
                        tbody: { className: "align-start" }, // tbody-ra alkalmazott stílus pl.
                        bodyRow: {
                            className:
                                "hover:bg-gray-600/30 hover:text-gray-50 text-start border-b",
                        },
                    }}
                >
                    {dataTableColumns(type).columns.map((col) => (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            bodyClassName="px-1 py-3 whitespace-nowrap"
                        />
                    ))}
                </DataTable>
            </div>

            {/* Dialog */}
            {onDialogOpened && (
                <Dialog
                    header={title}
                    visible={onDialogOpened}
                    onHide={() => setOnDialogOpened(false)}
                    className="lg:w-[90vw] lg:h-[80vh]"
                    contentClassName="h-full p-0"
                    draggable={false}
                    resizable={false}
                >
                    <div className="h-full">
                        <DataTable
                            value={dataTableValue}
                            //stripedRows
                            unstyled
                            emptyMessage="Nincs megjelenítendő adat"
                            scrollable
                            scrollHeight="70vh"
                            virtualScrollerOptions={{
                                itemSize: 46,
                            }}
                            pt={{
                                wrapper: {
                                    className: "h-full overflow-auto",
                                },
                                table: {
                                    className:
                                        "w-full table-auto border-collapse",
                                },
                                header: {
                                    className:
                                        "bg-gray-100 text-gray-700 font-semibold p-3 border-b border-gray-300 select-none",
                                },
                                tbody: { className: "align-middle" }, // tbody-ra alkalmazott stílus pl.
                                bodyRow: {
                                    className:
                                        "hover:bg-gray-50 even:bg-gray-50 border-b border-gray-200",
                                },
                            }}
                        >
                            {dataTableColumns(type).expandedColumns.map(
                                (col, i) => (
                                    <Column
                                        key={col.field}
                                        field={col.field}
                                        header={col.header}
                                    />
                                )
                            )}
                        </DataTable>
                    </div>
                </Dialog>
            )}
        </div>
    );
}
