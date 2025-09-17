import { DataScroller } from "primereact/datascroller";
import type { News } from "./MainPage";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

// Javított interface - csak News típust fogad el
export interface ListSchemaProps {
    dataTableValue: News[];
    title: string;
    type: string;
}

export default function ListViewSchema({
    dataTableValue,
    title,
    type,
}: ListSchemaProps) {
    const [onDialogOpened, setOnDialogOpened] = useState<boolean>(false);
    const itemTemplate = (news: News) => {
        return (
            <div className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg">
                <div className="flex flex-row w-full justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-bold text-gray-100">
                            {news.title}
                        </div>
                        <div className="text-sm text-gray-300">
                            {news.content}
                        </div>
                        <div className="text-xs text-gray-400">
                            <i className="pi pi-user mr-2"></i>
                            {news.createdBy}
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-sm font-semibold text-gray-100">
                            {news.date}
                        </span>
                        <Button
                            icon="pi pi-eye"
                            className="p-button-rounded p-button-sm"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const header = () => {
        return (
            <div className="w-full flex flex-row justify-between items-center">
                <p className="mx-4 text-dark-200">{title}</p>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText
                            className="mx-4 !bg-transparent w-[15vw] h-[2.5rem] !rounded-4xl"
                            placeholder="Search"
                        />
                    </IconField>
            </div>
        );
    };

    return (
        <div>
            <DataScroller
                value={dataTableValue}
                itemTemplate={itemTemplate}
                rows={5}
                inline
                scrollHeight="310px"
                header={header()}
                className="!bg-[#343d4a]"
            />
        </div>
    );
}
