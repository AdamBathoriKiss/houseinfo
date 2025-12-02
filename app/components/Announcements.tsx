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
	type: "create" | "update";
	authorId?: number;
	date: string;
	buildingId: number;
	id?: string;
}

export default function Announcements({ title, content, author, authorId, type, date, id, buildingId }: CurrentNews) {
	const { user } = useAuth();
	const currentDay = new Date();
	const {
		onSubmit,
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useNews({ buildingId });

	useEffect(() => {
		if (title) setValue("title", title);
		if (content) setValue("content", content);
		if (author) {
			const authorName = `${author.lastName} ${author.firstName}`;
			setValue("author", authorName);
		} else {
			const userName = `${user.lastName} ${user.firstName}`;
			setValue("author", userName);
		}
		if (authorId) {
            console.log('TESZT',authorId)
			setValue("authorId", authorId);
		}
        if(!authorId && author){
            setValue("authorId", author.id);
        }

		if (type) {
			setValue("type", type);
		}
		if (id) setValue("id", Number(id));
		if (date) setValue("date", dayjs(date).format("YYYY-MM-DD"));
		if (!date) setValue("date", dayjs(currentDay).format("YYYY-MM-DD"));
	}, [title, content, author, authorId, date,type, setValue]);


	return (
		<div className="h-full w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-4 lg:p-6">
				<div className="flex flex-col gap-4 md:gap-5">
					<div className="flex flex-col gap-2">
						<label className="font-semibold text-gray-100 text-sm md:text-base">
							Cím <span className="text-red-400">*</span>
						</label>
						<input
							{...register("title")}
							type="text"
							placeholder="pl. Sunshine Társasház"
							className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base text-gray-100 placeholder-gray-500 transition-all"
						/>
						{errors.title && (
							<span className="text-red-400 text-xs md:text-sm flex items-center gap-1">
								<i className="pi pi-exclamation-circle text-xs"></i>
								{errors.title.message}
							</span>
						)}
					</div>

					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<label className="font-semibold text-gray-100 text-sm md:text-base mb-2 block">
								Létrehozta <span className="text-red-400">*</span>
							</label>
							<input
								{...register("author")}
								type="text"
								placeholder="Név"
								className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base text-gray-100 placeholder-gray-500 transition-all"
							/>
							{errors.author && (
								<span className="text-red-400 text-xs md:text-sm flex items-center gap-1 mt-1">
									<i className="pi pi-exclamation-circle text-xs"></i>
									{errors.author.message}
								</span>
							)}
						</div>

						<input {...register("authorId")} type="number" hidden />

						<input {...register("type")} type="text" hidden />

						<input {...register("id")} type="number" hidden />

						<div className="flex-1">
							<label className="font-semibold text-gray-100 text-sm md:text-base mb-2 block">
								Létrehozva <span className="text-red-400">*</span>
							</label>
							<input
								{...register("date")}
								type="date"
								className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base text-gray-100 transition-all"
							/>
							{errors.date && (
								<span className="text-red-400 text-xs md:text-sm flex items-center gap-1 mt-1">
									<i className="pi pi-exclamation-circle text-xs"></i>
									{errors.date.message}
								</span>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<label className="font-semibold text-gray-100 text-sm md:text-base">
							Hír szövege <span className="text-red-400">*</span>
						</label>
						<InputTextarea
							{...register("content")}
							rows={8}
							placeholder="Írja be a hír szövegét..."
							className="w-full px-3 py-2.5 md:px-4 md:py-3 !bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base text-gray-100 placeholder-gray-500 transition-all resize-none"
							autoResize
						/>
						{errors.content && (
							<span className="text-red-400 text-xs md:text-sm flex items-center gap-1">
								<i className="pi pi-exclamation-circle text-xs"></i>
								{errors.content.message}
							</span>
						)}
					</div>
				</div>

				<Button
					label="Mentés"
					icon="pi pi-save"
					type="submit"
					className="w-full mt-6 !px-4 !py-3 md:!py-3.5 !bg-teal-600 hover:!bg-teal-500 !text-white !font-semibold !rounded-lg !shadow-lg hover:!shadow-xl !border-0 transition-all duration-200 !text-sm md:!text-base"
				/>
			</form>
		</div>
	);
}
