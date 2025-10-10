import { use, useEffect, useState } from "react";
import DataTableSchema from "./DataTableSchema";
import DataScrollerSchema from "./DataScrollerSchema";
import Diagrams from "./Diagrams";
import DoughnutChart from "./DoughnutChart";
import LoggedInHeader from "./LoggedInHeader";
import EventCalendar from "./EventCalendar";
import DashboardService from "~/services/dashboard.service";
import { set } from "zod";

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

export interface ChartData {
    parkings: number;
    normalParkings: number;
    occupiedNormal: number;
    freeNormal: number;
    electricParkings: number;
    occupiedElectric: number;
    freeElectric: number;
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
    const [news, setNews] = useState([]);
    const [maintence, setMaintence] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [events, setEvents] = useState([]);
    const [financeTotal, setFinanceTotal] = useState(0);
    const [activeTasks, setActiveTasks] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [applicationRegistered, setApplicationRegistered] = useState(0);
    const [chartData, setChartData] = useState<ChartData>();

    useEffect(() => {
        if (selectedHouse !== null && selectedHouse !== undefined) {
            DashboardService.getDashboardData(selectedHouse?.id).then(
                (response) => {
                    setNews(response.data.selectedBuilding.announcements);
                    setMaintence(
                        response.data.selectedBuilding.maintenanceRequest
                    );
                    setDocuments(response.data.selectedBuilding.document);
                    setEvents(response.data.selectedBuilding.events);
                    setFinanceTotal(response.data.selectedBuilding.finances);
                    setActiveTasks(response.data.selectedBuilding.maintenances);
                    setExpenseTotal(
                        response.data.selectedBuilding.expenseTotal
                    );
                    setChartData(response.data.selectedBuilding.chartData);
                }
            );
        }
    }, [selectedHouse]);

    return (
        <div className="flex flex-col min-h-screen px-6 ">
            <LoggedInHeader
                financeTotal={financeTotal}
                activeTasks={activeTasks}
                expenseTotal={expenseTotal}
            />
            <div className="grid grid-cols-2 gap-6 px-4 my-4">
                {/* Bal oldali oszlop */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2">
                        <div className="shadow-2xl rounded-md w-[60%] h-96 overflow-hidden grid grid-cols-2 justify-between items-center">
                            <p className="col-start-1 col-end-12 text-center">
                                Összes parkoló száma:{" "}
                                {chartData && chartData !== null
                                    ? chartData.parkings
                                    : 0}
                            </p>
                            <DoughnutChart title="Normál" free={chartData?.freeNormal} occupied={chartData?.occupiedNormal}/>
                            <DoughnutChart title="Elektromos" free={chartData?.freeElectric} occupied={chartData?.occupiedElectric}/>
                        </div>
                        <EventCalendar events={events} />
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
