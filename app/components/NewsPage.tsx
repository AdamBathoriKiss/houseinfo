import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import useNews from "~/hooks/useNews";

interface CurrentNews {
    title: string;
    content: string;
    createdBy: string;
    date: string;
}  

export default function NewsPage({title,content,createdBy,date}: CurrentNews) {
    const {
        onSubmit,
        toast,
        //propertyTypes,
        stepperRef,
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useNews();

    return (
        <div className="h-full w-full ">
            <Toast ref={toast} />
            <div className="p-3">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Cím *
                        </label>
                        <input
                            {...register("title")}
                            type="text"
                            value={title ? title : watch("title")}
                            placeholder="pl. Sunshine Társasház"
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.title && (
                            <span className="text-red-500 text-xs">
                                {errors.title.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Létrehozta *
                        </label>
                        <input
                            {...register("createdBy")}
                            type="text"
                            value={createdBy ? createdBy : watch("createdBy")}
                            placeholder="pl. Fő utca 123."
                            className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {errors.createdBy && (
                            <span className="text-red-500 text-xs">
                                {errors.createdBy.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-100 text-sm">
                            Hír szövege *
                        </label>
                        <InputTextarea
                            {...register("content")}
                            value={content ? content : watch("content")}
                            rows={10}
                            cols={75}
                            placeholder="pl. Budapest"
                            className="w-fit py-2.5 !bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
            </div>
        </div>
    );
}
