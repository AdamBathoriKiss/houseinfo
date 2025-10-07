import { useState } from "react";
import DataTableSchema from "./DataTabletSchema";
import DataScrollerSchema from "./DataScrollerSchema";
import Diagrams from "./Diagrams";
import DoughnutChart from "./DoughnutChart";
import MainPageHeader from "./MainPageHeader";
import { Dialog } from "primereact/dialog";
import EventCalendar from "./EventCalendar";

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
    const [news, setNews] = useState([
        {
            id: "1",
            title: "Közgyűlés időpontja",
            date: "2025-09-15",
            createdBy: "Lakóközösség",
            content:
                "A következő közgyűlés 2025. október 1-jén lesz 18 órakor a közösségi házban.",
        },
        {
            id: "2",
            title: "Új parkolóhelyek",
            date: "2025-09-10",
            createdBy: "Karbantartás",
            content:
                "Új parkolóhelyeket alakítottunk ki az udvarban, kérjük, használják!",
        },
        {
            id: "3",
            title: "Fűnyírás a kertben",
            date: "2025-09-12",
            createdBy: "Karbantartás",
            content: "Szeptember 14-én fűnyírás lesz a közös kertben.",
        },
        {
            id: "4",
            title: "Internet leállás",
            date: "2025-09-20",
            createdBy: "Szolgáltató",
            content:
                "Tervezett karbantartás miatt szeptember 20-án 8-12 óráig internet kimaradás várható.",
        },
        {
            id: "5",
            title: "Új szemetes konténerek",
            date: "2025-09-18",
            createdBy: "Karbantartás",
            content: "Új szemetes konténereket helyeztünk ki a lakóház körül.",
        },
        {
            id: "6",
            title: "Rendkívüli közgyűlés",
            date: "2025-09-22",
            createdBy: "Lakóközösség",
            content: "Sürgős közgyűlés lesz szeptember 25-én 19 órakor.",
        },
        {
            id: "7",
            title: "Közvilágítás javítása",
            date: "2025-09-14",
            createdBy: "Karbantartás",
            content: "A közvilágítást javítják szeptember 16-án este.",
        },
        {
            id: "8",
            title: "Lift karbantartás",
            date: "2025-09-21",
            createdBy: "Szolgáltató",
            content: "A lift karbantartása szeptember 23-án lesz.",
        },
        {
            id: "9",
            title: "Új lakótársi szabályok",
            date: "2025-09-13",
            createdBy: "Lakóközösség",
            content: "Új szabályokat vezettünk be a lakók kényelméért.",
        },
        {
            id: "10",
            title: "Vízóra leolvasás",
            date: "2025-09-19",
            createdBy: "Karbantartás",
            content: "Szeptember 21-én lesz a vízóra leolvasás.",
        },
        {
            id: "11",
            title: "Karbantartás a parkolóban",
            date: "2025-09-25",
            createdBy: "Karbantartás",
            content: "A parkoló burkolatának javítása várható.",
        },
        {
            id: "12",
            title: "Hulladék elszállítás",
            date: "2025-09-17",
            createdBy: "Karbantartás",
            content: "Szeptember 19-én hulladék elszállítás lesz.",
        },
        {
            id: "13",
            title: "Újbejárati ajtó felszerelése",
            date: "2025-09-16",
            createdBy: "Szolgáltató",
            content: "Új bejárati ajtók felszerelése elkezdődött.",
        },
        {
            id: "14",
            title: "Fűtés szezon kezdete",
            date: "2025-09-20",
            createdBy: "Lakóközösség",
            content: "Szeptember 25-től indul a fűtési szezon.",
        },
        {
            id: "15",
            title: "Szemétszállítás Ünnepnapokon",
            date: "2025-09-23",
            createdBy: "Karbantartás",
            content: "Ünnepnapokon változik a szemétszállítás rendje.",
        },
        {
            id: "16",
            title: "Új csendrendelet érvényben",
            date: "2025-09-15",
            createdBy: "Lakóközösség",
            content: "Új csendrendelet lépett életbe.",
        },
        {
            id: "17",
            title: "Lépcsőházi világítás csere",
            date: "2025-09-24",
            createdBy: "Karbantartás",
            content: "Lépcsőházi világítás cseréje várható.",
        },
        {
            id: "18",
            title: "Közös költség befizetés",
            date: "2025-09-28",
            createdBy: "Lakóközösség",
            content: "Közös költség befizetési határidő szeptember 30.",
        },
        {
            id: "19",
            title: "Új zöldterület kialakítása",
            date: "2025-09-29",
            createdBy: "Karbantartás",
            content: "Új zöldterület létesül a parkban.",
        },
        {
            id: "20",
            title: "Kötbér szabályozás módosítása",
            date: "2025-10-01",
            createdBy: "Lakóközösség",
            content: "Kötbér fizetés szabályai módosultak.",
        },
    ]);

    // Feladatok
    const [tasks, setTasks] = useState([
        {
            id: "1",
            title: "Lépcsőház takarítása",
            deadline: "2025-09-20",
            status: "Folyamatban",
            description: "A lépcsőház napi takarítása szükséges.",
            responsible: "Kovács János",
        },
        {
            id: "2",
            title: "Kerti növények locsolása",
            deadline: "2025-09-18",
            status: "Nem kezdődött",
            description: "A közös kert locsolása hetente kétszer.",
            responsible: "Nagy Éva",
        },
        {
            id: "3",
            title: "Konyha takarítása",
            deadline: "2025-09-22",
            status: "Nem kezdődött",
            description: "Közös konyha takarítása szükséges minden hétvégén.",
            responsible: "Tóth Anna",
        },
        {
            id: "4",
            title: "Hulladék elszállítás",
            deadline: "2025-09-19",
            status: "Folyamatban",
            description: "Heti hulladék elszállítás megszervezése.",
            responsible: "Szabó Péter",
        },
        {
            id: "5",
            title: "Láncszem olajozása",
            deadline: "2025-09-25",
            status: "Nem kezdődött",
            description: "Kerékpár lánc karbantartása.",
            responsible: "Kiss Balázs",
        },
        {
            id: "6",
            title: "Épület festése",
            deadline: "2025-10-10",
            status: "Nem kezdődött",
            description: "Épület külső falainak festése.",
            responsible: "Németh Eszter",
        },
        {
            id: "7",
            title: "Közös kert öntözése",
            deadline: "2025-09-21",
            status: "Folyamatban",
            description: "Élőlénnyel rendelkező kert öntözése.",
            responsible: "Farkas László",
        },
        {
            id: "8",
            title: "Lift karbantartás",
            deadline: "2025-09-30",
            status: "Nem kezdődött",
            description: "Lift ellenőrzése és javítása.",
            responsible: "Molnár Judit",
        },
        {
            id: "9",
            title: "Fűtés beállítása",
            deadline: "2025-09-28",
            status: "Nem kezdődött",
            description: "Fűtés időzítésének beállítása.",
            responsible: "Varga Gábor",
        },
        {
            id: "10",
            title: "Tisztító vegyszerek beszerzése",
            deadline: "2025-09-24",
            status: "Folyamatban",
            description: "Közös használatú tisztítószerek beszerzése.",
            responsible: "Horváth Zsófia",
        },
        {
            id: "11",
            title: "Közös helyiségek takarítása",
            deadline: "2025-09-27",
            status: "Nem kezdődött",
            description: "Közös helyiségek rendszeres takarítása.",
            responsible: "Papp István",
        },
        {
            id: "12",
            title: "Fűnyírás szervezése",
            deadline: "2025-09-26",
            status: "Nem kezdődött",
            description: "Közös fűnyírás szervezése.",
            responsible: "Balogh Katalin",
        },
        {
            id: "13",
            title: "Parkoló burkolat javítása",
            deadline: "2025-09-29",
            status: "Nem kezdődött",
            description: "Parkoló burkolatának javítása.",
            responsible: "Kelemen Dávid",
        },
        {
            id: "14",
            title: "Kazán karbantartás",
            deadline: "2025-10-05",
            status: "Nem kezdődött",
            description: "Kazán ellenőrzése és karbantartása.",
            responsible: "Major Erika",
        },
        {
            id: "15",
            title: "Kaputelefon javítás",
            deadline: "2025-09-23",
            status: "Folyamatban",
            description: "Kaputelefon működésének javítása.",
            responsible: "Szalai Bence",
        },
        {
            id: "16",
            title: "Szemétszállítás koordinálása",
            deadline: "2025-09-28",
            status: "Nem kezdődött",
            description: "Szemétszállítás időpontjának egyeztetése.",
            responsible: "Vass Mariann",
        },
        {
            id: "17",
            title: "Közös csatorna takarítás",
            deadline: "2025-10-01",
            status: "Nem kezdődött",
            description: "Csatorna tisztítása a közös területeken.",
            responsible: "Török Attila",
        },
        {
            id: "18",
            title: "Bejárati ajtó cseréje",
            deadline: "2025-10-03",
            status: "Nem kezdődött",
            description: "Bejárati ajtók cseréje és karbantartás.",
            responsible: "Szűcs Réka",
        },
        {
            id: "19",
            title: "Világítás karbantartás",
            deadline: "2025-09-29",
            status: "Nem kezdődött",
            description: "Lépcsőházi világítás cseréje.",
            responsible: "Fekete Lajos",
        },
        {
            id: "20",
            title: "Biztonsági kamera ellenőrzés",
            deadline: "2025-10-02",
            status: "Nem kezdődött",
            description: "Kamerák működésének ellenőrzése és karbantartása.",
            responsible: "Horváth Éva",
        },
    ]);

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
    const [documents, setDocuments] = useState([
        {
            id: "1",
            name: "Alapító Okirat",
            createdBy: "Nagy Éva",
            date: "2025-01-10",
            type: "PDF",
            size: "1.2 MB",
        },
        {
            id: "2",
            name: "Közgyűlési jegyzőkönyv",
            createdBy: "Kovács János",
            date: "2025-08-01",
            type: "DOCX",
            size: "500 KB",
        },
        {
            id: "3",
            name: "Szabályzat",
            createdBy: "Lakóközösség",
            date: "2025-02-15",
            type: "PDF",
            size: "750 KB",
        },
        {
            id: "4",
            name: "Éves jelentés",
            createdBy: "Karbantartás",
            date: "2025-03-20",
            type: "DOCX",
            size: "1.1 MB",
        },
        {
            id: "5",
            name: "Közös költség számla",
            createdBy: "Papp István",
            date: "2025-04-10",
            type: "PDF",
            size: "800 KB",
        },
        {
            id: "6",
            name: "Tűzvédelmi előírások",
            createdBy: "Németh Eszter",
            date: "2025-05-12",
            type: "PDF",
            size: "1.3 MB",
        },
        {
            id: "7",
            name: "Vállalkozói szerződés",
            createdBy: "Szabó Péter",
            date: "2025-06-25",
            type: "DOCX",
            size: "600 KB",
        },
        {
            id: "8",
            name: "Parkolási rendelet",
            createdBy: "Lakóközösség",
            date: "2025-07-15",
            type: "PDF",
            size: "900 KB",
        },
        {
            id: "9",
            name: "Közgyűlési jelenléti ív",
            createdBy: "Kovács János",
            date: "2025-08-11",
            type: "DOCX",
            size: "400 KB",
        },
        {
            id: "10",
            name: "Személyzeti szabályzat",
            createdBy: "Kiss Balázs",
            date: "2025-09-01",
            type: "PDF",
            size: "1.4 MB",
        },
        {
            id: "11",
            name: "Építési engedély",
            createdBy: "Varga Gábor",
            date: "2025-01-22",
            type: "PDF",
            size: "1.0 MB",
        },
        {
            id: "12",
            name: "Karbantartási napló",
            createdBy: "Major Erika",
            date: "2025-02-18",
            type: "DOCX",
            size: "700 KB",
        },
        {
            id: "13",
            name: "Hulladékkezelési szabályok",
            createdBy: "Karbantartás",
            date: "2025-03-08",
            type: "PDF",
            size: "650 KB",
        },
        {
            id: "14",
            name: "Általános szerződési feltételek",
            createdBy: "Lakóközösség",
            date: "2025-04-30",
            type: "DOCX",
            size: "1.5 MB",
        },
        {
            id: "15",
            name: "Vállalati beszámoló",
            createdBy: "Szűcs Réka",
            date: "2025-05-21",
            type: "PDF",
            size: "900 KB",
        },
        {
            id: "16",
            name: "Technikai leírás",
            createdBy: "Fekete Lajos",
            date: "2025-06-13",
            type: "DOCX",
            size: "850 KB",
        },
        {
            id: "17",
            name: "Biztonsági előírások",
            createdBy: "Horváth Éva",
            date: "2025-07-01",
            type: "PDF",
            size: "950 KB",
        },
        {
            id: "18",
            name: "Éves karbantartási terv",
            createdBy: "Nagy Éva",
            date: "2025-08-14",
            type: "DOCX",
            size: "1.2 MB",
        },
        {
            id: "19",
            name: "Közös képviseleti szerződés",
            createdBy: "Kovács János",
            date: "2025-09-03",
            type: "PDF",
            size: "600 KB",
        },
        {
            id: "20",
            name: "Munkavédelmi szabályzat",
            createdBy: "Kiss Balázs",
            date: "2025-09-10",
            type: "DOCX",
            size: "700 KB",
        },
    ]);

   

    return (
        <div className="flex flex-col min-h-screen px-6 ">
            <MainPageHeader />
            <div className="grid grid-cols-2 gap-6 px-4 my-4">
                {/* Bal oldali oszlop */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2">
                        <div className="shadow-2xl rounded-md w-[60%] h-96 overflow-hidden grid grid-cols-2 justify-between items-center">
                            <p className="col-start-1 col-end-12 text-center">
                                Összes parkoló száma: 43
                            </p>
                            <DoughnutChart title="Normál"/>
                            <DoughnutChart title="Elektromos" />
                        </div>
                     <EventCalendar/>
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
                            dataTableValue={tasks}
                            title={"Feladatok"}
                            type="tasks"
                        />
                        {/*<DataTableSchema dataTableValue={residents} title={"Lakók"} type="residents" />*/}
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
