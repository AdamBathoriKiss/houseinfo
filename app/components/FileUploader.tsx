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
				className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
				onClick={() => setOnShow(true)}
			/>
			{onShow && (
				<Dialog
					header="Dokumentum feltöltése"
					headerClassName="!bg-[#343d4a] "
					visible={onShow}
					className="w-[35vw]"
					onHide={() => setOnShow(false)}
				>
					<FileUpload
						name="demo[]"
						url={"/api/upload"}
						multiple
						headerClassName="!bg-[#343d4a]"
						contentClassName="!bg-[#343d4a]"
						chooseLabel="Fájl kiválasztása"
						uploadLabel="Feltöltés"
						cancelLabel="Mégse"
						accept="image/*"
						maxFileSize={1000000}
						emptyTemplate={<p className="mb-3">Drag and drop files to here to upload.</p>}
					/>
				</Dialog>
			)}
		</React.Fragment>
	);
}
