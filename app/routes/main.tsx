import EmptyMainPage from "~/components/EmptyMainPage";
import Header from "~/components/Header";
import MainPage from "~/components/MainPage";
import useMain from "~/hooks/useMain";

export default function Main() {
  const {houses} = useMain();
  return (
  <>
  <Header houses={houses} />
  {houses && houses.length > 0 ? <MainPage /> : <EmptyMainPage />}
  </>)
}