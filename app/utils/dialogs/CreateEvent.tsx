import dayjs from "dayjs";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useEvents from "~/hooks/useEvents";
import { Calendar } from "primereact/calendar";

interface CurrentEvent {
	id?: number;
	title?: string;
	description?: string | null;
	startTime?: Date;
	endTime?: Date | string;
	buildingId: number;
	organizerId: number;
}

export default function CreateEvent({
	id,
	title,
	description,
	startTime,
	endTime,
	buildingId,
	organizerId,
}: CurrentEvent) {
	const {
		onSubmit,
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useEvents({ buildingId });

	useEffect(() => {
		if (id) setValue("id", id);
		if (title) setValue("title", title);
		if (description) setValue("description", description);
		if (startTime) {
			const date = new Date(dayjs(startTime).format("YYYY-MM-DD"));
			setValue("startTime", date);
		}
		if (endTime) {
			const date = typeof endTime === "string" ? new Date(endTime) : endTime;
			setValue("endTime", date);
		}
		if (organizerId) {
			setValue("organizerId", organizerId);
		}
	}, [id, title, description, startTime, endTime, buildingId, organizerId, setValue]);

	// ... rest of component

	return (
		<div className="h-full w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="p-1">
				<div className="grid grid-cols-1 gap-1">
					<div className="flex flex-col col-start-1 col-end-12 gap-2">
						<label className="font-semibold text-gray-100 text-sm">Esemény megnevezése</label>
						<input
							{...register("title")}
							type="text"
							placeholder="pl. Takarítás"
							className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
						/>
						{errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
					</div>

					<div className="flex flex-row col-start-1 col-end-12 gap-1">
						<div className="w-1/2">
							<label className="font-semibold text-gray-100 text-sm">Esemény kezdete</label>
							<Controller
								name="startTime"
								control={control}
								defaultValue={startTime || new Date()}
								render={({ field }) => (
									<Calendar
										id={field.name}
										value={field.value}
										onChange={(e) => field.onChange(e.value)}
										dateFormat="yy-mm-dd"
										showIcon
										className="w-full h-7/12 !bg-transparent"
										inputClassName="w-full !bg-transparent px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									/>
								)}
							/>
							{errors.startTime && (
								<span className="text-red-500 text-xs">{errors.startTime.message}</span>
							)}
						</div>
						<div className="w-1/2">
							<label className="font-semibold text-gray-100 text-sm">Esemény vége</label>
							<Controller
								name="endTime"
								control={control}
								defaultValue={endTime ? new Date(endTime) : undefined}
								render={({ field }) => (
									<Calendar
										id={field.name}
										value={field.value}
										onChange={(e) => field.onChange(e.value)}
										dateFormat="yy-mm-dd"
										showIcon
										className="w-full h-7/12 !bg-transparent"
										inputClassName="w-full !bg-transparent px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									/>
								)}
							/>
							{errors.endTime && <span className="text-red-500 text-xs">{errors.endTime.message}</span>}
						</div>

						<div>
							<input
								{...register("id")}
								type="number"
								hidden
								className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							/>
						</div>

						<div>
							<input
								{...register("organizerId")}
								type="number"
								hidden
								className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2 col-start-1 col-end-12">
						<label className="font-semibold text-gray-100 text-sm">Feladat részletes leírása</label>
						<InputTextarea
							{...register("description")}
							rows={10}
							cols={95}
							placeholder="pl. Budapest"
							className="w-full py-2.5 !bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
						/>
						{errors.description && (
							<span className="text-red-500 text-xs">{errors.description.message}</span>
						)}
					</div>
				</div>

				<Button
					label="Mentés"
					severity="success"
					type="submit"
					className="w-full !my-3 !px-5 !py-3 !bg-transparent hover:!bg-teal-400 !text-white !font-semibold !rounded-md !shadow-md !border-1"
				/>
			</form>
		</div>
	);
}
