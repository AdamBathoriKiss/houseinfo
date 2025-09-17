import Header from "~/components/Header";
import MainPage from "~/components/MainPage";
import useMain from "~/hooks/useMain";
import HouseRegistration from "~/components/HouseRegistration";

export default function Main() {
	const { houses } = useMain();

	return (
		<div className="flex flex-col min-h-screen surface-ground bg-dark-500">
			<Header houses={houses} />
			<div>{houses && houses.length > 0 ? <MainPage /> : <HouseRegistration />}</div>
		</div>
	);
}
