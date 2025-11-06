import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "~/utils/ToastProvider";
import { Stepper } from "primereact/stepper";


const schema = z.object({
    title: z.string().min(3, "Kötelező megadni a feladat megnevezését"),
    description: z.string().min(1, "Kötelező megadni a feladat részletes leírását"),
    responsible: z.string().min(3, "Kötelező megadni a feladat felelősét"),
    status: z.string().min(1, "Kötelező megadni a feladat státuszát"),
});

type FormData = z.infer<typeof schema>;

export default function useMaintences() {
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
            showError(
                      'Hiba történt a művelet közben',
                      undefined, // detail paraméter (nem használod, ezért undefined)
                      (props: { message: { summary: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; }) => ( // content paraméter
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
          showSuccess('Sikeres feladat létrehozás')
        }
    }, [errors, isSubmitted]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
        // Itt lehet kezelni a form elküldését, pl. API hívás
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
