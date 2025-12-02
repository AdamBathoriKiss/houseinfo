import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

interface Demo{
    visible: boolean,
    setVisible: (visible: boolean) => void,
    setAuthVisible: (authVisible: boolean)=> void
}

export default function DemoWarning({visible,setVisible,setAuthVisible}: Demo) {
    const openAuth = () => {
        setVisible(false);
        setAuthVisible(true);
    }

	const footerContent = (
		<div>
			<Button label="Mégsem" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
			<Button label="Bejelentkezés" icon="pi pi-check" onClick={openAuth} autoFocus />
		</div>
	);

	return (
		<Dialog
			header="Figyelmeztetés"
			visible={visible}
			position="top"
			style={{ width: "50vw" }}
			onHide={() => {
				if (!visible) return;
				setVisible(false);
			}}
			footer={footerContent}
			draggable={false}
			resizable={false}
		>
			<p className="m-0">
				Az alábbi oldal jelenleg is fejlesztés alatt áll, így bizonyos funkció nem, vagy részlegesen érhetőek el.
                Továbbá jelenleg egy demo userrel tekinthető meg.
			</p>
		</Dialog>
	);
}
