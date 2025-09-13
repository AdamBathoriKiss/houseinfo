import Header from "~/components/Header";
import MainPage from "~/components/MainPage";
import useMain from "~/hooks/useMain";
import HouseRegistration from "~/components/HouseRegistration";

export default function Main() {
	const { houses } = useMain();

	return (
		<div className="flex flex-col min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
			{/* Header - fix magasság */}
			<Header houses={houses} />

			{/* Main content - maradék hely */}
			<div>{houses && houses.length > 0 ? <MainPage /> : <HouseRegistration />}</div>
		</div>
	);
}
