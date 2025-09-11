import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Residents, News, Tasks, Bills, Documents } from "./MainPage";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import dataTableColumns from "~/utils/dataTableColumns";

interface ListSchemaProps {
    dataTableValue: Residents[]| News[] | Tasks[] | Bills[] | Documents[];
    title: string;
	type: string;
}


export default function ListSchema({ dataTableValue, title, type }: ListSchemaProps) {
    const [onDialogOpened, setOnDialogOpened] = useState<boolean>(false);

    const header = () => {
        return (
            <div className="flex justify-between">
                <h4>{title}</h4>	
                <span
                    className="pi pi-window-maximize cursor-pointer"
                    onClick={() => setOnDialogOpened(!onDialogOpened)}
                ></span>
            </div>
        );
    };

    return (
        <>
            <DataTable
                value={dataTableValue}
                stripedRows
                className="rounded"
                header={header}
                emptyMessage="Nincs megjelenítendő adat"
                scrollable
                scrollHeight="flex"
            >
				{dataTableColumns(type).columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>

            {onDialogOpened && (
                <Dialog
                    header={title}
                    visible={onDialogOpened}
                    onHide={() => setOnDialogOpened(false)}
                    className="lg:w-[90vw] h-[80vh]"
                    draggable={false}
                    resizable={false}
                >
                    <DataTable
                        value={dataTableValue}
                        stripedRows
                        className="rounded"
                        emptyMessage="Nincs megjelenítendő adat"
                        scrollable
                        scrollHeight="400px"
                        virtualScrollerOptions={{
                            itemSize: 46
                        }}
                    >
                       	{dataTableColumns(type).expandedColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
                    </DataTable>
                </Dialog>
            )}
        </>
    );
}
