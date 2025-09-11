import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Product } from "./MainPage";
import type { ReactElement } from "react";

interface ListSchemaProps {
	dataTableValue: Product[];
	header: ReactElement;
	onDialogOpened: boolean;
}

export default function ListSchema({ dataTableValue, header,onDialogOpened }: ListSchemaProps) {


	return (
		<DataTable
			value={dataTableValue}
			stripedRows
			className="rounded"
			header={header}
			emptyMessage="Nincs megjelenítendő adat"
			scrollable
			scrollHeight="flex"
			//virtualScrollerOptions={{ itemSize: dataTableValue.length }}
		>
			<Column field="code" header="Code"></Column>
			<Column field="name" header="Name"></Column>
			<Column field="category" header="Category"></Column>
			<Column field="quantity" header="Quantity"></Column>
			{onDialogOpened && <Column field="name" header="name"></Column>}
			{onDialogOpened && <Column field="quantity" header="Quantity"></Column>}
			{onDialogOpened && <Column field="category" header="category"></Column>}
			{onDialogOpened && <Column field="code" header="code"></Column>}
		</DataTable>
	);
}
