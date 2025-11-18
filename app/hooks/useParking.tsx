import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useRef,
	useEffect,
	useState,
} from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Stepper } from "primereact/stepper";
import { useToast } from "~/utils/ToastProvider";
import CommonService from "~/services/common.service";

const schema = z.object({
	id: z.number().optional(),
	type: z.string().min(1, "Kötelező megadni parkolóhely típusát."),
	spotNumber: z.string().min(1, "Kötelező megadni parkolóhely számát."),
	isOccupied: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface ParkingData {
    id?: number;
    type: string;
    spotNumber: string;
    isOccupied: boolean;
}

export default function useParking({ buildingId, parking }: { buildingId: number; parking?: ParkingData }) {
	const { showSuccess, showError } = useToast();
	const [apiError, setApiError] = useState<string | null>(null);
	const stepperRef = useRef<Stepper | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		watch,
		setValue,
		control,
	} = useForm<FormData>({
		defaultValues: {
			id: parking?.id,
			type: parking?.type || "NORMAL",
			spotNumber: parking?.spotNumber || "",
			isOccupied: parking?.isOccupied ?? false,
		},
		resolver: zodResolver(schema),
	});

	// Toast üzenet megjelenítése hibák esetén
	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			const errorMessages = Object.values(errors)
				.map((error) => error?.message)
				.filter(Boolean)
				.join("\n");
			
			showError("Hiba történt a művelet közben", errorMessages);
		}
	}, [errors, isSubmitted, showError]);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const body = {
			type: data.type,
			spotNumber: data.spotNumber,
			isOccupied: data.isOccupied,
			buildingId,
		};

		if (data.id) {
			// Szerkesztés
			CommonService.update("parkings", data.id, body)
				.then((response) => {
					if (response) {
						showSuccess("Sikeres parkoló szerkesztés");
						window.location.reload();
					} else {
						showError("Hiba történt a szerkesztés során");
					}
				})
				.catch((error) => {
					showError(error.message || "Ismeretlen hiba történt");
				});
		} else {
			// Létrehozás
			CommonService.create("parkings",buildingId, body)
				.then((response) => {
					if (response) {
						showSuccess("Sikeres parkoló létrehozás");
						window.location.reload();
					} else {
						showError("Hiba történt a létrehozás során");
					}
				})
				.catch((error) => {
					showError(error.message || "Ismeretlen hiba történt");
				});
		}
	};

	return {
		onSubmit,
		schema,
		stepperRef,
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitted },
		watch,
		setValue,
	};
}