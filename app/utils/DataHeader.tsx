import { Button } from "primereact/button";
import SearchBar from "./SearchBar";
import FileUploader from "~/components/FileUploader";
import { useAuth } from "./AuthProvider";

export interface HeaderInterface {
    title?: string;
    type?: string;
    filter?: (searchTerm: string) => void;
    onMaximizedOpened?: boolean;
    setOnMaximizedOpened?: (onDialogOpened: boolean) => void;
    setCreateNews?: (item: boolean) => void;
    setCreateTask?: (item: boolean) => void;
    setCreateParking?: (item: boolean) => void;
    fileUpdateDialog?: boolean;
    buildingId?: number
}

const header = ({
    title,
    filter,
    onMaximizedOpened,
    setOnMaximizedOpened,
    fileUpdateDialog,
    setCreateNews,
    setCreateTask,
    setCreateParking,
    type,
    buildingId
}: HeaderInterface) => {
    const {user} = useAuth();
    return (
        <div className="w-full flex flex-row justify-between items-center">
            <p className="mx-4 text-dark-200 font-black">{title}</p>
            <div className="flex flex-row items-center justify-around">
                {filter && <SearchBar filterFunction={filter} />}

                {type === "news" && setCreateNews &&(
                    <Button
                        icon="pi pi-plus"
                        tooltip="Új hír létrehozása"
                        onClick={() => setCreateNews(true)}
                        className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
                    />
                )}

                {type === "maintence" && setCreateTask && (
                    <Button
                        icon="pi pi-plus"
                        tooltip="Új feladat létrehozása"
                        onClick={() => setCreateTask(true)}
                        className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
                    />
                )}

                {type === "parking" && setCreateParking && (
                    <Button
                        icon="pi pi-plus"
                        tooltip="Új feladat létrehozása"
                        onClick={() => setCreateParking(true)}
                        className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
                    />
                )}
                {setOnMaximizedOpened !== undefined && (
                    <span
                        className="pi pi-window-maximize cursor-pointer hover:text-blue-500 md:hidden"
                        onClick={() => setOnMaximizedOpened(!onMaximizedOpened)}
                    ></span>
                )}
                {fileUpdateDialog && <FileUploader buildingId={buildingId ? buildingId : null} uploadedBy={user.userId}/>}
            </div>
        </div>
    );
};

const headerMaximalized = ({
    type,
    filter,
    setCreateNews,
    setCreateTask,
}: HeaderInterface) => {
    return (
        <div className="flex flex-row items-center justify-between gap-2">
            {filter && <SearchBar filterFunction={filter} />}

            {type === "news" && setCreateNews && (
                <Button
                    icon="pi pi-plus"
                    tooltip="Új hír létrehozása"
                    onClick={() => setCreateNews(true)}
                    className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
                />
            )}

            {type === "maintence" && setCreateTask && (
                <Button
                    icon="pi pi-plus"
                    tooltip="Új feladat létrehozása"
                    onClick={() => setCreateTask(true)}
                    className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
                />
            )}
        </div>
    );
};

const DataHeader = {
    header,
    headerMaximalized,
};

export default DataHeader;
