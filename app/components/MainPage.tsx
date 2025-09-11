import { useState } from "react";
import ListSchema from "./ListSchema";

export interface Residents {
	  id: string;
	name: string;
	address: string;
	phoneNumber: string;
	email: string;
	birthOfDate: string;
}

export interface News {
	  id: string;
	title: string;
	date: string;
	createdBy: string;
	content: string;
}

export interface Tasks {
	  id: string;
	title: string;
	deadline: string;
	status: string;
	description: string;
	responsible: string;
}

export interface Bills {
	  id: string;
	accountNumber: string;
	amount: number;
	invoiceDate: string;
	paymentDeadline: string;
	status: string;
}

export interface Documents {
	  id: string;
	name: string;
	createdBy: string;
	date: string;
	type: string;
	size: string;
}

export default function MainPage() {
// Lakók
const [residents, setResidenst] = useState([
  {
    id: "1",
    name: "Kovács János",
    address: "Budapest, Fő utca 12.",
    phoneNumber: "+36 30 123 4567",
    email: "janos.kovacs@example.com",
    birthOfDate: "1985-03-15",
  },
  {
    id: "2",
    name: "Nagy Éva",
    address: "Budapest, Petőfi tér 8.",
    phoneNumber: "+36 20 987 6543",
    email: "eva.nagy@example.com",
    birthOfDate: "1990-11-02",
  }
]);

// Hírek
const [news, setNews] = useState([
  {
    id: "1",
    title: "Közgyűlés időpontja",
    date: "2025-09-15",
    createdBy: "Lakóközösség",
    content: "A következő közgyűlés 2025. október 1-jén lesz 18 órakor a közösségi házban."
  },
  {
    id: "2",
    title: "Új parkolóhelyek",
    date: "2025-09-10",
    createdBy: "Karbantartás",
    content: "Új parkolóhelyeket alakítottunk ki az udvarban, kérjük, használják!"
  }
]);

// Feladatok
const [tasks, setTasks] = useState([
  {
    id: "1",
    title: "Lépcsőház takarítása",
    deadline: "2025-09-20",
    status: "Folyamatban",
    description: "A lépcsőház napi takarítása szükséges.",
    responsible: "Kovács János"
  },
  {
    id: "2",
    title: "Kerti növények locsolása",
    deadline: "2025-09-18",
    status: "Nem kezdődött",
    description: "A közös kert locsolása hetente kétszer.",
    responsible: "Nagy Éva"
  }
]);

// Számlák
const [bills, setBills] = useState([
  {
    id: "1",
    accountNumber: "SZ0001",
    amount: 15000,
    invoiceDate: "2025-08-30",
    paymentDeadline: "2025-09-15",
    status: "Fizetett"
  },
  {
    id: "2",
    accountNumber: "SZ0002",
    amount: 12000,
    invoiceDate: "2025-09-05",
    paymentDeadline: "2025-09-25",
    status: "Fizetés alatt"
  }
]);

// Dokumentumok
const [documents, setDocuments] = useState([
  {
    id: "1",
    name: "Alapító Okirat",
    createdBy: "Nagy Éva",
    date: "2025-01-10",
    type: "PDF",
    size: "1.2 MB"
  },
  {
    id: "2",
    name: "Közgyűlési jegyzőkönyv",
    createdBy: "Kovács János",
    date: "2025-08-01",
    type: "DOCX",
    size: "500 KB"
  }
]);


    return (
        <div className="flex flex-col min-h-screen">
            <div className="grid grid-cols-2 gap-4 px-4 my-4 flex-1">
                {/* Bal oldali oszlop */}
                <div className="flex flex-col gap-4">
                    <div className="shadow-xl/30 rounded-sm h-96 bg-gray-100 flex flex-col">
                        <ListSchema
                            dataTableValue={residents}
                            title={"Lakók"}
                            type="residents"
                        />
                    </div>
                    <div className="shadow-xl/30 rounded-sm h-dvh bg-gray-200">
                        <ListSchema
                            dataTableValue={tasks}
                            title={"Feladatok"}
                            type="tasks"
                        />
                    </div>
                </div>

                {/* Jobb oldali oszlop */}
                <div className="flex flex-col gap-4">
                    <div className="shadow-xl/30 rounded-sm h-dvh bg-gray-300">
                        <ListSchema
                            dataTableValue={news}
                            title={"Hírek"}
                            type="news"
                        />
                    </div>
                    <div className="shadow-xl/30 rounded-sm h-96 bg-gray-400">
                        <ListSchema
                            dataTableValue={bills}
                            title={"Számlák"}
                            type="bills"
                        />
                    </div>
                </div>
            </div>

            <div className="px-4 my-4">
                <div className="shadow-xl/30 rounded-sm bg-gray-500 h-96">
                    <ListSchema
                        dataTableValue={documents}
                        title={"Dokumentumok"}
                        type="documents"
                    />
                </div>
            </div>
        </div>
    );
}
