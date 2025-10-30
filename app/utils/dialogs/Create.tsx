import Maintences from "~/components/Maintences";
import NewsPage from "~/components/NewsPage";

interface Creation {
    setCreateNews?: (createNews: boolean) => void;
    setCreateTask?: (createTask: boolean) => void;
    type: "news" | "maintence";
}

export default function Create({ setCreateTask, setCreateNews, type }: Creation) {

    return type === "news" ? (
        <div className="p-4  rounded-lg h-fit">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-100 mb-4">
                    Új hír létrehozása
                </h3>
                <i
                    className="pi pi-times cursor-pointer"
                    style={{ fontSize: "2rem" }}
                    onClick={() => setCreateNews!(false)}
                ></i>
            </div>
            <NewsPage title="" content="" author={null} date="" />
        </div>
    ) : (
        <div className="p-4  rounded-lg h-fit">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-100 mb-4">
                    Új feladat létrehozása
                </h3>
                <i
                    className="pi pi-times cursor-pointer"
                    style={{ fontSize: "2rem" }}
                    onClick={() => setCreateTask!(false)}
                ></i>
            </div>
            <Maintences title="" description="" responsible="" status="" />
        </div>
    );
}
