import { DataScroller } from "primereact/datascroller";
import type { News, Tasks } from "./MainPage";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import NewsPage from "./NewsPage";

export interface ListSchemaProps<T = News | Tasks> {
    dataTableValue: T[];
    title: string;
    type: "news" | "tasks";
}

export default function ListViewSchema<T extends News | Tasks>({
    dataTableValue,
    title,
    type,
}: ListSchemaProps<T>) {
    const [onDialogOpened, setOnDialogOpened] = useState<boolean>(false);
    const [hoveredItem, setHoveredItem] = useState<News | Tasks | null>(null);
    const [createNews, setCreateNews] = useState<boolean>(false);

    // Type guard függvények
    const isNews = (item: News | Tasks): item is News => {
        return type === "news";
    };

    const isTasks = (item: News | Tasks): item is Tasks => {
        return type === "tasks";
    };

    const renderNewsTemplate = (news: News, isHoverable = false) => {
        const hoverProps = isHoverable
            ? {
                  onMouseEnter: () => setHoveredItem(news),
                  //onMouseLeave: () => setHoveredItem(null),
                  style: { cursor: "pointer" },
              }
            : {};

        return (
            <div
                className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg hover:!bg-[#3d4651] transition-colors duration-200"
                {...hoverProps}
            >
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
                        {!isHoverable && (
                            <Button
                                icon="pi pi-eye"
                                className="p-button-rounded p-button-sm"
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderTasksTemplate = (tasks: Tasks, isHoverable = false) => {
        const hoverProps = isHoverable
            ? {
                  onMouseEnter: () => setHoveredItem(tasks),
                  onMouseLeave: () => setHoveredItem(null),
                  style: { cursor: "pointer" },
              }
            : {};

        return (
            <div
                className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg hover:!bg-[#3d4651] transition-colors duration-200"
                {...hoverProps}
            >
                <div className="flex flex-row w-full justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-bold text-gray-100">
                            {tasks.title}
                        </div>
                        <div className="text-sm text-gray-300">
                            {tasks.description}
                        </div>
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

    const itemTemplate = (item: News | Tasks, isHoverable = false) => {
        if (isNews(item)) {
            return renderNewsTemplate(item, isHoverable);
        } else if (isTasks(item)) {
            return renderTasksTemplate(item, isHoverable);
        }
    };

    // Külön template a dialog-ban lévő DataScroller-hez (hover funkcionalitással)
    const hoverableItemTemplate = (item: News | Tasks) => {
        return itemTemplate(item, true);
    };

    // Komponens a jobb oldali részletekhez
    const renderItemDetails = () => {
        if (!hoveredItem && !createNews) {
            return (
                <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                        <i className="pi pi-info-circle text-4xl mb-4"></i>
                        <p>
                            Vigye az egeret egy elem fölé a részletek
                            megtekintéséhez
                        </p>
                    </div>
                </div>
            );
        }

        if (createNews) {
            return (
                <div className="p-4  rounded-lg h-fit">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-100 mb-4">
                            Új hír létrehozása
                        </h3>
                        <i
                            className="pi pi-times"
                            style={{ fontSize: "2rem" }}
                            onClick={() => setCreateNews(false)}
                        ></i>
                    </div>
                    <NewsPage title="" content="" createdBy="" date="" />
                </div>
            );
        } else if (hoveredItem) {
            return (
                <div className="p-4  rounded-lg h-fit">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-100 mb-4">
                            Részletek
                        </h3>
                        <i
                            className="pi pi-times"
                            style={{ fontSize: "2rem" }}
                            onClick={() => setHoveredItem(null)}
                        ></i>
                    </div>
                    {isNews(hoveredItem) ? (
                        <div className="space-y-3">
                            <NewsPage
                                title={hoveredItem.title}
                                content={hoveredItem.content}
                                createdBy={hoveredItem.createdBy}
                                date={hoveredItem.date}
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-semibold text-gray-300">
                                    Cím:
                                </label>
                                <p className="text-gray-100">
                                    {hoveredItem.title}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-300">
                                    Leírás:
                                </label>
                                <p className="text-gray-100">
                                    {hoveredItem.description}
                                </p>
                            </div>
                            {hoveredItem.responsible && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-300">
                                        Felelős:
                                    </label>
                                    <p className="text-gray-100">
                                        {hoveredItem.responsible}
                                    </p>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-semibold text-gray-300">
                                    Státusz:
                                </label>
                                <p className="text-gray-100">
                                    {hoveredItem.status}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    };

    const header = () => {
        return (
            <div className="w-full flex flex-row justify-between items-center">
                <p className="mx-4 text-dark-200 font-black">{title}</p>
                <div className="flex flex-row items-center justify-around gap-2">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText
                            className="mx-4 !bg-transparent w-[15vw] h-[2.5rem] !rounded-4xl"
                            placeholder="Search"
                        />
                    </IconField>
                    <span
                        className="pi pi-window-maximize cursor-pointer hover:text-blue-500"
                        onClick={() => setOnDialogOpened(!onDialogOpened)}
                    ></span>
                </div>
            </div>
        );
    };

    const headerMaximalized = () => {
        return (
            <div className="flex flex-row items-center justify-between gap-2">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText
                        className="mx-4 !bg-transparent w-[15vw] h-[2.5rem] !rounded-4xl"
                        placeholder="Search"
                    />
                </IconField>

                <Button
                    icon="pi pi-plus"
                    tooltip="Új hír létrehozása"
                    onClick={() => setCreateNews(true)}
                    className="!p-2 !bg-teal-400  !text-white !font-semibold !rounded-md !shadow-md"
                />
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

            {/* Dialog */}
            {onDialogOpened && (
                <Dialog
                    header={title}
                    headerStyle={{ marginLeft: "1.5rem" }}
                    visible={onDialogOpened}
                    onHide={() => {
                        setOnDialogOpened(false);
                        setHoveredItem(null); // Reset hover state when closing
                    }}
                    className="min-h-[96vh] w-[96vw] !bg-[#343d4a] text-gray-300 px-3 overflow-hidden"
                    contentClassName="h-full p-0 !bg-[#343d4a] text-gray-300 px-3"
                    headerClassName="!bg-[#343d4a] text-gray-300 px-3"
                    draggable={false}
                    resizable={false}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <DataScroller
                            value={dataTableValue}
                            itemTemplate={hoverableItemTemplate}
                            rows={15}
                            inline
                            scrollHeight="510px"
                            header={headerMaximalized()}
                            className="!bg-[#343d4a]"
                        />

                        {/* Jobb oldali részletek panel */}
                        <div className="bg-[#343d4a] p-4 rounded-lg">
                            {renderItemDetails()}
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
}
