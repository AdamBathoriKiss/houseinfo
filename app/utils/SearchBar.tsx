import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

interface Filter {
	filterFunction: (searchTerm: string) => void;
}

export default function SearchBar({ filterFunction }: Filter) {
	return (
		<div className="flex items-center md:w-[20%]">
			<IconField iconPosition="left" className="w-full">
				<InputIcon className="pi pi-search" />
				<InputText
					className="
                        w-full
                        text-sm
                        !bg-transparent 
                        h-[2.75rem]
                        !rounded-3xl

                        sm:text-base
                        md:w-80        /* közepes kijelző */
                        lg:w-[20vw]    /* nagy kijelző */
                    "
					placeholder="Search"
					onChange={(e) => filterFunction(e.target.value)}
				/>
			</IconField>
		</div>
	);
}

