import { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import { FaUser } from "react-icons/fa6";

export default function UserMenu() {
    const menuLeft = useRef<Menu>(null);
    const menuRight = useRef<Menu>(null);
    const toast = useRef<Toast>(null);
    const items: MenuItem[] = [
        {
            label: "Options",
            items: [
                {
                    label: "Refresh",
                    icon: "pi pi-refresh",
                },
                {
                    label: "Export",
                    icon: "pi pi-upload",
                },
                {
                    label: "Logout",
                    icon: "pi pi-sign-out",
                    command: () => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    },
                },
            ],
        },
    ];

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <Menu
                model={items}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
            />

            <span
                className="text-sm/6 font-semibold text-dark justify-items-center flex gap-4"
                onClick={(event) => menuRight?.current?.toggle(event)}
                aria-controls="popup_menu_right"
                aria-haspopup
            >
                UserName
                <FaUser className="my-auto" />
            </span>
        </div>
    );
}
