import { useRef, useState } from "react";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import { FaUser } from "react-icons/fa6";
import UserEdit from "./UserEdit";
import { useAuth } from "~/utils/AuthProvider";

export interface User {
	id: string;
	name: string;
	email: string;
}

export default function UserMenu() {
	const {setToken} = useAuth();	
	const menuLeft = useRef<Menu>(null);
	const menuRight = useRef<Menu>(null);
	const toast = useRef<Toast>(null);
	const [visible, setVisible] = useState(false);
	const [user, setUser] = useState({
		id: "1",
		name: "Teszt",
		email: "teszt@teszt.hu",
	});
	const items: MenuItem[] = [
		{
			label: "Options",
			items: [
				{
					label: "My account",
					icon: "pi pi-user-edit",
					command: () => {
						setVisible(true);
					},
				},
				{
					label: "Export",
					icon: "pi pi-upload",
				},
				{
					label: "Logout",
					icon: "pi pi-sign-out",
					command: () => {
						setToken(null);
						window.location.reload();
					},
				},
			],
		},
	];

	return (
		<div className="card flex justify-content-center">
			<Toast ref={toast}></Toast>
			<Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />

			<span
				className="text-sm/6 font-semibold text-dark justify-items-center flex gap-4"
				onClick={(event) => menuRight?.current?.toggle(event)}
				aria-controls="popup_menu_right"
				aria-haspopup
			>
				UserName
				<FaUser className="my-auto" />
			</span>
			<UserEdit visible={visible} setVisible={setVisible} user={user} />
		</div>
	);
}
