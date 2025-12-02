import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import type { FileUploadHandlerEvent } from "primereact/fileupload";
import React, { useRef, useState } from "react";
import { useToast } from "~/utils/ToastProvider";

export default function FileUploader({
    buildingId,
    uploadedBy
}: {
    buildingId: number | null;
    uploadedBy?: string | number;
}) {
    const [onShow, setOnShow] = useState(false);
    const { showSuccess, showError } = useToast();
    const fileUploadRef = useRef<FileUpload>(null);

    const customUploadHandler = async (event: FileUploadHandlerEvent) => {
        const formData = new FormData();
        
        const files = event.files;
        files.forEach((file) => {
            formData.append('documents', file);
        });
        
        if (buildingId) {
            formData.append('buildingId', buildingId.toString());
        }
        if (uploadedBy) {
            formData.append('uploadedBy', uploadedBy.toString());
        }

        try {
            const response = await fetch('http://localhost:3000/api/documents/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            showSuccess('Sikeres fájlfeltöltés!');
            
            fileUploadRef.current?.clear();
            setOnShow(false);
        } catch (error) {
            showError('Hiba történt a feltöltés során.');
            console.error('Upload error:', error);
        }
    };

    return (
        <React.Fragment>
            <Button
                icon="pi pi-upload"
                unstyled
                tooltip="Dokumentum feltöltése"
                className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30 !mx-2 !px-0"
                onClick={() => setOnShow(true)}
            />
            {onShow && (
                <Dialog
                    header="Dokumentum feltöltése"
                    headerClassName="!bg-[#343d4a]"
                    contentClassName="!p-0"
                    visible={onShow}
                    className="w-[35vw]"
                    onHide={() => setOnShow(false)}
                >
                    <FileUpload
                        ref={fileUploadRef}
                        name="documents"
                        multiple
                        customUpload
                        uploadHandler={customUploadHandler}
                        headerClassName="!w-full !bg-[#343d4a]"
                        contentClassName="!w-full !bg-[#343d4a]"
                        chooseLabel="Fájl kiválasztása"
                        uploadLabel="Feltöltés"
                        cancelLabel="Mégse"
                        accept="application/pdf,.docx"
                        maxFileSize={5000000}
                        emptyTemplate={<p className="m-0">Húzd ide a fájlokat a feltöltéshez.</p>}
                    />
                </Dialog>
            )}
        </React.Fragment>
    );
}