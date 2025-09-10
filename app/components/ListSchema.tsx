import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Product } from "./MainPage";
import type { ReactElement } from "react";

interface ListSchemaProps {
	dataTableValue: Product[];
	header: ReactElement;
	size: boolean;
	setSize: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ListSchema({ dataTableValue, header, size, setSize }: ListSchemaProps) {
	const getScrollHeight = () => {
		if (!size) return "325px"; // Alapértelmezett méret

		// Ha maximalizált állapotban van, akkor responsive magasságot ad
		if (window.innerWidth >= 1024) {
			return "45rem"; // Nagy képernyő
		} else if (window.innerWidth >= 768) {
			return "32rem"; // Közepes képernyő
		} else {
			return "25rem"; // Kis képernyő
		}
	};

	return (
		<DataTable
			value={dataTableValue}
			stripedRows
			className="rounded"
			header={header}
			emptyMessage="Nincs megjelenítendő adat"
			scrollable
			scrollHeight={getScrollHeight()} // Dinamikus magasság
			virtualScrollerOptions={{ itemSize: dataTableValue.length }}
		>
			<Column field="code" header="Code"></Column>
			<Column field="name" header="Name"></Column>
			<Column field="category" header="Category"></Column>
			<Column field="quantity" header="Quantity"></Column>
			{size && <Column field="name" header="name"></Column>}
			{size && <Column field="quantity" header="Quantity"></Column>}
			{size && <Column field="category" header="category"></Column>}
			{size && <Column field="code" header="code"></Column>}
		</DataTable>
	);
}
