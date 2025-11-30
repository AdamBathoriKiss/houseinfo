import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useMaintences from "~/hooks/useMaintences";
import type { User } from "~/interfaces/Dashboard";
import { useAuth } from "~/utils/AuthProvider";

interface CurrentMaintence {
	title: string;
	description: string;
	status: string;
    category: string;
	priority: string;
	buildingId: number;
	reportedBy: User | null;
	reportedById: number;
	id?: number | string;
}

export default function Maintences({
	title,
	description,
	reportedBy,
	reportedById,
	id,
	status,
    category,
	priority,
	buildingId,
}: CurrentMaintence) {
	const { user } = useAuth();
	const {
		onSubmit,
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useMaintences({ buildingId });

	// Amikor új adatok jönnek be (hover), beállítjuk a form értékeit
	useEffect(() => {
        console.log(id)
		if (title) setValue("title", title);
		if (description) setValue("description", description);
		if (reportedBy) {
			const reportedByName = `${reportedBy.lastName} ${reportedBy.firstName}`;
			setValue("reportedBy", reportedByName);
		}
		if (!reportedBy) {
			const userName = `${user.lastName} ${user.firstName}`;
			setValue("reportedBy", userName);
		}
		if (reportedById) setValue("reportedById", reportedById);
		if (id) setValue("id", typeof id === "string" ? parseInt(id) : id);
		if (status) setValue("status", status);
        if(category) setValue('category',category);
		if (priority) setValue("priority", priority);
	}, [title, description, reportedBy, reportedById, id, status, priority, setValue]);

	const statuses = [
		{ name: "Új", value: "NEW" },
		{ name: "Folyamatban", value: "IN_PROGRESS" },
		{ name: "Várakozás", value: "WAITING" },
		{ name: "Megoldva", value: "RESOLVED" },
		{ name: "Lezárt", value: "CLOSED" },
	];

	const categories = [
		{ name: "Vízvezeték", value: "PLUMBING" },
		{ name: "Elektromos", value: "ELECTRICAL" },
		{ name: "Fűtés", value: "HEATING" },
		{ name: "Lift", value: "ELEVATOR" },
		{ name: "Közös területek", value: "COMMON_AREA" },
		{ name: "Szerkezeti", value: "STRUCTURAL" },
		{ name: "Egyéb", value: "OTHER" },
	];

	const priorities = [
		{ name: "Alacsony", value: "LOW" },
		{ name: "Normál", value: "NORMAL" },
		{ name: "Magas", value: "HIGH" },
		{ name: "Sürgős", value: "URGENT" },
	];

	return (
		<div className="h-full w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="p-3">
				<div className="grid grid-cols-1 gap-4">
					<div className="flex flex-col col-start-1 col-end-12 gap-2">
						<label className="font-semibold text-gray-100 text-sm">Feladat megnevezése</label>
						<input
							{...register("title")}
							type="text"
							placeholder="pl. Takarítás"
							className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
						/>
						{errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
					</div>

					<div className="flex flex-row col-start-1 col-end-12 gap-2">
						<div className="w-1/2">
							<label className="font-semibold text-gray-100 text-sm">Bejelentető</label>
							<input
								{...register("reportedBy")}
								type="text"
								disabled
								className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							/>
							{errors.reportedBy && (
								<span className="text-red-500 text-xs">{errors.reportedBy.message}</span>
							)}
						</div>
						
							<input
								{...register("reportedById")}
								type="number"
								hidden
								className="!w-full  py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							/>

							<input
								{...register("id")}
								type="text"
								hidden
								className="!w-full py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							/>
                        	<div className="w-1/2">
							<label className="font-semibold text-gray-100 text-sm">Kategória</label>
							<Controller
								name="category"
								control={control}
								render={({ field }) => (
									<Dropdown
										{...field}
										unstyled
										options={categories}
										optionLabel="name"
										optionValue="value"
										className="!w-full flex flex-row justify-between px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
										panelClassName="!w-40 h-max-fit px-3 !rounded-b-none !border-1 !bg-[#343d4a] !text-start !text-sm/8 items-center"
									/>
								)}
							/>
							{errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
						</div>

					</div>

					<div className="flex flex-row col-start-1 col-end-12 gap-2">

						<div className="w-1/2">
							<label className="font-semibold text-gray-100 text-sm">Státusz</label>
							<Controller
								name="status"
								control={control}
								render={({ field }) => (
									<Dropdown
										{...field}
										unstyled
										options={statuses}
										optionLabel="name"
										optionValue="value"
										className="!w-full flex flex-row justify-between px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
										panelClassName="!w-40 h-max-fit px-3 !rounded-b-none !border-1 !bg-[#343d4a] !text-start !text-sm/8 items-center"
									/>
								)}
							/>
							{errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
						</div>
						<div className="w-1/2">
							<label className="font-semibold text-gray-100 text-sm">Prioritás</label>
							<Controller
								name="priority"
								control={control}
								render={({ field }) => (
									<Dropdown
										{...field}
										unstyled
										options={priorities}
										optionLabel="name"
										optionValue="value"
										className="!w-full flex flex-row justify-between px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
										panelClassName="!w-40 h-max-fit px-3 !rounded-b-none !border-1 !bg-[#343d4a] !text-start !text-sm/8 items-center"
									/>
								)}
							/>
							{errors.priority && <span className="text-red-500 text-xs">{errors.priority.message}</span>}
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
