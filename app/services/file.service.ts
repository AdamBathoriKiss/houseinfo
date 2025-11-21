import axiosInstance from "~/api/axiosInstance";

const getDocument = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/documents/download/${id}`, {
            responseType: 'blob', // FONTOS: blob-ként kell fogadni!
        });
        
        // Fájlnév kinyerése a Content-Disposition header-ből
        const contentDisposition = response.headers['content-disposition'];
        let fileName = `document_${id}`;
        
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (fileNameMatch && fileNameMatch[1]) {
                fileName = fileNameMatch[1];
            }
        }
        
        // Blob létrehozása és letöltés indítása
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(url);
        
        return response;
    } catch (error) {
        console.error('Fájl letöltési hiba:', error);
        throw error;
    }
};

const FileService = {
    getDocument,
};

export default FileService;