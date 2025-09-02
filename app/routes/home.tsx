import { Welcome } from "~/components/welcome";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "House-Info" },
    { name: "description", content: "House-Info offical site." },
  ];
}

export default function Home() {
  return <Welcome />;
}
