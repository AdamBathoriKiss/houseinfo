import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useMaintences from "~/hooks/useMaintences";

interface CurrentMaintence {
	title: string;
	description: string;
	responsible: string;
	status: string;
	priority: string;
	buildingId: number;
	reportedById: number;
}

export default function Maintences({
	title,
	description,
	responsible,
	status,
	priority,
	buildingId,
	reportedById,
}: CurrentMaintence) {
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
		if (title) setValue("title", title);
		if (description) setValue("description", description);
		if (responsible) setValue("responsible", responsible);
		if (reportedById) setValue("reportedById", reportedById);
		if (status) setValue("status", status);
		if (priority) setValue("priority", priority);
	}, [title, description, responsible, reportedById, status, priority, setValue]);

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
							<label className="font-semibold text-gray-100 text-sm">Felelős</label>
							<input
								{...register("responsible")}
								type="text"
								placeholder="pl. Fő utca 123."
								className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							/>
							{errors.responsible && (
								<span className="text-red-500 text-xs">{errors.responsible.message}</span>
							)}
						</div>
						<div>
							<input
								{...register("reportedById")}
								type="number"
								hidden
								placeholder="pl. Fő utca 123."
								className="!w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							/>
						</div>
						<div className="w-1/2">
							<label className="font-semibold text-gray-100 text-sm">Státusz</label>
							<Controller
								name="status"
								control={control}
								render={({ field }) => (
									<Dropdown
										{...field}
										unstyled
										options={[
											{ name: "Új", value: "NEW" },
											{ name: "Folyamatban", value: "IN_PROGRESS" },
											{ name: "Várakozás", value: "WAITING" },
											{ name: "Megoldva", value: "RESOLVED" },
											{ name: "Lezárt", value: "CLOSED" },
										]}
										optionLabel="name"
										optionValue="value"
										placeholder="Válassz státuszt"
										className="!w-full flex flex-row justify-between px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
										panelClassName="!w-40 h-max-fit px-3 !rounded-b-none !border-1 !bg-[#343d4a] !text-start !text-sm/8 items-center"
									/>
								)}
							/>
							{errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
						</div>
						<div className="w-1/2">
							<label className="font-semibold text-gray-100 text-sm">Priority</label>
							<Controller
								name="priority"
								control={control}
								render={({ field }) => (
									<Dropdown
										{...field}
										unstyled
										options={[
											{ name: "Alacsony", value: "LOW" },
											{ name: "Normál", value: "NORMAL" },
											{ name: "Magas", value: "HIGH" },
											{ name: "Sürgős", value: "URGENT" },
										]}
										optionLabel="name"
										optionValue="value"
										placeholder="Válassz prioritást"
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
