import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

interface Demo {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	dialogType: string;
	setAuthVisible: (dialogType: string) => void;
}

export default function DemoWarning({ visible, setVisible, dialogType, setAuthVisible }: Demo) {
	const openAuth = () => {
		setAuthVisible(dialogType);
		setVisible(false);
	};

	const footerContent = (
		<div>
			<Button
				unstyled
				className="text-amber-50 !bg-transparent hover:!bg-teal-500/20 !my-4 border-1 p-2 border-teal-500 rounded-md"
				label="Bejelentkezés"
				onClick={openAuth}
				autoFocus
			/>
			<Button
				unstyled
				className="text-amber-50 !bg-transparent hover:!bg-red-400/20 !my-4 border-1 p-2 border-red-400 rounded-md"
				label="Mégsem"
				onClick={() => setVisible(false)}
			/>
		</div>
	);

	return (
		<Dialog
			header="Figyelmeztetés"
			visible={visible}
			position="top"
			contentClassName="!bg-transparent"
			headerClassName="!bg-transparent"
			className="lg:w-[25vw] !md:w-[60vw] !my-auto z-50 bg-[linear-gradient(180deg,#484f79_0%,#777BF1_140%)]"
			onHide={() => {
				if (!visible) return;
				setVisible(false);
			}}
			footer={footerContent}
			draggable={false}
			resizable={false}
		>
			<p className="m-0">
				Az alábbi oldal jelenleg is fejlesztés alatt áll, így bizonyos funkció nem, vagy részlegesen érhetőek
				el. Továbbá jelenleg egy demo userrel tekinthető meg.
			</p>
		</Dialog>
	);
}
