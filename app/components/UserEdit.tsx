import { Dialog } from "primereact/dialog";
import type { User } from "./UserMenu";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";

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

    const footer = () => {
        return (
            <>
                <Button
                    label="Szerkesztés"
                    className="!bg-transparent !border-1 !border-gray-500 !text-gray-50 hover:!bg-teal-500 "
                />
                <Button
                    label="Fiók törlése"
                    className="!bg-transparent !border-1 !border-gray-500 !text-gray-50 hover:!bg-red-500 "
                />
            </>
        );
    };

    return (
        <Dialog
            header="Header"
			className="!bg-[#343d4a] !w-[30vw] "
			headerClassName="!bg-[#343d4a] !text-center"
			contentClassName="!bg-[#343d4a] !text-center"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={onHide}
			footer={footer}
        >
            <InputText
                value={userEdit ? userEdit.id : ""}
                className="w-75 h-1.5 !my-3.5"
                placeholder="Azonosító"
                disabled
            />
            <InputText
                value={userEdit ? userEdit.name : ""}
                name="name"
                className="w-75 h-1.5 !my-3.5 !bg-transparent"
                placeholder="Felhasználónév"
                onChange={onChange}
            />
            <InputText
                value={userEdit ? userEdit.email : ""}
                name="email"
                className="w-75 h-1.5 !my-3.5 !bg-transparent"
                placeholder="E-mail cím"
                onChange={onChange}
            />
        </Dialog>
    );
}
