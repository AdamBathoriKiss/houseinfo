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

const schema = z.object({
	title: z.string().min(3, "Kötelező megadni a hír címét"),
	content: z.string().min(1, "Kötelező megadni a hír tartalmát"),
	author: z.string().min(3, "Kötelező megadni a hír létrehozóját"),
	authorId: z.number().min(1, "Kötelező a felhasználó Id-ját megadni"),
	date: z.string().min(1, "Kötelező megadni a hír dátumát"),
});

type FormData = z.infer<typeof schema>;

export default function useNews({ buildingId }: { buildingId: number }) {
	const { showSuccess, showError } = useToast();
	const [apiError, setApiError] = useState(null);
	const stepperRef = useRef<Stepper | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		watch,
		setValue,
	} = useForm<FormData>({
		defaultValues: {
			title: "",
			content: "",
			author: "",
			date: "",
		},
		resolver: zodResolver(schema),
	});

	// Toast üzenet megjelenítése hibák esetén
	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			showError(
				"Hiba történt a művelet közben",
				undefined, // detail paraméter (nem használod, ezért undefined)
				(
					props: {
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
					} // content paraméter
				) => (
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
		/*if (isSubmitted && Object.keys(errors).length === 0 && apiError === null) {
			showSuccess("Sikeres hír létrehozás");
		}*/
	}, [errors, isSubmitted]);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const body = {
			...data,
			buildingId,
		};
		//console.log("Form Data:", data);
		// Itt lehet kezelni a form elküldését, pl. API hívás
		CommonService.create("announcements", buildingId, body)
			.then((response) => {
				if (response) {
					showSuccess("Sikeres hír létrehozás");
					window.location.reload();
				} else {
					showError(response.error);
				}
			})
			.catch((error) => {
				showError(error.message);
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
