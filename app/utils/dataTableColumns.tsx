// Lakók
const residentCols = [
  { field: 'name', header: 'Név' },
  { field: 'address', header: 'Lakcím' },
  { field: 'phoneNumber', header: 'Telefonszám' },
  { field: 'email', header: 'Email' }
];

const residentExpandedCols = [
  ...residentCols,
  { field: 'dateOfBirth', header: 'Születési dátum' },
  { field: 'id', header: 'Azonosító' }
];

// Hírek
const newsCol = [
  { field: 'title', header: 'Cím' },
  { field: 'date', header: 'Dátum' },
  { field: 'createdBy', header: 'Szerző' }
];

const newsExpandedCols = [
  ...newsCol,
  { field: 'content', header: 'Tartalom' }
];

// Feladatok
const taskCols = [
  { field: 'title', header: 'Cím' },
  { field: 'deadline', header: 'Határidő' },
  { field: 'status', header: 'Állapot' }
];

const taskExpandedCols = [
  ...taskCols,
  { field: 'description', header: 'Leírás' },
  { field: 'responsible', header: 'Felelős' }
];

// Számlák
const billCols = [
  { field: 'accountNumber', header: 'Számlaszám' },
  { field: 'Amount', header: 'Összeg' },
  { field: 'invoiceDate', header: 'Kiadás dátuma' },
  { field: 'paymentDeadline', header: 'Fizetési határidő' }
];

const billExpandedCols = [
  ...billCols,
  { field: 'status', header: 'Állapot' }
];

// Dokumentumok
const documentCols = [
  { field: 'id', header: 'Azonosító' },
  { field: 'fileName', header: 'Dokumentum neve' },
  { field: 'fileSize', header: 'Méret' },
  { field: 'fileType', header: 'Típus' },
  { field: 'category', header: 'Kategória' },
  { field: 'uploadedAt', header: 'Feltöltve' },
  { field: 'actions', header: 'Műveletek' },
];

const documentExpandedCols = [
  ...documentCols,
  { field: 'type', header: 'Típus' },
  { field: 'size', header: 'Méret' },
  { field: 'date', header: 'Dátum' },
  { field: 'actions', header: 'Műveletek' },
];

// Hírek
const parkingCols = [
  { field: 'type', header: 'Típus' },
  { field: 'spotNumber', header: 'Hely' },
  { field: 'isOccupied', header: 'Elérhetőség' },
  { field: 'createdAt', header: 'Létrehozva' }
];

const parkingExpandedCols = [
  ...parkingCols,
  { field: 'updatedAt', header: 'Frissítve' },
  { field: 'actions', header: 'Műveletek' },
];

export default function dataTableColumns(type:string) {
    switch(type) {
        case 'residents':
            return { columns: residentCols, expandedColumns: residentExpandedCols };
        case 'news':
            return { columns: newsCol, expandedColumns: newsExpandedCols };
        case 'parking':
            return { columns: parkingCols, expandedColumns: parkingExpandedCols };
        case 'Maintences':
            return { columns: taskCols, expandedColumns: taskExpandedCols };
        case 'bills':
            return { columns: billCols, expandedColumns: billExpandedCols };
        case 'documents':
            return { columns: documentCols, expandedColumns: documentExpandedCols };
        default:
            return { columns: [], expandedColumns: [] };
    }
}