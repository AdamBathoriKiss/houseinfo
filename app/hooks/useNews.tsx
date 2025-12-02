import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useRef,
	useEffect,
	type JSXElementConstructor,
	type ReactElement,
	type ReactNode,
	type ReactPortal,
	useState,
} from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Stepper } from "primereact/stepper";
import { useToast } from "~/utils/ToastProvider";
import CommonService from "~/services/common.service";
import { useAuth } from "~/utils/AuthProvider";

const schema = z.object({
	id: z
		.union([z.string(), z.number()]) // elfogad stringet is vagy számot is
		.optional()
		.transform((val) => {
			if (val === "" || val === undefined) return undefined;
			return typeof val === "string" ? Number(val) : val;
		}),

	title: z.string().min(3, "Kötelező megadni a hír címét"),
	content: z.string().min(1, "Kötelező megadni a hír tartalmát"),
	author: z.string().min(3, "Kötelező megadni a hír létrehozóját"),
	authorId: z.number().optional(),
	date: z.string().min(1, "Kötelező megadni a hír dátumát"),
	type: z.enum(["create", "update"]),
});

type FormData = z.infer<typeof schema>;

export default function useNews({ buildingId }: { buildingId: number }) {
	const { user } = useAuth();
	const { showSuccess, showError } = useToast();
	const [apiError, setApiError] = useState(null);
	const stepperRef = useRef<Stepper | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		watch,
		setValue,
		reset,
	} = useForm<FormData>({
		defaultValues: {
			title: "",
			content: "",
			author: "",
			date: "",
			type: "create",
		},
		resolver: zodResolver(schema) as any,
	});

	// Toast üzenet megjelenítése hibák esetén
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
							| Promise<any>
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
	}, [errors, isSubmitted]);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log("📤 Submitted data:", data);

		const body = {
			...data,
			buildingId: buildingId,
            authorId: data.authorId ?? user?.userId
		};

		const action =
			data.type === "create"
				? CommonService.create("announcements", buildingId, body)
				: data.id && data.type === "update"
					? CommonService.update("announcements", data.id, body)
					: Promise.reject(new Error("Érvénytelen művelet: hiányzik az ID vagy a típus"));

		action
			.then((response) => {
				if (response) {
					showSuccess(data.type === "create" ? "Sikeres hír létrehozás" : "Sikeres hír módosítás");
					reset(); // reseteld a formot siker után
					setTimeout(() => window.location.reload(), 1000);
				} else {
					showError(response?.error || "Ismeretlen hiba történt");
				}
			})
			.catch((error) => {
				showError(error.message || "Hiba történt a művelet közben");
			});
	};

	return {
		onSubmit,
		schema,
		stepperRef,
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		watch,
		setValue,
	};
}
