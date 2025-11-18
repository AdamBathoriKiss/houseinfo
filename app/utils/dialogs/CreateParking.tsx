import { Button } from "primereact/button";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useParking from "~/hooks/useParking";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

interface ParkingData {
    id?: number;
    type: string;
    spotNumber: string;
    isOccupied: boolean;
}

interface ParkingProps {
	visible: boolean;
    setVisible: (visible: boolean) => void;
	buildingId: number;
    parking?: ParkingData;
}

export default function CreateParking({ visible, setVisible, buildingId, parking }: ParkingProps) {
	const {
		onSubmit,
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useParking({ buildingId, parking });

    const types = [
        { label: "Normál", value: "NORMAL" },
        { label: "Elektromos", value: "ELECTRIC" },
    ];

    const occupiedOptions = [
        { label: "Foglalt", value: true },
        { label: "Szabad", value: false },
    ];

    const isEditMode = !!parking?.id;

    // Inicializáljuk az értékeket szerkesztés esetén
    useEffect(() => {
        if (parking) {
            setValue("type", parking.type);
            setValue("spotNumber", parking.spotNumber);
            setValue("isOccupied", parking.isOccupied);
            if (parking.id) {
                setValue("id", parking.id);
            }
        }
    }, [parking, setValue]);

	return (
		<Dialog 
            visible={visible}
            onHide={() => setVisible(false)}
            header={isEditMode ? "Parkoló szerkesztése" : "Új parkoló létrehozása"}
			contentClassName="!bg-[#343d4a]"
			headerClassName="!bg-[#343d4a]"
			style={{ width: "450px" }}
        >
			<form onSubmit={handleSubmit(onSubmit)} className="p-4">
				<div className="flex flex-col gap-3">
					<div className="flex flex-row col-start-1 col-end-12 gap-3">
						<div className="w-1/2">
							<label  className="font-semibold text-gray-100 text-sm gap-3">Típus</label>
							<Controller
								name="type"
								control={control}
								render={({ field }) => (
									<Dropdown
										options={types}
										value={field.value}
										onChange={(e) => field.onChange(e.value)}
										className="!w-full !bg-transparent"
									/>
								)}
							/>
							{errors.type && (
								<span className="text-red-500 text-xs">{errors.type.message}</span>
							)}
						</div>
						<div className="w-1/2">
							<label  className="font-semibold text-gray-100 text-sm gap-3">Státusz</label>
							<Controller
								name="isOccupied"
								control={control}
								render={({ field }) => (
									<Dropdown
										options={occupiedOptions}
										value={field.value}
										onChange={(e) => field.onChange(e.value)}
										className="!w-full !bg-transparent"
									/>
								)}
							/>
							{errors.isOccupied && <span className="text-red-500 text-xs">{errors.isOccupied.message}</span>}
						</div>
					</div>

					<div className="flex flex-col col-start-1 col-end-12 gap-1">
						<label  className="font-semibold text-gray-100 text-sm">Parkolóhely száma/megnevezése</label>
						<InputText
							{...register("spotNumber")}
							className="!w-full !bg-transparent"
						/>
						{errors.spotNumber && (
							<span className="text-red-500 text-xs">{errors.spotNumber.message}</span>
						)}
					</div>
				</div>

				<Button
					label={isEditMode ? "Módosítás" : "Létrehozás"}
					severity="success"
					type="submit"
					className="w-full !my-3 !px-5 !py-3 !bg-transparent hover:!bg-teal-400 !text-white !font-semibold !rounded-md !shadow-md !border-1"
				/>
			</form>
		</Dialog>
	);
}