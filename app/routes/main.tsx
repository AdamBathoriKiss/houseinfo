import EmptyMainPage from "~/components/EmptyMainPage";
import Header from "~/components/Header";
import MainPage from "~/components/MainPage";
import useMain from "~/hooks/useMain";

export default function Main() {
	const { houses } = useMain();

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			{/* Header - fix magasság */}
			<Header houses={houses} />

			{/* Main content - maradék hely */}
			<div className="flex-1 overflow-auto">{houses && houses.length > 0 ? <MainPage /> : <EmptyMainPage />}</div>
		</div>
	);
}
