import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useEffect } from "react";
import useNews from "~/hooks/useNews";

interface CurrentNews {
    title: string;
    content: string;
    createdBy: string;
    date: string;
}  

export default function NewsPage({title, content, createdBy, date}: CurrentNews) {
    const {
        onSubmit,
        toast,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useNews();

    // Amikor új adatok jönnek be (hover), beállítjuk a form értékeit
    useEffect(() => {
        if (title) setValue("title", title);
        if (content) setValue("content", content);
        if (createdBy) setValue("createdBy", createdBy);
        if(date) setValue("date", date);
    }, [title, content, createdBy, setValue]);

    return (
        <div className="h-full w-full">
            <Toast ref={toast} />
            <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col col-start-1 col-end-12 gap-2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Cím *
                        </label>
                        <input
                            {...register("title")}
                            type="text"
                            placeholder="pl. Sunshine Társasház"
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.title && (
                            <span className="text-red-500 text-xs">
                                {errors.title.message}
                            </span>
                        )}
                    </div>

                
                    <div className="flex flex-row col-start-1 col-end-12 gap-2">
                    <div className="w-1/2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Létrehozta *
                        </label>
                        <input
                            {...register("createdBy")}
                            type="text"
                            placeholder="pl. Fő utca 123."
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.createdBy && (
                            <span className="text-red-500 text-xs">
                                {errors.createdBy.message}
                            </span>
                        )}
                        </div>
                    <div className="w-1/2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Létrehozva *
                        </label>
                        <input
                            {...register("date")}
                            type="text"
                            placeholder="pl. Fő utca 123."
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.date && (
                            <span className="text-red-500 text-xs">
                                {errors.date.message}
                            </span>
                        )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 col-start-1 col-end-12">
                        <label className="font-semibold text-gray-100 text-sm">
                            Hír szövege *
                        </label>
                        <InputTextarea
                            {...register("content")}
                            rows={10}
                            cols={95}
                            placeholder="pl. Budapest"
                            className="w-full py-2.5 !bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.content && (
                            <span className="text-red-500 text-xs">
                                {errors.content.message}
                            </span>
                        )}
                    </div>
                </div>
                
                <Button
                    label="Mentés"
                    severity="success"
                    type="submit"
                    className="!my-3 !px-5 !py-3 !bg-green-600 hover:!bg-green-700 !text-white !font-semibold !rounded-md !shadow-md"
                />
            </form>
        </div>
    );
}