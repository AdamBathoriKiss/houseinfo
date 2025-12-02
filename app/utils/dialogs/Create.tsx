import { Dialog } from "primereact/dialog";
import Maintences from "~/components/Maintences";
import Announcements from "~/components/Announcements";
import { useAuth } from "../AuthProvider";

interface Creation {
	visible?: boolean;
	setVisible: (visible: boolean) => void;
	type: "news" | "maintence" | "newsDialog" | "maintenceDialog";
	buildingId: number;
}

export default function Create({ visible, setVisible, type, buildingId }: Creation) {
	const { user } = useAuth();
//teszt
	const createModal = () => {
		return (
			<div className="rounded-xl shadow-2xl h-fit bg-[#343d4a]">
				<div className="flex justify-between items-center p-4 border-b border-gray-600">
					{type === "news" ? (
						<h3 className="text-lg md:text-xl font-bold text-gray-100">Új hír létrehozása</h3>
					) : (
						<h3 className="text-lg md:text-xl font-bold text-gray-100">Új feladat létrehozása</h3>
					)}
					<button
						onClick={() => setVisible(false)}
						className="text-gray-400 hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-600/30"
						aria-label="Bezárás"
					>
						<i className="pi pi-times text-xl md:text-2xl"></i>
					</button>
				</div>
				<div className="overflow-y-auto max-h-[70vh]">
					{type === "news" ? (
						<Announcements
							id={user.userId}
							title=""
							content=""
							author={null}
							date=""
							type="create"
							authorId={user.userId}
							buildingId={buildingId}
						/>
					) : (
						<Maintences
							title=""
							description=""
							status=""
							category=""
							priority=""
							buildingId={buildingId}
							reportedBy={user}
							reportedById={user.userId}
						/>
					)}
				</div>
			</div>
		);
	};

	const createDialog = () => {
		return (
			<Dialog
				header={type === "newsDialog" ? "Új hír létrehozása" : "Új feladat létrehozása"}
				visible={visible}
				onHide={() => setVisible(false)}
				className="w-[95vw] sm:w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] max-w-4xl !bg-[#343d4a] text-gray-300"
				contentClassName="!p-0 !m-0 !bg-[#343d4a] text-gray-300 overflow-hidden"
				headerClassName="!p-4 !bg-[#343d4a] text-gray-100 !text-lg md:!text-xl !font-bold border-b border-gray-600"
				draggable={false}
				resizable={false}
				breakpoints={{ "960px": "90vw", "640px": "95vw" }}
			>
				<div className="rounded-lg h-fit max-h-[70vh] overflow-y-auto">
					{type === "newsDialog" ? (
						<Announcements
							title=""
							content=""
							author={null}
							date=""
							type="create"
							id={user.userId}
							authorId={user.userId}
							buildingId={buildingId}
						/>
					) : (
						<Maintences
							title=""
							description=""
							status=""
							category=""
							priority=""
							buildingId={buildingId}
							reportedBy={user}
							reportedById={user.userId}
						/>
					)}
				</div>
			</Dialog>
		);
	};

	if (type === "news" || type === "maintence") {
		return createModal();
	}

	if (type === "newsDialog" || type === "maintenceDialog") {
		return createDialog();
	}
}