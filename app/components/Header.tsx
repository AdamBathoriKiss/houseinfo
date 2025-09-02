import { FaUser } from "react-icons/fa6";
import { NavLink } from "react-router";
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
        

interface House {
    id: number;
    name: string;
}

const houses = [
    { id: 1, name: "House 1"},
    { id: 2, name: "House 2"},
    { id: 3, name: "House 3"},
    { id: 4, name: "House 4"},
    { id: 5, name: "House 5"},
    { id: 6, name: "House 6"},
    { id: 7, name: "House 7"},
    { id: 8, name: "House 8"},
    { id: 9, name: "House 9"},
]

export default function Header() {
  const [visible, setVisible] = useState(false);

    return (

    <header className="pb-3">
       <nav aria-label="Global" className="flex items-center px-3 justify-between">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img src="/houseinfologo.png" alt="House-Info logo" className="h-15 p-0 w-auto" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200">
          <span className="sr-only">Open main menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" className="size-6">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">

     {houses.length <= 3 ? houses.map((house: House) => (
  <NavLink key={house.id} to="/" className="text-sm/6 font-semibold text-dark">
    {house.name}
  </NavLink>
)) : (
  <>
    {houses.slice(0, 3).map((house: House) => (
      <NavLink key={house.id} to="/main" className="text-sm/6 font-semibold text-dark">
        {house.name}
      </NavLink>
    ))}
    <span className="text-sm/6 font-semibold text-dark" onClick={()=>setVisible(true)}>...</span>
  </>
)}
       
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end px-3 gap-4">
        <a href="#" className="text-sm/6 font-semibold text-dark justify-items-center flex gap-4">
        UserName
        <FaUser className="my-auto"/>
        </a>
      </div>
    </nav>
   <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
               {houses.slice(3, houses.length).map((house: House) => (
                <NavLink key={house.id} to="/" className="text-sm/6 font-semibold text-dark block my-2">
                  {house.name}
                </NavLink>
              ))}
            </Dialog>

    </header>
    

  );
    
}