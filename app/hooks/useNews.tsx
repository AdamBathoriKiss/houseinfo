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

// ✅ JAVÍTOTT SCHEMA - type mező hozzáadva
const schema = z.object({
    // Opcionális number
    id: z.preprocess(
        (val) => {
            if (val === "" || val === null || val === undefined) {
                return undefined;
            }
            const num = Number(val);
            return isNaN(num) ? undefined : num;
        },
        z.number().optional()
    ),
    title: z.string().min(3, "Kötelező megadni a hír címét"),
    content: z.string().min(1, "Kötelező megadni a hír tartalmát"),
    author: z.string().min(3, "Kötelező megadni a hír létrehozóját"),
    authorId: z.preprocess(
        (val) => {
            if (val === "" || val === null || val === undefined) {
                return undefined;
            }
            const num = Number(val);
            return isNaN(num) ? undefined : num;
        },
        z.number().min(1, "Kötelező a felhasználó Id-ját megadni")
    ),
    date: z.string().min(1, "Kötelező megadni a hír dátumát"),
    // ✅ ÚJ: type mező (create vagy update)
    type: z.string().optional().default(""),
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
            id: undefined,
            authorId: undefined,
            type: "create", // ✅ Default: create mód
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
    }, [errors, isSubmitted]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("📤 Submitted data:", data);
        
        const body = {
            ...data,
            buildingId,
        };

        if (data.type === "create") {
            const { id, type, ...createBody } = body;
            
            CommonService.create("announcements", buildingId, createBody)
                .then((response) => {
                    if (response) {
                        showSuccess("Sikeres hír létrehozás");
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        showError(response?.error || "Ismeretlen hiba történt");
                    }
                })
                .catch((error) => {
                    showError(error.message || "Hiba történt a létrehozás közben");
                });
        } else if (data.id && data.type ==="update") {
            // UPDATE ág
            console.log("🔄 UPDATE mode, ID:", data.id);
            
            const { type, ...updateBody } = body;
            
            CommonService.update("announcements", data.id, updateBody)
                .then((response) => {
                    if (response) {
                        showSuccess("Sikeres hír módosítás");
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        showError(response?.error || "Ismeretlen hiba történt");
                    }
                })
                .catch((error) => {
                    console.error("❌ Update error:", error);
                    showError(error.message || "Hiba történt a módosítás közben");
                });
        } else {
            // Hiba: nincs se type="create", se id
            console.error("❌ Invalid state: no type or id");
            showError("Érvénytelen művelet: hiányzik az ID vagy a típus");
        }
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