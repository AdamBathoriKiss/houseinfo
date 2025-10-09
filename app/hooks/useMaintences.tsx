import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { Stepper } from "primereact/stepper";

const schema = z.object({
    title: z.string().min(3, "Kötelező megadni a feladat megnevezését"),
    description: z.string().min(1, "Kötelező megadni a feladat részletes leírását"),
    responsible: z.string().min(3, "Kötelező megadni a feladat felelősét"),
    status: z.string().min(1, "Kötelező megadni a feladat státuszát"),
});

type FormData = z.infer<typeof schema>;

export default function useMaintences() {
    const toast = useRef<Toast>(null);
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
            description: "",
            responsible: "",
            status: "",
        },
        resolver: zodResolver(schema),
    });

    // Toast üzenet megjelenítése hibák esetén
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast.current?.show({
                severity: "error",
                summary: <b>Hiba történt a művelet közben!</b>,
                detail: "Please fix the errors and try again.",
                life: 5000,
                sticky: false,
                content: (props) => (
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
                ),
            });
        }
        if (isSubmitted && Object.keys(errors).length === 0) {
            toast.current?.show({
                severity: "success",
                summary: "Sikeres feladat szerkesztés!",
                life: 5000,
                sticky: false,
                content: (props) => (
                    <div className="flex flex-column" style={{ flex: "1" }}>
                        <div
                            className="font-medium text-sm my-3 text-900"
                            style={{ whiteSpace: "pre-wrap" }}
                        >
                            {props.message.summary}
                        </div>
                    </div>
                ),
            });
        }
    }, [errors, isSubmitted]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
        // Itt lehet kezelni a form elküldését, pl. API hívás
    };

    return {
        onSubmit,
        toast,
        schema,
        stepperRef,
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        watch,
        setValue,
    };
}
