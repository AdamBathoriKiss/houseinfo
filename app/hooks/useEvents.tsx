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
    id: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().optional()
    ),
    title: z.string().min(3, "Kötelező megadni az esemény címét"),
    description: z.string().min(1, "Kötelező megadni az esemény leírását"),
    startTime: z.date().min(1, "Kötelező megadni az esemény kezdeti időpontját"),
    endTime: z.date().optional(),
    organizerId: z.number().min(1, "Kötelező a felhasználó Id-ját megadni"),
});

type FormData = z.infer<typeof schema>;

export default function useEvents({ buildingId }: { buildingId: number }) {
    const { showSuccess, showError } = useToast();
    const [apiError, setApiError] = useState(null);
    const stepperRef = useRef<Stepper | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        watch,
        setValue,
        control
    } = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
            startTime: new Date(),
        },
        resolver: zodResolver(schema) as any,
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
                                | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | ReactPortal
                                | Promise<
                                      | string
                                      | number
                                      | bigint
                                      | boolean
                                      | ReactPortal
                                      | ReactElement<
                                            unknown,
                                            string | JSXElementConstructor<any>
                                        >
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
                        <div
                            className="font-medium text-sm my-3 text-900"
                            style={{ whiteSpace: "pre-wrap" }}
                        >
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
        if (data.id) {
            CommonService.update("announcements", data.id, body)
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
        } else {
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
