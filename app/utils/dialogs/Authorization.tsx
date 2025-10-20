import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function Authorization({
	visible,
	setVisible,
	type,
}: {
	visible: boolean;
	setVisible: (value: boolean) => void;
	type: string;
}) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const title = type === "login" ? "Bejelentkezés" : "Regisztráció";

	const handleLogin = () => {};

	const handleRegistration = () => {};

	return (
		<Dialog
			header={title}
			visible={visible}
			headerClassName="!bg-[#777BF1]"
			contentClassName="w-[30vw] !text-center !bg-[linear-gradient(180deg,#777BF1_0%,#343D4A_140%)]"
			onHide={() => setVisible(false)}
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
					onClick={type === "login" ? handleLogin : handleRegistration}
				>
					{title}
				</Button>
			</div>

			<hr className="my-10" />
		</Dialog>
	);
}
