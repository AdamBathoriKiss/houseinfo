import { useState } from "react";
import ListSchema from "./ListSchema";

export interface Product {
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

export default function MainPage() {
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

    return (
        <div className="flex flex-col min-h-screen">
            <div className="grid grid-cols-2 gap-4 px-4 my-4 flex-1">
                {/* Bal oldali oszlop */}
                <div className="flex flex-col gap-4">
                    <div className="shadow-xl/30 rounded-sm h-96 bg-gray-100 flex flex-col">
                        <ListSchema
                            dataTableValue={products}
                            title={"Lakók"}
                            type="residents"
                        />
                        {/*<Residents size={maximized} setSize={setMaximized} />*/}
                    </div>
                    <div className="shadow-xl/30 rounded-sm h-dvh bg-gray-200">
                        {/*<Tasks />*/}
                        <ListSchema
                            dataTableValue={products}
                            title={"Feladatok"}
                            type="tasks"
                        />
                    </div>
                </div>

                {/* Jobb oldali oszlop */}
                <div className="flex flex-col gap-4">
                    <div className="shadow-xl/30 rounded-sm h-dvh bg-gray-300">
                        {/*<News />*/}
                        <ListSchema
                            dataTableValue={products}
                            title={"Hírek"}
                            type="news"
                        />
                    </div>
                    <div className="shadow-xl/30 rounded-sm h-96 bg-gray-400">
                        {/*<Bills />*/}
                        <ListSchema
                            dataTableValue={products}
                            title={"Számlák"}
                            type="bills"
                        />
                    </div>
                </div>
            </div>

            <div className="px-4 my-4">
                <div className="shadow-xl/30 rounded-sm bg-gray-500 h-96">
                    {/*<Documents />*/}
                    <ListSchema
                        dataTableValue={products}
                        title={"Dokumentumok"}
                        type="documents"
                    />
                </div>
            </div>
        </div>
    );
}
