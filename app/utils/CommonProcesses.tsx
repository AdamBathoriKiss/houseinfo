import CommonService from "~/services/common.service";
import { useToast } from "./ToastProvider";

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
            showError(error);
        });
};

const CommonProcesses = {
    remove,
};

export default CommonProcesses;
