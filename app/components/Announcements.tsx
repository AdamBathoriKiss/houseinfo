import dayjs from "dayjs";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect } from "react";
import useNews from "~/hooks/useNews";
import type { User } from "~/interfaces/Dashboard";
import { useAuth } from "~/utils/AuthProvider";

interface CurrentNews {
    title: string;
    content: string;
    author: User | null;
    authorId: number | string;
    date: string;
}  

/*

  "title": "body.title",
    "content": "body.content",
    "priority": "NORMAL",
    //"isUrgent": 0,
    "authorId": 1,
    "buildingId": 4

*/

export default function Announcements({title, content, author,authorId, date}: CurrentNews) {
    const { user } = useAuth();
    const {
        onSubmit,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useNews();

    // Amikor új adatok jönnek be (hover), beállítjuk a form értékeit
    useEffect(() => {
        if (title) setValue("title", title);
        if (content) setValue("content", content);
        if (author) {
        const authorName = `${author.lastName} ${author.firstName}`;
        setValue("author", authorName);
        setValue("authorId", author.id ? author.id : user)
        }
        if(authorId){
            setValue("authorId", user)
        }
        if(date) setValue("date", dayjs(date).format('YYYY-MM-DD'));
    }, [title, content, author, authorId, setValue]);

    return (
        <div className="h-full w-full">
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
                            {...register("author")}
                            type="text"
                            placeholder="pl. Fő utca 123."
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.author && (
                            <span className="text-red-500 text-xs">
                                {errors.author.message}
                            </span>
                        )}
                        </div>
                        <input
                            {...register("authorId")}
                            type="number"
                            
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.author && (
                            <span className="text-red-500 text-xs">
                                {errors.author.message}
                            </span>
                        )}
                    <div className="w-1/2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Létrehozva *
                        </label>
                        <input
                            {...register("date")}
                            type="date"
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
                    className=" w-full !my-3 !px-5 !py-3 !bg-transparent hover:!bg-teal-400 !text-white !font-semibold !rounded-md !shadow-md !border-1"
                />
            </form>
        </div>
    );
}