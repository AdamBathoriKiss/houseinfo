import { Dialog } from "primereact/dialog";
import Maintences from "~/components/Maintences";
import NewsPage from "~/components/NewsPage";

interface Creation {
    visible?: boolean;
    setVisible: (visible: boolean) => void;
    type: "news" | "maintence" | "newsDialog" | "maintenceDialog";
}

export default function Create({
    visible,
    setVisible,
    type,
}: Creation) {
    const createModal = () => {
        return (
            <div className="p-4  rounded-lg h-fit">
                <div className="flex justify-between items-center mb-4">
                    {type === "news" ? (
                        <h3 className="text-xl font-bold text-gray-100 mb-4">
                            Új hír létrehozása
                        </h3>
                    ) : (
                        <h3 className="text-xl font-bold text-gray-100 mb-4">
                            Új feladat létrehozása
                        </h3>
                    )}
                    <i
                        className="pi pi-times cursor-pointer"
                        style={{ fontSize: "2rem" }}
                        onClick={() => setVisible(false)}
                    ></i>
                </div>
                {type === "news" ? (
                    <NewsPage title="" content="" author={null} date="" />
                ) : (
                    <Maintences
                        title=""
                        description=""
                        responsible=""
                        status=""
                    />
                )}
            </div>
        );
    };

    const createDialog = () => {
        return (
            <Dialog
                header={
                    type === "newsDialog"
                        ? "Új hír létrehozása"
                        : "Új feladat létrehozása"
                }
                headerStyle={{ marginLeft: "0.65rem" }}
                visible={visible}
                onHide={()=> setVisible(false)}
                className="min-h-[60vh] w-[30vw] !bg-[#343d4a] text-gray-300 overflow-hidden"
                contentClassName="h-full p-0 !bg-[#343d4a] text-gray-300"
                headerClassName="!bg-[#343d4a] text-gray-300"
                draggable={false}
                resizable={false}
            >
                <div className="p-4  rounded-lg h-fit">
                    {type === "newsDialog" ? (
                        <NewsPage title="" content="" author={null} date="" />
                    ) : (
                        <Maintences
                            title=""
                            description=""
                            responsible=""
                            status=""
                        />
                    )}
                </div>
            </Dialog>
        );
    };

    if (type === "news" || type === "maintence") {
        return createModal();
    }

    if (type === "newsDialog" || type === "maintenceDialog") {
        console.log(type)
        return createDialog();
    }
}
