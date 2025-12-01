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

	useEffect(() => {
		console.log(id);
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
		if (category) setValue("category", category);
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
			<form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-4 lg:p-6">
				<div className="flex flex-col gap-4 md:gap-5">
					{/* Feladat megnevezése */}
					<div className="flex flex-col gap-2">
						<label className="font-semibold text-gray-100 text-sm md:text-base">
							Feladat megnevezése <span className="text-red-400">*</span>
						</label>
						<input
							{...register("title")}
							type="text"
							placeholder="pl. Takarítás"
							className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base text-gray-100 placeholder-gray-500 transition-all"
						/>
						{errors.title && (
							<span className="text-red-400 text-xs md:text-sm flex items-center gap-1">
								<i className="pi pi-exclamation-circle text-xs"></i>
								{errors.title.message}
							</span>
						)}
					</div>

					{/* Bejelentető és Kategória */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<label className="font-semibold text-gray-100 text-sm md:text-base mb-2 block">
								Bejelentető <span className="text-red-400">*</span>
							</label>
							<input
								{...register("reportedBy")}
								type="text"
								disabled
								className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-700/30 border border-gray-600 rounded-lg text-sm md:text-base text-gray-400 cursor-not-allowed"
							/>
							{errors.reportedBy && (
								<span className="text-red-400 text-xs md:text-sm flex items-center gap-1 mt-1">
									<i className="pi pi-exclamation-circle text-xs"></i>
									{errors.reportedBy.message}
								</span>
							)}
						</div>

						<input {...register("reportedById")} type="number" hidden />
						<input {...register("id")} type="text" hidden />

						<div className="flex-1">
							<label className="font-semibold text-gray-100 text-sm md:text-base mb-2 block">
								Kategória <span className="text-red-400">*</span>
							</label>
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
										placeholder="Válasszon..."
										className="w-full flex flex-row justify-between items-center px-3 py-2.5 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base text-gray-100 transition-all"
										panelClassName="mt-1 !w-full !rounded-lg !border !border-gray-600 !bg-[#343d4a] !shadow-xl"
										
									/>
								)}
							/>
							{errors.category && (
								<span className="text-red-400 text-xs md:text-sm flex items-center gap-1 mt-1">
									<i className="pi pi-exclamation-circle text-xs"></i>
									{errors.category.message}
								</span>
							)}
						</div>
					</div>

					{/* Státusz és Prioritás */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<label className="font-semibold text-gray-100 text-sm md:text-base mb-2 block">
								Státusz <span className="text-red-400">*</span>
							</label>
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
										placeholder="Válasszon..."
										className="w-full flex flex-row justify-between items-center px-3 py-2.5 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base text-gray-100 transition-all"
										panelClassName="mt-1 !w-full !rounded-lg !border !border-gray-600 !bg-[#343d4a] !shadow-xl"
										
									/>
								)}
							/>
							{errors.status && (
								<span className="text-red-400 text-xs md:text-sm flex items-center gap-1 mt-1">
									<i className="pi pi-exclamation-circle text-xs"></i>
									{errors.status.message}
								</span>
							)}
						</div>

						<div className="flex-1">
							<label className="font-semibold text-gray-100 text-sm md:text-base mb-2 block">
								Prioritás <span className="text-red-400">*</span>
							</label>
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
										placeholder="Válasszon..."
										className="w-full flex flex-row justify-between items-center px-3 py-2.5 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base text-gray-100 transition-all"
										panelClassName="mt-1 !w-full !rounded-lg !border !border-gray-600 !bg-[#343d4a] !shadow-xl"
										
									/>
								)}
							/>
							{errors.priority && (
								<span className="text-red-400 text-xs md:text-sm flex items-center gap-1 mt-1">
									<i className="pi pi-exclamation-circle text-xs"></i>
									{errors.priority.message}
								</span>
							)}
						</div>
					</div>

					{/* Feladat leírása */}
					<div className="flex flex-col gap-2">
						<label className="font-semibold text-gray-100 text-sm md:text-base">
							Feladat részletes leírása <span className="text-red-400">*</span>
						</label>
						<InputTextarea
							{...register("description")}
							rows={8}
							placeholder="Írja be a feladat részletes leírását..."
							className="w-full px-3 py-2.5 md:px-4 md:py-3 !bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base text-gray-100 placeholder-gray-500 transition-all resize-none"
							autoResize
						/>
						{errors.description && (
							<span className="text-red-400 text-xs md:text-sm flex items-center gap-1">
								<i className="pi pi-exclamation-circle text-xs"></i>
								{errors.description.message}
							</span>
						)}
					</div>
				</div>

				{/* Mentés gomb */}
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