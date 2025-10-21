import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import AuthService from "~/services/auth.service";
import { Toast } from 'primereact/toast';
		

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

	const handleLogin = () => {
		AuthService.login(email, password)
			.then((response) => {

				const data = response.data;
				if (data.error) {
					console.log("Login error:", data.error);
					// Hibás bejelentkezési adatok
				toast.current?.show({severity:'error', summary: 'Sikertelen bejelentkezés', detail:data.error, life: 3000});
					return;
				}
				//Sikeres login
				toast.current?.show({severity:'success', summary: 'Sikeres bejelentkezés', detail:data.message, life: 3000});
				console.log(data.token);
				
				// Ide mehet a token feldolgozása és továbbnavigálás */
			})
			.catch((error) => {
				// Hálózati, szerver vagy egyéb hiba
				toast.current?.show({severity:'error', summary: 'Sikertelen bejelentkezés', detail:error, life: 3000});
			});
	};

	const handleRegistration = () => {};

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
