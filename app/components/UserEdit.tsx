import { Dialog } from "primereact/dialog";
import type { User } from "./UserMenu";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

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
    const userRoles = [
        { name: "Adminisztrátor", code: "ADMIN" },
        { name: "Közösképviselő", code: "MANAGER" },
        { name: "Lakó", code: "RESIDENT" },
    ];
    const [userRole, setUserRole] = useState<{ name: string; code: string } | null>(null);

    useEffect(() => {
        if (visible && user) {
            setUserEdit({ ...user });
            setUserRole(userRoles.find((role) => role.code === user.role) || null)
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

    const onSave = () => {
        console.log(userEdit);
    };

    const footer = () => {
        return (
            <>
                <Button
                    label="Mentés"
                    className="!bg-transparent !border-1 !border-gray-500 !text-gray-50 hover:!bg-teal-500"
                    onClick={onSave}
                />
                <Button
                    label="Mégse"
                    className="!bg-transparent !border-1 !border-gray-500 !text-gray-50 hover:!bg-red-500"
                    onClick={onHide}
                />
            </>
        );
    };

    return (
        <Dialog
            header={` # ${user.userId} - ${user.lastName} ${user.firstName}`}
            className="!bg-[#343d4a] !w-[25vw] "
            headerClassName="!bg-[#343d4a] !text-center"
            contentClassName="!bg-[#343d4a] !text-center"
            visible={visible}
            onHide={onHide}
            footer={footer}
        >
            <InputText
                value={
                    userEdit ? `${userEdit.lastName} ${userEdit.firstName}` : ""
                }
                name="name"
                className="w-full h-1.5 !my-2 !rounded-b-none !border-0 !border-b-1 !bg-transparent"
                placeholder="Felhasználónév"
                onChange={onChange}
            />
            <InputText
                value={userEdit ? userEdit.email : ""}
                name="email"
                className="w-full h-1.5 !my-2 !rounded-b-none !border-0 !border-b-1 !bg-transparent"
                placeholder="E-mail cím"
                onChange={onChange}
            />
            <Dropdown
                value={userRole}
                onChange={(e) => setUserRole(e.value)}
                options={userRoles}
                optionLabel="name"
                placeholder="Jogosultság"
                className="w-full h-10 !my-2 !rounded-b-none !border-0 !border-b-1 !bg-transparent !text-start items-center"
            />
        </Dialog>
    );
}
