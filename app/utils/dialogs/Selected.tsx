import { Dialog } from "primereact/dialog";
import Maintences from "~/components/Maintences";
import Announcements from "~/components/Announcements";
import type { Maintence, News } from "~/interfaces/Dashboard";

interface Selected {
  id: number | null;
  title: string;
  onViewDialogOpened: boolean;
  setOnViewDialogOpened: (onViewDialogOpened: boolean) => void;
  selectedItem: News | Maintence | null;
  setSelectedItem: (selectedItem: News | Maintence | null) => void;
  isNews: (item: News | Maintence) => item is News;
  buildingId: number;
}

export default function Selected({
  id,
  title,
  onViewDialogOpened,
  setOnViewDialogOpened,
  selectedItem,
  setSelectedItem,
  isNews,
  buildingId
}: Selected) {
  return (
   <Dialog
  header={title}
  visible={onViewDialogOpened}
  onHide={() => {
    setOnViewDialogOpened(false);
    setSelectedItem(null);
  }}
  style={{ 
    width: '90vw', 
    maxWidth: '800px',
    minHeight: '60vh',
    maxHeight: '90vh'
  }}
  modal
  className="!bg-[#2a3441] text-gray-200 shadow-2xl border-0"
  contentStyle={{ 
    height: 'auto', 
    maxHeight: '80vh',
    padding: 0,
    backgroundColor: '#2a3441'
  }}
  headerStyle={{ 
    backgroundColor: '#2a3441',
    color: 'white',
    borderBottom: '1px solid #3a4759',
    padding: '1rem 1.5rem',
    fontWeight: 600,
    fontSize: '1.1rem'
  }}
  draggable={false}
  resizable={false}
  breakpoints={{
    '960px': '90vw',
    '640px': '95vw'
  }}
/>

  );
}
