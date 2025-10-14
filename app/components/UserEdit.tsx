import { Dialog } from "primereact/dialog";
import type { User } from "./UserMenu";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

export default function UserEdit({
	visible,
	setVisible,
	user,
}: {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	user: User;
}) {
	const [id, setId] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		user && (setId(user.id), setUserName(user.name), setEmail(user.email));
	}, [user]);

	const onHide = () => {
		(setId(user.id), setUserName(user.name));
		setEmail(user.email);
		setVisible(false);
	};

	return (
		<Dialog header="Header" visible={visible} style={{ width: "50vw" }} onHide={onHide}>
			<InputText value={id} className="w-75 h-1.5 !my-3.5 !bg-transparent" placeholder="Azonosító" disabled />
			<InputText
				value={userName}
				className="w-75 h-1.5 !my-3.5 !bg-transparent"
				placeholder="Azonosító"
				onChange={(e) => setUserName(e.target.value)}
			/>
			<InputText
				value={email}
				className="w-75 h-1.5 !my-3.5 !bg-transparent"
				placeholder="Azonosító"
				onChange={(e) => setEmail(e.target.value)}
			/>
		</Dialog>
	);
}
