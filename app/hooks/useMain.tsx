import { useEffect, useState } from "react";
import BuildingService from "~/services/buildings.service";
import { useAuth } from "~/utils/AuthProvider";
import { jwtDecode } from "jwt-decode";

export interface House {
    id: string | number;
    name: string;
}

export default function useMain() {
    const { token } = useAuth();
    const [houses, setHouses] = useState<House[] | null>(null);
    const [userId, setUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            setUserId(undefined);
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            fetchHouses(userId);

            //console.log("Decoded userId:", userId);
        }
    }, [userId]);

    const fetchHouses = (id: string) => {
        BuildingService.getBuildings(id)
            .then((response) => {
                setHouses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching buildings:", error);
            });
    };

    return { houses };
}
