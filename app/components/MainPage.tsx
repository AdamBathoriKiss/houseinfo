import Bills from "./Bills";
import Documents from "./Documents";
import News from "./News";
import Residents from "./Residents";
import Tasks from "./Tasks";

export default function MainPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="grid grid-cols-2 gap-4 px-4 my-4 flex-1">
				{/* Bal oldali oszlop */}
				<div className="flex flex-col gap-4">
					<div className="shadow-xl/30 rounded-sm h-96 bg-gray-100">
						<Residents />
					</div>
					<div className="shadow-xl/30 rounded-sm h-dvh bg-gray-200">
						<Tasks />
					</div>
				</div>

				{/* Jobb oldali oszlop */}
				<div className="flex flex-col gap-4">
					<div className="shadow-xl/30 rounded-sm h-dvh bg-gray-300">{/*<News />*/}</div>
					<div className="shadow-xl/30 rounded-sm h-96 bg-gray-400">
						<Bills />
					</div>
				</div>
			</div>

			<div className="px-4 my-4">
				<div className="shadow-xl/30 rounded-sm bg-gray-500 h-96">
					<Documents />
				</div>
			</div>
		</div>
	);
}
