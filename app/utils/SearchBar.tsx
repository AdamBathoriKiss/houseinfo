import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

interface Filter {
	filterFunction: (searchTerm: string) => void;
}

export default function SearchBar({ filterFunction }: Filter) {
	return (
		<div className="flex items-center gap-3">
			<IconField iconPosition="left">
				<InputIcon className="pi pi-search"> </InputIcon>
				<InputText
					className="mx-4 !bg-transparent md-w-[40vw] lg-w-[15vw] h-[2.5rem] !rounded-4xl"
					placeholder="Search"
					onChange={(e) => filterFunction(e.target.value)}
				/>
			</IconField>
		</div>
	);
}
