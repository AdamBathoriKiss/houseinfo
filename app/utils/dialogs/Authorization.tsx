import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import AuthService from "~/services/auth.service";
import { useAuth } from "~/utils/AuthProvider";
import { useNavigate } from "react-router";
import { useToast } from "../ToastProvider";

export default function Authorization({
    visible,
    setVisible,
    type,
}: {
    visible: boolean;
    setVisible: (value: boolean) => void;
    type: string;
}) {
    const [email, setEmail] = useState("demo@houseinfo.hu");
    const [password, setPassword] = useState("hashed-password-1234");
    const title = type === "login" ? "Bejelentkezés" : "Regisztráció";
    const { showSuccess, showError } = useToast();
    const { setToken, setUser } = useAuth(); // ✅ Context használata
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await AuthService.login(email, password);

            if (data.error) {
                showError("Sikertelen bejelentkezés", data.error);
                return;
            }

            // ✅ Token és user beállítása
            setToken(data.accessToken);
            setUser(data.user);

            showSuccess(
                "Sikeres bejelentkezés",
                `Üdvözlünk, ${data.user.email}!`
            );

            setVisible(false); // ✅ Dialog bezárása
            navigate("/"); // ✅ Átirányítás a főoldalra
        } catch (error: any) {
            showError(
                "Sikertelen bejelentkezés",
                error.response?.data?.error || "Ismeretlen hiba"
            );
        }
    };

    const handleRegistration = async () => {
        try {
            const data = await AuthService.registration(email, password);

            if (data.error) {
                showError("Sikertelen regisztráció", data.error);
                return;
            }

            showSuccess(
                "Sikeres regisztráció",
                `Üdvözlünk, ${data.user.email}!`
            );
            setVisible(false); // ✅ Dialog bezárása
            navigate("/"); // ✅ Átirányítás a főoldalra
        } catch (error: any) {
            showError(
                "Sikertelen regisztráció",
                error.response?.data?.error || "Ismeretlen hiba"
            );
        }
    };

    return (
        <>
            <Dialog
                header={title}
                visible={visible}
                headerClassName="!bg-[#777BF1]"
                contentClassName="flex flex-col !text-center !bg-[linear-gradient(180deg,#777BF1_0%,#343D4A_140%)]"
                onHide={() => setVisible(false)}
            >
                {/* Ideiglenes DEMO user beléptetés*/}
                <InputText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-75 h-1.5 !my-3.5 !bg-transparent"
                    placeholder="Email"
                    disabled={true}
                    type="email"
                />
                <InputText
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-75 h-1.5 !my-3.5 !bg-transparent"
                    placeholder="Jelszó"
                    disabled={true}
                    type="password"
                />

                <div className="flex justify-center space-x-4 mt-4">
                    <Button
                        className="!bg-lime-50 !text-purple-900 !border-0 !px-6 !py-3 !mt-6 !text-md !font-semibold hover:!bg-lime-100"
                        onClick={
                            type === "login" ? handleLogin : handleRegistration
                        }
                    >
                        {title}
                    </Button>
                </div>

            </Dialog>
        </>
    );
}
