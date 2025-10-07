import { Card } from 'primereact/card';

export default function MainPageHeader() {
    return (
                    <div className="grid grid-cols-4 mt-4">
                        <Card className="!bg-[#777BF1]/70 m-4 h-35 rounded-lg">
                            <div className="flex flex-row justify-between">
                                <p className="text-gray-100 font-bold">Bevétel</p>
                                <i className="pi pi-wallet mr-2"></i>
                            </div>
                            <p className="text-gray-100 !text-3xl">2.543.345 Ft</p>
                        </Card>
                        <Card className="!bg-[#343d4a] m-4 h-35 rounded-lg">
                            <div className="flex flex-row justify-between">
                                <p className="text-gray-400 font-bold">
                                    Aktív feladatok
                                </p>
                                <i className="pi pi-list-check mr-2"></i>
                            </div>
                            <p className="text-gray-400 !text-3xl">22 db</p>
                        </Card>
                        <Card className="!bg-teal-400/70 m-4 h-35 rounded-lg">
                            <div className="flex flex-row justify-between">
                                <p className="text-gray-100 font-bold">Kiadás</p>
                                <i className="pi pi-money-bill mr-2"></i>
                            </div>
                            <p className="text-gray-100 !text-3xl">2.543.345 Ft</p>
                        </Card>
                        <Card className="!bg-[#343d4a] m-4 h-35 rounded-lg">
                            <div className="flex flex-row justify-between">
                                <p className="text-gray-400 font-bold">
                                    Applikáción regisztrált
                                </p>
                                <i className="pi pi-user mr-2"></i>
                            </div>
                            <p className="text-gray-400 !text-3xl">315 fő</p>
                        </Card>
                    </div>
    )
}