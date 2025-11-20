import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import React, { useState } from "react";

export default function FileUploader() {
	const [onShow, setOnShow] = useState(false);

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
					headerClassName="!bg-[#343d4a] "
					contentClassName="!p-0"
					visible={onShow}
					className="w-[35vw]"
					onHide={() => setOnShow(false)}
				>
					<FileUpload
						name="documents"
						url={"http://localhost:3000/api/upload"}
						multiple
						headerClassName="!w-full !bg-[#343d4a]"
						contentClassName="!w-full !bg-[#343d4a]"
						chooseLabel="Fájl kiválasztása"
						uploadLabel="Feltöltés"
						cancelLabel="Mégse"
						accept="application/pdf,.docx"
						maxFileSize={5000000}
							emptyTemplate={<p className="mb-3">Húzd ide a fájlokat a feltöltéshez.</p>}
						onUpload={(e) => {
							console.log('Sikeres feltöltés!', e);
							// Itt frissítheted az állapotot, bezárhatod a dialogot stb.
						}}
						onError={(e) => {
							console.error('Feltöltési hiba:', e);
						}}
					/>
				</Dialog>
			)}
		</React.Fragment>
	);
}
