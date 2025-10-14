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
    const [userEdit, setUserEdit] = useState<User | null>(null);

    useEffect(() => {
        if (visible && user) {
            setUserEdit({ ...user });
        }
    }, [user, visible]);

    const onChange = (e: any) => {
        if (!userEdit) return;

        setUserEdit({
            ...userEdit,
            [e.target.name]: e.target.value,
        });
    };

    const onHide = () => {
        setUserEdit(null);
        setVisible(false);
    };

    return (
        <Dialog
            header="Header"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={onHide}
        >
            <InputText
                value={userEdit ? userEdit.id : ""}
                className="w-75 h-1.5 !my-3.5 !bg-transparent"
                placeholder="Azonosító"
                disabled
            />
            <InputText
                value={userEdit ? userEdit.name : ""}
                name="name"
                className="w-75 h-1.5 !my-3.5 !bg-transparent"
                placeholder="Azonosító"
                onChange={onChange}
            />
            <InputText
                value={userEdit ? userEdit.email : ""}
                name="email"
                className="w-75 h-1.5 !my-3.5 !bg-transparent"
                placeholder="Azonosító"
                onChange={onChange}
            />
        </Dialog>
    );
}
