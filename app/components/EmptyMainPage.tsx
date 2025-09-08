import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Toast } from "primereact/toast";
import { useRef, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
        .number()
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

export default function EmptyMainPage() {
    const toast = useRef<Toast>(null);
    const stepperRef = useRef<Stepper | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
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
            toast.current?.show({
                severity: "error",
                summary: "Validation Errors",
                detail: "Please fix the errors and try again.",
                life: 5000,
                sticky: false,
                content: () => (
                    <div className="flex flex-column" style={{ flex: "1" }}>
                        <div
                            className="font-medium text-sm my-3 text-900"
                            style={{ whiteSpace: "pre-wrap" }}
                        >
                            {Object.values(errors)
                                .map((error) => error?.message)
                                .filter(Boolean)
                                .join("\n")}
                        </div>
                    </div>
                )
            });
        }
    }, [errors]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
        // Itt lehet kezelni a form elküldését, pl. API hívás
    };

    return (
        <div className="flex justify-center h-full bg-gray-50 p-4">
            <Toast ref={toast} />
            <Stepper
                ref={stepperRef}
                className="card shadow-xl/30 rounded-md h-11/12 border-0.5 "
                linear
            >
                <StepperPanel header="Alapadatok">
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Üdvözöljük!
                            </h2>
                            <p className="text-gray-600">
                                Kezdjük az ingatlan alapadataival
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Ingatlan neve *
                                </label>
                                <input
                                    {...register("propertyName")}
                                    type="text"
                                    placeholder="pl. Sunshine Társasház"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.propertyName && (
                                    <span className="text-red-500 text-sm">
                                        {errors.propertyName.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Város *
                                </label>
                                <input
                                    {...register("city")}
                                    type="text"
                                    placeholder="pl. Budapest"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.city && (
                                    <span className="text-red-500 text-sm">
                                        {errors.city.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Cím *
                                </label>
                                <input
                                    {...register("address")}
                                    type="text"
                                    placeholder="pl. Fő utca 123."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.address && (
                                    <span className="text-red-500 text-sm">
                                        {errors.address.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Irányítószám
                                </label>
                                <input
                                    {...register("postalCode")}
                                    type="text"
                                    placeholder="pl. 1234"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex pt-4 justify-end">
                        <Button
                            label="Next"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            onClick={() => stepperRef.current?.nextCallback()}
                        />
                    </div>
                </StepperPanel>

                <StepperPanel header="Ingatlan részletei">
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Ingatlan részletei
                            </h2>
                            <p className="text-gray-600">
                                Adja meg az épület jellemzőit
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Ingatlan típusa *
                                </label>
                                <select
                                    {...register("propertyType")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Válasszon típust</option>
                                    {propertyTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.propertyType && (
                                    <span className="text-red-500 text-sm">
                                        {errors.propertyType.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Építés éve
                                </label>
                                <input
                                    {...register("buildingYear", {
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    placeholder="pl. 1985"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="1900"
                                    max="2024"
                                />
                                {errors.buildingYear && (
                                    <span className="text-red-500 text-sm">
                                        {errors.buildingYear.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Lakások száma *
                                </label>
                                <input
                                    {...register("totalUnits", {
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="1"
                                    max="1000"
                                />
                                {errors.totalUnits && (
                                    <span className="text-red-500 text-sm">
                                        {errors.totalUnits.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Szintek száma *
                                </label>
                                <input
                                    {...register("floors", {
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="1"
                                    max="50"
                                />
                                {errors.floors && (
                                    <span className="text-red-500 text-sm">
                                        {errors.floors.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center">
                                <input
                                    {...register("hasElevator")}
                                    type="checkbox"
                                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-gray-700">Van lift</span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    {...register("hasParking")}
                                    type="checkbox"
                                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-gray-700">Van parkoló</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex pt-4 justify-between">
                        <Button
                            label="Back"
                            severity="secondary"
                            icon="pi pi-arrow-left"
                            onClick={() => stepperRef.current?.prevCallback()}
                        />
                        <Button
                            label="Next"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            onClick={() => stepperRef.current?.nextCallback()}
                        />
                    </div>
                </StepperPanel>

                <StepperPanel header="Pénzügyi információk">
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Pénzügyi információk
                            </h2>
                            <p className="text-gray-600">
                                A közös költség és bankszámla adatai
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Havi közös költség (Ft/m²) *
                                </label>
                                <input
                                    {...register("monthlyFee", {
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    placeholder="pl. 450"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                    max="10000"
                                />
                                {errors.monthlyFee && (
                                    <span className="text-red-500 text-sm">
                                        {errors.monthlyFee.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-700">
                                    Tartalékalap (Ft)
                                </label>
                                <input
                                    {...register("reserveFund", {
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    placeholder="pl. 2500000"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                                {errors.reserveFund && (
                                    <span className="text-red-500 text-sm">
                                        {errors.reserveFund.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="font-semibold text-gray-700">
                                    Bankszámlaszám *
                                </label>
                                <input
                                    {...register("bankAccount")}
                                    type="text"
                                    placeholder="pl. 12345678-12345678-12345678"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.bankAccount && (
                                    <span className="text-red-500 text-sm">
                                        {errors.bankAccount.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex">
                                <div className="text-blue-600 mr-3 mt-1">ℹ️</div>
                                <div>
                                    <p className="text-sm text-blue-800">
                                        <strong>Tipp:</strong> A közös költség összegét
                                        később módosíthatja, és lakásonként eltérő
                                        összegeket is beállíthat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex pt-4 justify-between">
                        <Button
                            label="Back"
                            severity="secondary"
                            icon="pi pi-arrow-left"
                            onClick={() => stepperRef.current?.prevCallback()}
                        />
                        <Button
                            label="Next"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            onClick={() => stepperRef.current?.nextCallback()}
                        />
                    </div>
                </StepperPanel>

                <StepperPanel header="Összefoglaló és befejezés">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-8">
                            <div className="text-6xl text-green-500 mb-4">✅</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Majdnem kész!
                            </h2>
                            <p className="text-gray-600">
                                Ellenőrizze az adatokat és fejezze be a regisztrációt
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                Összefoglaló
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">
                                        Alapadatok
                                    </h4>
                                    <p>
                                        <strong>Név:</strong> {watch("propertyName")}
                                    </p>
                                    <p>
                                        <strong>Cím:</strong> {watch("address")}{" "}
                                        {watch("city")}
                                    </p>
                                    <p>
                                        <strong>Típus:</strong> {watch("propertyType")}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">
                                        Részletek
                                    </h4>
                                    <p>
                                        <strong>Lakások:</strong> {watch("totalUnits")} db
                                    </p>
                                    <p>
                                        <strong>Szintek:</strong> {watch("floors")}
                                    </p>
                                    <p>
                                        <strong>Havi költség:</strong>{" "}
                                        {watch("monthlyFee")} Ft/m²
                                    </p>
                                    <p>
                                        <strong>Bankszálaszám:</strong>{" "}
                                        {watch("bankAccount")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <label className="flex items-start">
                            <input
                                {...register("termsAccepted")}
                                type="checkbox"
                                className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">
                                Elfogadom a{" "}
                                <a
                                    href="#"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    felhasználási feltételeket
                                </a>{" "}
                                és az{" "}
                                <a
                                    href="#"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    adatvédelmi szabályzatot
                                </a>
                            </span>
                        </label>
                        {errors.termsAccepted && (
                            <span className="text-red-500 text-sm">
                                {errors.termsAccepted.message}
                            </span>
                        )}

                        <div className="flex pt-4 justify-between">
                            <Button
                                label="Back"
                                severity="secondary"
                                icon="pi pi-arrow-left"
                                onClick={() => stepperRef.current?.prevCallback()}
                            />
                            <Button
                                label="Finish"
                                severity="success"
                                icon="pi pi-check"
                                type="submit"
                            />
                        </div>
                    </form>
                </StepperPanel>
            </Stepper>
        </div>
    );
}