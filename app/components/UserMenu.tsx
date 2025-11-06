import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { FaUser } from "react-icons/fa6";
import UserEdit from "./UserEdit";
import { useAuth } from "~/utils/AuthProvider";
import AuthService from "~/services/auth.service";

export interface User {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string
}

export default function UserMenu() {
	const { token } = useAuth();
	const menuRight = useRef<Menu>(null);
	const [visible, setVisible] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	const items: MenuItem[] = [
		{
			label: "Menü",
			items: [
				{
					label: "Fiókom",
					icon: "pi pi-user-edit",
					command: () => {
						setVisible(true);
					},
				},
				{
					label: "Épületek",
					icon: "pi pi-building",
				},
				{
					label: "Fiók törlése",
					icon: "pi pi-user-minus",
				},
				{
					label: "Kijelentkezés",
					icon: "pi pi-sign-out",
					command: () => {
						AuthService.logout();
						window.location.reload();
					},
				},
			],
		},
	];

	useEffect(() => {
		if (token && user === null) {
			setUser(jwtDecode(token));
		}
	}, [token]);

	return (
		<div className="card flex justify-content-center">
			<Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />

			<span
				className="text-sm/6 font-semibold text-dark justify-items-center flex gap-4"
				onClick={(event) => menuRight?.current?.toggle(event)}
				aria-controls="popup_menu_right"
				aria-haspopup
			>
				{user?.firstName}
				<FaUser className="my-auto" />
			</span>
			{user && <UserEdit visible={visible} setVisible={setVisible} user={user} />}
		</div>
	);
}
