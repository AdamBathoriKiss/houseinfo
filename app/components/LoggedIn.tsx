import { use, useEffect, useState } from "react";
import DataTableSchema from "./DataTableSchema";
import DataScrollerSchema from "./DataScrollerSchema";
import Diagrams from "./Diagrams";
import DoughnutChart from "./DoughnutChart";
import LoggedInHeader from "./LoggedInHeader";
import EventCalendar from "./EventCalendar";
import DashboardService from "~/services/dashboard.service";

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
    publishedAt: string;
    createdBy: string;
    content: string;
}

export interface Maintence {
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

export default function LoggedIn({
    houses,
    selectedHouse,
}: {
    houses: any[];
    selectedHouse: any;
}) {
    // Lakók
    const [residents, setResidents] = useState([
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
        },
        {
            id: "3",
            name: "Szabó Péter",
            address: "Budapest, Hunyadi utca 5.",
            phoneNumber: "+36 70 123 4567",
            email: "szabo.peter@example.com",
            birthOfDate: "1978-07-22",
        },
        {
            id: "4",
            name: "Tóth Anna",
            address: "Budapest, Rákóczi út 10.",
            phoneNumber: "+36 20 654 3219",
            email: "toth.anna@example.com",
            birthOfDate: "1982-05-15",
        },
        {
            id: "5",
            name: "Kiss Balázs",
            address: "Budapest, Arany János utca 3.",
            phoneNumber: "+36 30 321 9876",
            email: "kiss.balazs@example.com",
            birthOfDate: "1995-01-30",
        },
        {
            id: "6",
            name: "Németh Eszter",
            address: "Budapest, Szent István tér 7.",
            phoneNumber: "+36 70 987 6543",
            email: "nemeth.eszter@example.com",
            birthOfDate: "1988-12-12",
        },
        {
            id: "7",
            name: "Farkas László",
            address: "Budapest, Kossuth Lajos utca 20.",
            phoneNumber: "+36 20 432 1098",
            email: "farkas.laszlo@example.com",
            birthOfDate: "1975-10-05",
        },
        {
            id: "8",
            name: "Molnár Judit",
            address: "Budapest, József Attila utca 14.",
            phoneNumber: "+36 30 765 4321",
            email: "molnar.judit@example.com",
            birthOfDate: "1992-09-18",
        },
        {
            id: "9",
            name: "Varga Gábor",
            address: "Budapest, Damjanich utca 8.",
            phoneNumber: "+36 20 123 4598",
            email: "varga.gabor@example.com",
            birthOfDate: "1980-04-09",
        },
        {
            id: "10",
            name: "Horváth Zsófia",
            address: "Budapest, Kálvin tér 5.",
            phoneNumber: "+36 70 456 7890",
            email: "horvath.zsofia@example.com",
            birthOfDate: "1993-08-25",
        },
        {
            id: "11",
            name: "Papp István",
            address: "Budapest, Rózsa utca 12.",
            phoneNumber: "+36 20 654 1234",
            email: "papp.istvan@example.com",
            birthOfDate: "1987-11-11",
        },
        {
            id: "12",
            name: "Balogh Katalin",
            address: "Budapest, Bartók Béla út 16.",
            phoneNumber: "+36 30 987 3210",
            email: "balogh.katalin@example.com",
            birthOfDate: "1991-02-22",
        },
        {
            id: "13",
            name: "Kelemen Dávid",
            address: "Budapest, Síp utca 6.",
            phoneNumber: "+36 20 876 5432",
            email: "kelemen.david@example.com",
            birthOfDate: "1984-07-07",
        },
        {
            id: "14",
            name: "Major Erika",
            address: "Budapest, Baross utca 1.",
            phoneNumber: "+36 30 234 5678",
            email: "major.erika@example.com",
            birthOfDate: "1996-06-06",
        },
        {
            id: "15",
            name: "Szalai Bence",
            address: "Budapest, Dózsa György út 19.",
            phoneNumber: "+36 20 345 6789",
            email: "szalai.bence@example.com",
            birthOfDate: "1989-09-29",
        },
        {
            id: "16",
            name: "Vass Mariann",
            address: "Budapest, Nyugati tér 4.",
            phoneNumber: "+36 70 567 8901",
            email: "vass.mariann@example.com",
            birthOfDate: "1983-03-03",
        },
        {
            id: "17",
            name: "Török Attila",
            address: "Budapest, Orczy tér 10.",
            phoneNumber: "+36 20 678 9012",
            email: "torok.attila@example.com",
            birthOfDate: "1981-12-15",
        },
        {
            id: "18",
            name: "Szűcs Réka",
            address: "Budapest, Kinizsi utca 11.",
            phoneNumber: "+36 30 456 7890",
            email: "szucs.reka@example.com",
            birthOfDate: "1994-05-21",
        },
        {
            id: "19",
            name: "Fekete Lajos",
            address: "Budapest, Liliom utca 2.",
            phoneNumber: "+36 20 543 2109",
            email: "fekete.lajos@example.com",
            birthOfDate: "1979-01-01",
        },
        {
            id: "20",
            name: "Horváth Éva",
            address: "Budapest, Bajcsy-Zsilinszky út 9.",
            phoneNumber: "+36 70 321 6549",
            email: "horvath.eva@example.com",
            birthOfDate: "1997-04-14",
        },
    ]);

