import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Residents, News, Tasks, Bills, Documents } from "./MainPage";
import dataTableColumns from "~/utils/dataTableColumns";
import "../app.css";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

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

    const header = () => {
        return (
            <div className="flex justify-between px-3 py-4 !bg-[#343d4a] backdrop-blur-lg shadow-sm">
                <h4 className="font-semibold">{title}</h4>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText
                        className="mx-4 !bg-transparent w-[15vw] h-[2.5rem] !rounded-4xl"
                        placeholder="Search"
                    />
                </IconField>
                <Button icon="pi pi-upload"/>
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
                                "!px-1 bg-transparent text-gray-50 text-left",
                        },
                        tbody: { className: "align-start" }, // tbody-ra alkalmazott stílus pl.
                        bodyRow: {
                            className:
                                "hover:bg-gray-600/30 hover:text-gray-50 text-start border-b",
                        },
                    }}
                >
                    {dataTableColumns(type).expandedColumns.map((col) => (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            bodyClassName="px-1 py-3 whitespace-nowrap"
                        />
                    ))}
                </DataTable>
            </div>
        </div>
    );
}
