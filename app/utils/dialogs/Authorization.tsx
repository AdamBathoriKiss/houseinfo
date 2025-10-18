import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function Authorization({
    authDialog,
    setAuthDialog,
    type,
}: {
    authDialog: boolean;
    setAuthDialog: (value: boolean) => void;
    type: string
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const header = type === "login" ? "Bejelentkezés" : "Regisztráció"

    const handleLogin = () => {
        alert("Login")
    }

    const handleRegistration = () => {
        alert("Registration")
    }

    const handleFunction = type === "login" ? handleLogin : handleRegistration


    return (
        <Dialog
            header={header}
            visible={authDialog}
            headerClassName="!bg-[#777BF1]"
            contentClassName="w-[25vw] !text-center !bg-[linear-gradient(180deg,#777BF1_0%,#343D4A_140%)]"
            onHide={() => setAuthDialog(false)}
        >
            <InputText
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-75 h-1.5 !my-3.5 !bg-transparent"
                placeholder="Felhasználónév"
            />
            <InputText
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-75 h-1.5 !my-3.5 !bg-transparent"
                placeholder="Jelszó"
            />

            <div className="flex justify-center space-x-4 mt-4">
                <Button
                    className="!bg-lime-50 !text-purple-900 !border-0 !px-6 !py-3 !mt-6 !text-md !font-semibold hover:!bg-lime-100"
                    onClick={handleFunction}
                >
                    {header}
                </Button>
            </div>

            <hr className="my-10" />
        </Dialog>
    );
}
