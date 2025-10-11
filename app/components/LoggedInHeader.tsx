import { Card } from "primereact/card";

export default function LoggedInHeader({
    financeTotal,
    activeTasks,
    expenseTotal,
    applicationRegistered,
}: {
    financeTotal?: number;
    activeTasks?: number;
    expenseTotal?: number;
    applicationRegistered?: number;
}) {
    return (
        <div className="grid grid-cols-4 mt-4">
            <Card className="!bg-[#777BF1]/70 m-4 h-35 rounded-lg">
                <div className="flex flex-row justify-between">
                    <p className="text-gray-100 font-bold">Bevétel</p>
                    <i className="pi pi-wallet mr-2"></i>
                </div>
                <p className="text-gray-100 !text-3xl">
                    {new Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                    }).format(financeTotal ? financeTotal : 0)}
                </p>
            </Card>
            <Card className="!bg-[#343d4a] m-4 h-35 rounded-lg">
                <div className="flex flex-row justify-between">
                    <p className="text-gray-400 font-bold">Aktív feladatok</p>
                    <i className="pi pi-list-check mr-2"></i>
                </div>
                <p className="text-gray-400 !text-3xl">{activeTasks} db</p>
            </Card>
            <Card className="!bg-teal-400/70 m-4 h-35 rounded-lg">
                <div className="flex flex-row justify-between">
                    <p className="text-gray-100 font-bold">Kiadás</p>
                    <i className="pi pi-money-bill mr-2"></i>
                </div>
                <p className="text-gray-100 !text-3xl">   {new Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                    }).format(expenseTotal ? expenseTotal : 0)}</p>
            </Card>
            <Card className="!bg-[#343d4a] m-4 h-35 rounded-lg">
                <div className="flex flex-row justify-between">
                    <p className="text-gray-400 font-bold">
                        Applikáción regisztrált
                    </p>
                    <i className="pi pi-user mr-2"></i>
                </div>
                <p className="text-gray-400 !text-3xl">
                    {applicationRegistered} fő
                </p>
            </Card>
        </div>
    );
}
