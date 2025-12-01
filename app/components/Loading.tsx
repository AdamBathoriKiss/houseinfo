import { Skeleton } from 'primereact/skeleton';

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen bg-surface-ground px-2 sm:px-4 md:px-6 py-4">

            {/* DASHBOARD HEADER – csak desktopon */}
            <Skeleton className="hidden md:block mb-6 h-24 rounded-xl" />

            {/* Fő GRID - mobilon 1 oszlop, desktopon 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 px-4">

                {/* JOBB OSZLOP – mobilon felül */}
                <div className="order-1 lg:order-2 space-y-4">
                    <Skeleton className="h-40 rounded-xl" />
                    <Skeleton className="h-40 rounded-xl" />
                </div>

                {/* BAL OSZLOP – mobilon alul */}
                <div className="order-2 lg:order-1 space-y-4">
                    {/* Parkings + Calendar */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Skeleton className="h-40 rounded-xl" />
                        <Skeleton className="h-[47vh] rounded-xl" />
                    </div>
                    {/* Diagramok */}
                    <Skeleton className="h-[47vh] rounded-xl" />
                </div>
            </div>

            {/* Dokumentumok – teljes szélesség */}
            <Skeleton className="w-full mt-6 px-4 h-[280px] sm:h-[300px] lg:h-[340px] rounded-2xl" />
        </div>
    );
}
