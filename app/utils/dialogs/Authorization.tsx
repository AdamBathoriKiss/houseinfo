import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import AuthService from "~/services/auth.service";
import { Toast } from 'primereact/toast';
import { useAuth } from "~/utils/AuthProvider";
import { useNavigate } from "react-router";

export default function Authorization({
    visible,
    setVisible,
    type,
}: {
    visible: boolean;
    setVisible: (value: boolean) => void;
    type: string;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const title = type === "login" ? "Bejelentkezés" : "Regisztráció";
    const toast = useRef<Toast | null>(null);
    const { setToken, setUser } = useAuth(); // ✅ Context használata
	const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await AuthService.login(email, password);

            if (data.error) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Sikertelen bejelentkezés',
                    detail: data.error,
                    life: 3000
                });
                return;
            }

            // ✅ Token és user beállítása
            setToken(data.accessToken);
            setUser(data.user);
			
            toast.current?.show({
                severity: 'success',
                summary: 'Sikeres bejelentkezés',
                detail: `Üdvözlünk, ${data.user.email}!`,
                life: 3000
            });

            setVisible(false); // ✅ Dialog bezárása
			navigate("/"); // ✅ Átirányítás a főoldalra
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Hiba',
                detail: error.response?.data?.error || "Ismeretlen hiba",
                life: 3000
            });
        }
    };

    const handleRegistration = () => {
        // TODO: Implementáld
    };

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                header={title}
                visible={visible}
                headerClassName="!bg-[#777BF1]"
                contentClassName="w-[30vw] !text-center !bg-[linear-gradient(180deg,#777BF1_0%,#343D4A_140%)]"
                onHide={() => setVisible(false)}
            >
                <InputText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-75 h-1.5 !my-3.5 !bg-transparent"
                    placeholder="Email"
                    type="email"
                />
                <InputText
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-75 h-1.5 !my-3.5 !bg-transparent"
                    placeholder="Jelszó"
                    type="password"
                />

                <div className="flex justify-center space-x-4 mt-4">
                    <Button
                        className="!bg-lime-50 !text-purple-900 !border-0 !px-6 !py-3 !mt-6 !text-md !font-semibold hover:!bg-lime-100"
                        onClick={type === "login" ? handleLogin : handleRegistration}
                    >
                        {title}
                    </Button>
                </div>

                <hr className="my-10" />
            </Dialog>
        </>
    );
}