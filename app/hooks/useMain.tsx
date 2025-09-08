
export interface House {
    id: string | number;
    name: string;
}


export default function useMain(){

const houses: House[] | null = [
 /* { id: 1, name: "Emerald Keep" },
  { id: 2, name: "Shadowmere Manor" },
  { id: 3, name: "Hársfaliget Ház" },
  { id: 4, name: "Ironfang Hold" },
  { id: 5, name: "Kőrisliget Kastély" },
  { id: 6, name: "Whisperwind Lodge" },
  { id: 7, name: "Vércse Torony" },
  { id: 8, name: "Moonspire Hall" },
  { id: 9, name: "Aranydomb Rezidencia" },*/
];

return {houses};

}