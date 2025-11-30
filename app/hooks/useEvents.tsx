import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import CommonService from "~/services/common.service";
import { useToast } from "~/utils/ToastProvider";
import type { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";

// ✅ Validation schema
const eventSchema = z
	.object({
		id: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().optional()),
		title: z.string().min(3, "Kötelező megadni az esemény címét (min. 3 karakter)"),
		description: z.string().min(1, "Kötelező megadni az esemény leírását"),
		startTime: z.date({
			error: "Kötelező megadni az esemény kezdeti időpontját",
		}),
		endTime: z.date({
			error: "Kötelező megadni az esemény befejezési időpontját",
		}),
		buildingId: z.number().min(1, "Az épület azonosító kötelező"),
		organizerId: z.number().min(1, "Kötelező a felhasználó azonosítóját megadni"),
	})
	.refine((data) => data.endTime >= data.startTime, {
		message: "A befejező dátum nem lehet korábbi, mint a kezdő dátum",
		path: ["endTime"],
	});

type EventFormData = z.infer<typeof eventSchema>;

interface UseEventsProps {
	buildingId: number;
	onSuccess?: () => void; // ✅ ÚJ callback
}

export default function useEvents({ buildingId, onSuccess }: UseEventsProps) {
	const { showSuccess, showError } = useToast();
	const [apiError, setApiError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		setValue,
		control,
		watch,
		reset,
	} = useForm<EventFormData>({
		resolver: zodResolver(eventSchema) as any,
		defaultValues: {
			buildingId,
			title: "",
			description: "",
			startTime: new Date(),
		},
	});

	// ✅ Toast üzenet megjelenítése hibák esetén
	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			showError(
				"Hiba történt a művelet közben",
				undefined,
				(props: {
					message: {
						summary:
							| string
							| number
							| bigint
							| boolean
							| ReactElement<unknown, string | JSXElementConstructor<any>>
							| Iterable<ReactNode>
							| ReactPortal
							| Promise<
									| string
									| number
									| bigint
									| boolean
									| ReactPortal
									| ReactElement<unknown, string | JSXElementConstructor<any>>
									| Iterable<ReactNode>
									| null
									| undefined
							  >
							| null
							| undefined;
					};
				}) => (
					<div className="flex flex-column" style={{ flex: "1" }}>
						<div className="font-medium text-sm my-3 text-900" style={{ whiteSpace: "pre-wrap" }}>
							{props.message.summary} <br />
							{Object.values(errors)
								.map((error) => error?.message)
								.filter(Boolean)
								.join("\n")}
						</div>
					</div>
				)
			);
		}
	}, [errors, isSubmitted, showError]);

	const onSubmit = async (data: EventFormData) => {
		try {
			// ✅ Reset API error
			setApiError(null);

			// ✅ Dátumok ISO formátumra alakítása
			const payload = {
				title: data.title,
				description: data.description,
				startTime: data.startTime.toISOString(),
				endTime: data.endTime.toISOString(),
				buildingId: data.buildingId,
				organizerId: data.organizerId,
			};

			if (data.id) {
				// ✅ UPDATE
				const response = await CommonService.update("events", data.id, payload);

				if (response) {
					showSuccess("Sikeres esemény szerkesztés");
					reset(); // Form reset
					window.location.reload();

					// ✅ Sikeres mentés callback
					if (onSuccess) {
						onSuccess();
					window.location.reload();
					}
				} else {
					showError("Hiba történt az esemény frissítése során");
				}
			} else {
				// ✅ CREATE - buildingId a route-ban!
				const response = await CommonService.create("events", buildingId, payload);

				if (response) {
					showSuccess("Sikeres esemény létrehozás");
					reset(); // Form reset
					window.location.reload();
					// ✅ Sikeres mentés callback
					if (onSuccess) {
						onSuccess();
					window.location.reload();
					}
				} else {
					showError("Hiba történt az esemény létrehozása során");
				}
			}
		} catch (error: any) {
			console.error("Event save error:", error);
			setApiError(error.message);
			showError(error?.response?.data?.message || error.message || "Hiba történt az esemény mentése során");
		}
	};

	return {
		onSubmit,
		schema: eventSchema,
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		setValue,
		control,
		watch,
		reset,
	};
}