    // Hírek
    const [news, setNews] = useState([]);

    // Feladatok
    const [maintence, setMaintence] = useState([]);

    // Számlák
    const [bills, setBills] = useState([
        {
            id: "1",
            accountNumber: "SZ0001",
            amount: 15000,
            invoiceDate: "2025-08-30",
            paymentDeadline: "2025-09-15",
            status: "Fizetett",
        },
        {
            id: "2",
            accountNumber: "SZ0002",
            amount: 12000,
            invoiceDate: "2025-09-05",
            paymentDeadline: "2025-09-25",
            status: "Fizetés alatt",
        },
        {
            id: "3",
            accountNumber: "SZ0003",
            amount: 18000,
            invoiceDate: "2025-09-10",
            paymentDeadline: "2025-09-30",
            status: "Fizetett",
        },
        {
            id: "4",
            accountNumber: "SZ0004",
            amount: 14000,
            invoiceDate: "2025-09-12",
            paymentDeadline: "2025-10-05",
            status: "Fizetés alatt",
        },
        {
            id: "5",
            accountNumber: "SZ0005",
            amount: 20000,
            invoiceDate: "2025-09-08",
            paymentDeadline: "2025-09-28",
            status: "Fizetett",
        },
        {
            id: "6",
            accountNumber: "SZ0006",
            amount: 13000,
            invoiceDate: "2025-08-25",
            paymentDeadline: "2025-09-10",
            status: "Fizetett",
        },
        {
            id: "7",
            accountNumber: "SZ0007",
            amount: 17000,
            invoiceDate: "2025-09-03",
            paymentDeadline: "2025-09-23",
            status: "Fizetés alatt",
        },
        {
            id: "8",
            accountNumber: "SZ0008",
            amount: 16000,
            invoiceDate: "2025-09-11",
            paymentDeadline: "2025-10-01",
            status: "Fizetett",
        },
        {
            id: "9",
            accountNumber: "SZ0009",
            amount: 19000,
            invoiceDate: "2025-09-15",
            paymentDeadline: "2025-10-07",
            status: "Fizetési késedelem",
        },
        {
            id: "10",
            accountNumber: "SZ0010",
            amount: 12500,
            invoiceDate: "2025-09-14",
            paymentDeadline: "2025-09-30",
            status: "Fizetett",
        },
        {
            id: "11",
            accountNumber: "SZ0011",
            amount: 14500,
            invoiceDate: "2025-09-16",
            paymentDeadline: "2025-10-05",
            status: "Fizetés alatt",
        },
        {
            id: "12",
            accountNumber: "SZ0012",
            amount: 15500,
            invoiceDate: "2025-09-17",
            paymentDeadline: "2025-10-10",
            status: "Fizetett",
        },
        {
            id: "13",
            accountNumber: "SZ0013",
            amount: 13500,
            invoiceDate: "2025-09-19",
            paymentDeadline: "2025-10-12",
            status: "Fizetés alatt",
        },
        {
            id: "14",
            accountNumber: "SZ0014",
            amount: 18500,
            invoiceDate: "2025-09-20",
            paymentDeadline: "2025-10-15",
            status: "Fizetési késedelem",
        },
        {
            id: "15",
            accountNumber: "SZ0015",
            amount: 16500,
            invoiceDate: "2025-09-21",
            paymentDeadline: "2025-10-18",
            status: "Fizetés alatt",
        },
        {
            id: "16",
            accountNumber: "SZ0016",
            amount: 17500,
            invoiceDate: "2025-09-22",
            paymentDeadline: "2025-10-20",
            status: "Fizetett",
        },
        {
            id: "17",
            accountNumber: "SZ0017",
            amount: 19500,
            invoiceDate: "2025-09-23",
            paymentDeadline: "2025-10-22",
            status: "Fizetés alatt",
        },
        {
            id: "18",
            accountNumber: "SZ0018",
            amount: 20500,
            invoiceDate: "2025-09-24",
            paymentDeadline: "2025-10-25",
            status: "Fizetett",
        },
        {
            id: "19",
            accountNumber: "SZ0019",
            amount: 15000,
            invoiceDate: "2025-09-25",
            paymentDeadline: "2025-10-28",
            status: "Fizetés alatt",
        },
        {
            id: "20",
            accountNumber: "SZ0020",
            amount: 22000,
            invoiceDate: "2025-09-26",
            paymentDeadline: "2025-10-30",
            status: "Fizetési késedelem",
        },
    ]);

