import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useRef,
    useEffect,
    type JSXElementConstructor,
    type ReactElement,
    type ReactNode,
    type ReactPortal,
} from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "~/utils/ToastProvider";
import { Stepper } from "primereact/stepper";

const propertyTypes = [
    { value: "apartment", label: "Társasház" },
    { value: "family_house", label: "Családi ház" },
    { value: "row_house", label: "Sorház" },
    { value: "other", label: "Egyéb" },
];

const schema = z.object({
    propertyName: z.string().min(1, "Kötelező megadni az ingatlan nevét"),
    city: z.string().min(1, "Kötelező megadni a várost"),
    address: z.string().min(1, "Kötelező megadni a címet"),
    postalCode: z.string().optional(),
    propertyType: z.enum(
        ["apartment", "family_house", "row_house", "other", ""],
        {
            message: "Kötelező kiválasztani az ingatlan típusát",
        }
    ),
    buildingYear: z
        .number("Hiányzó adat: építés éve")
        .min(1900, "Az építés éve nem lehet korábbi, mint 1900")
        .max(
            new Date().getFullYear(),
            `Az építés éve nem lehet későbbi, mint ${new Date().getFullYear()}`
        )
        .optional(),
    totalUnits: z.number().min(1, "Legalább 1 lakásnak kell lennie"),
    floors: z.number().min(1, "Legalább 1 szintnek kell lennie"),
    hasElevator: z.boolean().optional(),
    hasParking: z.boolean().optional(),
    monthlyFee: z.number().min(0, "A havi közös költség nem lehet negatív"),
    reserveFund: z
        .number()
        .min(0, "A tartalékalap nem lehet negatív")
        .optional(),
    bankAccount: z.string().min(1, "Kötelező megadni a bankszámlaszámot"),
    uploadedFiles: z.array(z.instanceof(File)).optional(),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message:
            "El kell fogadni a felhasználási feltételeket és az adatvédelmi szabályzatot",
    }),
});

type FormData = z.infer<typeof schema>;

export default function useHouseRegistration() {
    const { showSuccess, showError } = useToast();
    const stepperRef = useRef<Stepper | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        watch,
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            propertyName: "",
            city: "",
            address: "",
            postalCode: "",
            propertyType: "",
            buildingYear: undefined,
            totalUnits: 1,
            floors: 1,
            hasElevator: false,
            hasParking: false,
            monthlyFee: 0,
            reserveFund: 0,
            bankAccount: "",
            uploadedFiles: [],
            termsAccepted: false,
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
        if (isSubmitted && Object.keys(errors).length === 0) {
           showSuccess('Sikeres lakóház létrehozás')
        }
    }, [errors, isSubmitted]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
        // Itt lehet kezelni a form elküldését, pl. API hívás
    };

    return {
        onSubmit,
        propertyTypes,
        schema,
        stepperRef,
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        watch,
        setValue,
    };
}
