// useCommonProcesses.ts
import { useToast } from "~/utils/ToastProvider";
import CommonService from "~/services/common.service";
import type { News, Maintence } from "~/interfaces/Dashboard";

export const useCommonProcesses = () => {
    const { showSuccess, showError } = useToast();

    const remove = (type: string, id: string | number) => {
        CommonService.remove(type, id)
            .then((response) => {
                if (response) {
                    showSuccess("Sikeres elem törlés!");
                    window.location.reload();
                } else {
                    showError("Hiba történt a törlés közben", response.error);
                }
            })
            .catch((error) => {
                showError("Hiba történt", error.message || "Ismeretlen hiba");
            });
    };

    const create = (type: string, id: string | number, body: News | Maintence)=>{
        CommonService.create(type, id, body).then((response) => {
            if(response){
                showSuccess('Sikeres létrehozás')
            }else {
                showError('Sikertelen létrehozás')
            }
        }).catch((error) => {
                showError('Sikertelen létrehozás', error)
        })
    }

    return { remove, create };
};