    // Dokumentumok
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (selectedHouse !== null && selectedHouse !== undefined) {
            DashboardService.getDashboardData(selectedHouse?.id).then(
                (response) => {
                    setNews(response.data.selectedBuilding.announcements);
                    setMaintence(
                        response.data.selectedBuilding.maintenanceRequest
                    );
                    setDocuments(response.data.selectedBuilding.document);
                }
            );
        }
    }, [selectedHouse]);

    return (
        <div className="flex flex-col min-h-screen px-6 ">
            <LoggedInHeader />
            <div className="grid grid-cols-2 gap-6 px-4 my-4">
                {/* Bal oldali oszlop */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2">
                        <div className="shadow-2xl rounded-md w-[60%] h-96 overflow-hidden grid grid-cols-2 justify-between items-center">
                            <p className="col-start-1 col-end-12 text-center">
                                Összes parkoló száma: 43
                            </p>
                            <DoughnutChart title="Normál" />
                            <DoughnutChart title="Elektromos" />
                        </div>
                        <EventCalendar />
                    </div>
                    <div className="surface-card shadow-2xl rounded-md h-96 overflow-hidden backdrop-blur-2xl">
                        <Diagrams />
                    </div>
                </div>

                {/* Jobb oldali oszlop */}
                <div className="flex flex-col gap-6">
                    <div className="surface-card shadow-2xl rounded-md h-96 overflow-hidden">
                        <DataScrollerSchema
                            dataTableValue={news}
                            title={"Hírek"}
                            type="news"
                        />
                    </div>
                    <div className="surface-card shadow-2xl rounded-md h-96 overflow-hidden">
                        <DataScrollerSchema
                            dataTableValue={maintence}
                            title={"Feladatok"}
                            type="maintence"
                        />
                    </div>
                </div>
            </div>

            <div className="px-4 my-4">
                <div className=" gap-6 surface-card shadow-2xl rounded-md h-96 overflow-hidden">
                    <DataTableSchema
                        dataTableValue={documents}
                        title={"Dokumentumok"}
                        type="documents"
                    />
                </div>
            </div>
        </div>
    );
}
