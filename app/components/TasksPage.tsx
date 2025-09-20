import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useEffect } from "react";
import useNews from "~/hooks/useNews";
import useTasks from "~/hooks/useTasks";

interface CurrentNews {
    title: string;
    description: string;
    responsible: string;
    status: string;
}  

export default function TasksPage({title, description, responsible, status}: CurrentNews) {
    const {
        onSubmit,
        toast,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useTasks();

    // Amikor új adatok jönnek be (hover), beállítjuk a form értékeit
    useEffect(() => {
        if (title) setValue("title", title);
        if (description) setValue("description", description);
        if (responsible) setValue("responsible", responsible);
        if(status) setValue("status", status);
    }, [title, description, responsible, setValue]);

    return (
        <div className="h-full w-full">
            <Toast ref={toast} />
            <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col col-start-1 col-end-12 gap-2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Feladat megnevezése
                        </label>
                        <input
                            {...register("title")}
                            type="text"
                            placeholder="pl. Takarítás"
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
                            Felelős
                        </label>
                        <input
                            {...register("responsible")}
                            type="text"
                            placeholder="pl. Fő utca 123."
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.responsible && (
                            <span className="text-red-500 text-xs">
                                {errors.responsible.message}
                            </span>
                        )}
                        </div>
                    <div className="w-1/2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Státusz
                        </label>
                        <input
                            {...register("status")}
                            type="text"
                            placeholder="pl. Fő utca 123."
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.status && (
                            <span className="text-red-500 text-xs">
                                {errors.status.message}
                            </span>
                        )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 col-start-1 col-end-12">
                        <label className="font-semibold text-gray-100 text-sm">
                            Feladat részletes leírása
                        </label>
                        <InputTextarea
                            {...register("description")}
                            rows={10}
                            cols={95}
                            placeholder="pl. Budapest"
                            className="w-full py-2.5 !bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.description && (
                            <span className="text-red-500 text-xs">
                                {errors.description.message}
                            </span>
                        )}
                    </div>
                </div>
                
                <Button
                    label="Mentés"
                    severity="success"
                    type="submit"
                    className=" w-full !my-3 !px-5 !py-3 !bg-teal-400 hover:!bg-green-700 !text-white !font-semibold !rounded-md !shadow-md"
                />
            </form>
        </div>
    );
}