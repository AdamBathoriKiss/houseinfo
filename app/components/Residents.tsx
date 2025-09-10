import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface Product {
	id: string;
	code: string;
	name: string;
	description: string;
	image: string;
	price: number;
	category: string;
	quantity: number;
	inventoryStatus: string;
	rating: number;
}

export default function Residents({ size, setSize }: void) {
	const [products, setProducts] = useState<Product[]>([
		{
			id: "1000",
			code: "f230fh0g3",
			name: "Bamboo Watch",
			description: "Product Description",
			image: "bamboo-watch.jpg",
			price: 65,
			category: "Accessories",
			quantity: 24,
			inventoryStatus: "INSTOCK",
			rating: 5,
		},
		{
			id: "1001",
			code: "nvklal433",
			name: "Black Watch",
			description: "Product Description",
			image: "black-watch.jpg",
			price: 72,
			category: "Accessories",
			quantity: 61,
			inventoryStatus: "INSTOCK",
			rating: 4,
		},
		{
			id: "1002",
			code: "zz21cz3c1",
			name: "Blue Band",
			description: "Product Description",
			image: "blue-band.jpg",
			price: 79,
			category: "Fitness",
			quantity: 2,
			inventoryStatus: "LOWSTOCK",
			rating: 3,
		},
		{
			id: "1003",
			code: "244wgerg2",
			name: "Blue T-Shirt",
			description: "Product Description",
			image: "blue-t-shirt.jpg",
			price: 29,
			category: "Clothing",
			quantity: 25,
			inventoryStatus: "INSTOCK",
			rating: 5,
		},
		{
			id: "1004",
			code: "h456wer53",
			name: "Bracelet",
			description: "Product Description",
			image: "bracelet.jpg",
			price: 15,
			category: "Accessories",
			quantity: 73,
			inventoryStatus: "INSTOCK",
			rating: 4,
		},
		{
			id: "1005",
			code: "av2231fwg",
			name: "Brown Purse",
			description: "Product Description",
			image: "brown-purse.jpg",
			price: 120,
			category: "Accessories",
			quantity: 0,
			inventoryStatus: "OUTOFSTOCK",
			rating: 4,
		},
		{
			id: "1006",
			code: "bib36pfvm",
			name: "Chakra Bracelet",
			description: "Product Description",
			image: "chakra-bracelet.jpg",
			price: 32,
			category: "Accessories",
			quantity: 5,
			inventoryStatus: "LOWSTOCK",
			rating: 3,
		},
	]);

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
	/*useEffect(() => {
		ProductService.getProductsMini().then((data) => setProducts(data));
	}, []);*/

	const header = () => {
		return (
			<div className="flex justify-between">
				<h4>Lakók</h4>
				<Button icon="pi pi-window-maximize" onClick={() => setSize(!size)} />
			</div>
		);
	};

	return (
		<div>
			<DataTable
				value={[]}
				stripedRows
				className="rounded"
				header={header}
				emptyMessage="Nincs megjelenítendő adat"
				scrollable
				scrollHeight={getScrollHeight()} // Dinamikus magasság
				virtualScrollerOptions={{ itemSize: products.length }}
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
		</div>
	);
}
