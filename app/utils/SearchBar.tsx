import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

interface Filter {
	filterFunction: (searchTerm: string) => void;
}

export default function SearchBar({ filterFunction }: Filter) {
	return (
		<div className="flex items-center gap-3 w-full md:w-auto">
			<IconField iconPosition="left" className="w-full md:w-auto">
				<InputIcon className="pi pi-search" />
				<InputText
					className="w-full md:w-64 lg:w-80 h-[2.5rem] !bg-transparent !rounded-full px-4"
					placeholder="Search"
					onChange={(e) => filterFunction(e.target.value)}
				/>
			</IconField>
		</div>
	);
}