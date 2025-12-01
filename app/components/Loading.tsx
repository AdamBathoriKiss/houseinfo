
import { Skeleton } from 'primereact/skeleton';
        
export default function Loading(){
    return (
            <div className="flex flex-col min-h-screen bg-surface-ground px-2 sm:px-4 md:px-6 py-4">
    
                {/* DASHBOARD HEADER – csak desktopon */}
                <Skeleton className="hidden md:block mb-6">
                </Skeleton>
    
                {/* Fő GRID - mobilon 1 oszlop, desktopon 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6  px-4">
                    {/* JOBB OSZLOP – mobilon felül */}
                    <Skeleton className="order-1 lg:order-2 space-y-4">
                        <article className="surface-card shadow-2xl rounded-xl p-1">
                        </article>
    
                        <article className="surface-card shadow-2xl rounded-xl p-1">
                        </article>
                    </Skeleton>
    
                    {/* BAL OSZLOP – mobilon alul */}
                    <Skeleton className="order-2 lg:order-1 space-y-1">
                        {/* Parkings + Calendar – mobilon egymás alatt */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <article className="surface-card shadow-2xl rounded-xl p-1 ">
                            </article>
    
                            <article className="surface-card shadow-2xl rounded-xl p-1 max-h-[47vh] overflow-hidden">
                            </article>
                        </div>
                                            {/* Diagramok – automatikus magasság */}
                        <article className="surface-card shadow-2xl rounded-xl p-1 max-h-[47vh] overflow-hidden">
                        </article>
                    </Skeleton>
                </div>
    
                {/* Dokumentumok – teljes szélesség */}
                <Skeleton className="w-full mt-6 px-4 rounded-2xl overflow-hidden">
                    <article className="surface-card shadow-2xl p-1 h-[280px] sm:h-[300px] lg:h-[340px] overflow-y-auto rounded-2xl">
                    </article>
                </Skeleton>
            </div>
        );
}