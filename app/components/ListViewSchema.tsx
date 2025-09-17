import { DataScroller } from "primereact/datascroller";
import type { News, Tasks } from "./MainPage";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export interface ListSchemaProps<T = News | Tasks> {
    dataTableValue: T[];
    title: string;
    type: "news" | "tasks"; // Pontosan definiált típusok
}

export default function ListViewSchema<T extends News | Tasks>({
    dataTableValue,
    title,
    type,
}: ListSchemaProps<T>) {
    const [onDialogOpened, setOnDialogOpened] = useState<boolean>(false);

    // Type guard függvények
    const isNews = (item: News | Tasks): item is News => {
        return type === "news";
    };

    const isTasks = (item: News | Tasks): item is Tasks => {
        return type === "tasks";
    };

    const renderNewsTemplate = (news: News) => {
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

    const renderTasksTemplate = (tasks: Tasks) => {
        return (
            <div className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg">
                <div className="flex flex-row w-full justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-bold text-gray-100">
                            {tasks.title}
                        </div>
                        <div className="text-sm text-gray-300">
                            {tasks.description}
                        </div>
                        {/* Tasks specifikus mezők */}
                        {tasks.responsible && (
                            <div className="text-xs text-green-400">
                                <i className="pi pi-user-plus mr-2"></i>
                                Assigned to: {tasks.responsible}
                            </div>
                        )}
                    </div>
					<div className="flex flex-col justify-center items-end">
                    <Button
                        icon="pi pi-eye"
                        className="p-button-rounded p-button-sm"
                    />

                    <div className="text-xs my-3 text-gray-400">
                        <i className="pi pi-wave-pulse mr-2"></i>
                        {tasks.status}
                    </div>
					</div>
                </div>
            </div>
        );
    };

    const itemTemplate = (item: News | Tasks) => {
        if (isNews(item)) {
            return renderNewsTemplate(item);
        } else if (isTasks(item)) {
            return renderTasksTemplate(item);
        }
    };

    const header = () => {
        return (
            <div className="w-full flex flex-row justify-between items-center">
                <p className="mx-4 text-dark-200 font-black">{title}</p>
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
