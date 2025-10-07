import Header from "~/components/Header";
import LoggedIn from "~/components/LoggedIn";
import useMain from "~/hooks/useMain";
import HouseRegistration from "~/components/HouseRegistration";

export default function Main() {
	const { houses } = useMain();

	return (
		<div className="flex flex-col min-h-screen surface-ground bg-dark-500">
			<Header houses={houses ?? []} />
			<div className="mt-[7vh]">{houses && houses.length > 0 ? <LoggedIn /> : <HouseRegistration />}</div>
		</div>
	);
}
