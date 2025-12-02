import { Skeleton } from 'primereact/skeleton';

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen bg-surface-ground px-2 sm:px-4 md:px-6 py-4">

            <Skeleton className="hidden md:block mb-6 h-24 rounded-xl" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 px-4">

                <div className="order-1 lg:order-2 space-y-4">
                    <Skeleton className="h-40 rounded-xl" />
                    <Skeleton className="h-40 rounded-xl" />
                </div>

                <div className="order-2 lg:order-1 space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Skeleton className="h-40 rounded-xl" />
                        <Skeleton className="h-[47vh] rounded-xl" />
                    </div>
                    <Skeleton className="h-[47vh] rounded-xl" />
                </div>
            </div>
            <Skeleton className="w-full mt-6 px-4 h-[280px] sm:h-[300px] lg:h-[340px] rounded-2xl" />
        </div>
    );
}
