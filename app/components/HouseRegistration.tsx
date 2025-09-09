import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Toast } from "primereact/toast";
import useHouseRegistration from "~/hooks/useHouseRegistration";

export default function HouseRegistration() {
	const {
		onSubmit,
		toast,
		propertyTypes,
		stepperRef,
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		watch,
	} = useHouseRegistration();
	return (
		<div className="h-full bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
			<Toast ref={toast} />
			<div className="max-w-4xl mx-auto h-full">
				<Stepper ref={stepperRef} className="card shadow-lg rounded-lg border-0 bg-white w-full" linear>
					<StepperPanel header="Alapadatok">
						<div className="p-4 sm:p-6 lg:p-8">
							<div className="text-center mb-8">
								<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Üdvözöljük!</h2>
								<p className="text-gray-600">Kezdjük az ingatlan alapadataival</p>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
								<div className="flex flex-col gap-2">
									<label className="font-semibold text-gray-700 text-sm">Ingatlan neve *</label>
									<input
										{...register("propertyName")}
										type="text"
										placeholder="pl. Sunshine Társasház"
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									/>
									{errors.propertyName && (
										<span className="text-red-500 text-xs">{errors.propertyName.message}</span>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<label className="font-semibold text-gray-700 text-sm">Város *</label>
									<input
										{...register("city")}
										type="text"
										placeholder="pl. Budapest"
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									/>
									{errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
								</div>

								<div className="flex flex-col gap-2">
									<label className="font-semibold text-gray-700 text-sm">Cím *</label>
									<input
										{...register("address")}
										type="text"
										placeholder="pl. Fő utca 123."
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									/>
									{errors.address && (
										<span className="text-red-500 text-xs">{errors.address.message}</span>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<label className="font-semibold text-gray-700 text-sm">Irányítószám</label>
									<input
										{...register("postalCode")}
										type="text"
										placeholder="pl. 1234"
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									/>
								</div>
							</div>

							<div className="flex pt-6 justify-end">
								<Button
									label="Következő"
									icon="pi pi-arrow-right"
									iconPos="right"
									className="px-6 py-2"
									onClick={() => stepperRef.current?.nextCallback()}
								/>
							</div>
						</div>
					</StepperPanel>

					<StepperPanel header="Ingatlan részletei">
						<div className="p-4 sm:p-6 lg:p-8">
							<div className="text-center mb-8">
								<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
									Ingatlan részletei
								</h2>
								<p className="text-gray-600">Adja meg az épület jellemzőit</p>
							</div>

							<div className="space-y-6">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
									<div className="flex flex-col gap-2">
										<label className="font-semibold text-gray-700 text-sm">Ingatlan típusa *</label>
										<select
											{...register("propertyType")}
											className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
										>
											<option value="">Válasszon típust</option>
											{propertyTypes.map((type) => (
												<option key={type.value} value={type.value}>
													{type.label}
												</option>
											))}
										</select>
										{errors.propertyType && (
											<span className="text-red-500 text-xs">{errors.propertyType.message}</span>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<label className="font-semibold text-gray-700 text-sm">Építés éve</label>
										<input
											{...register("buildingYear", {
												valueAsNumber: true,
											})}
											type="number"
											placeholder="pl. 1985"
											className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
											min="1900"
											max="2024"
										/>
										{errors.buildingYear && (
											<span className="text-red-500 text-xs">{errors.buildingYear.message}</span>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<label className="font-semibold text-gray-700 text-sm">Lakások száma *</label>
										<input
											{...register("totalUnits", {
												valueAsNumber: true,
											})}
											type="number"
											className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
											min="1"
											max="1000"
										/>
										{errors.totalUnits && (
											<span className="text-red-500 text-xs">{errors.totalUnits.message}</span>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<label className="font-semibold text-gray-700 text-sm">Szintek száma *</label>
										<input
											{...register("floors", {
												valueAsNumber: true,
											})}
											type="number"
											className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
											min="1"
											max="50"
										/>
										{errors.floors && (
											<span className="text-red-500 text-xs">{errors.floors.message}</span>
										)}
									</div>
								</div>

								<div className="flex flex-col sm:flex-row gap-4 pt-4">
									<label className="flex items-center">
										<input
											{...register("hasElevator")}
											type="checkbox"
											className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
										/>
										<span className="text-gray-700 text-sm">Van lift</span>
									</label>

									<label className="flex items-center">
										<input
											{...register("hasParking")}
											type="checkbox"
											className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
										/>
										<span className="text-gray-700 text-sm">Van parkoló</span>
									</label>
								</div>
							</div>

							<div className="flex pt-6 justify-between flex-col sm:flex-row gap-3">
								<Button
									label="Vissza"
									severity="secondary"
									icon="pi pi-arrow-left"
									className="px-6 py-2"
									onClick={() => stepperRef.current?.prevCallback()}
								/>
								<Button
									label="Következő"
									icon="pi pi-arrow-right"
									iconPos="right"
									className="px-6 py-2"
									onClick={() => stepperRef.current?.nextCallback()}
								/>
							</div>
						</div>
					</StepperPanel>

					<StepperPanel header="Pénzügyi információk">
						<div className="p-4 sm:p-6 lg:p-8">
							<div className="text-center mb-8">
								<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
									Pénzügyi információk
								</h2>
								<p className="text-gray-600">A közös költség és bankszámla adatai</p>
							</div>

							<div className="space-y-6">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
									<div className="flex flex-col gap-2">
										<label className="font-semibold text-gray-700 text-sm">
											Havi közös költség (Ft/m²) *
										</label>
										<input
											{...register("monthlyFee", {
												valueAsNumber: true,
											})}
											type="number"
											placeholder="pl. 450"
											className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
											min="0"
											max="10000"
										/>
										{errors.monthlyFee && (
											<span className="text-red-500 text-xs">{errors.monthlyFee.message}</span>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<label className="font-semibold text-gray-700 text-sm">Tartalékalap (Ft)</label>
										<input
											{...register("reserveFund", {
												valueAsNumber: true,
											})}
											type="number"
											placeholder="pl. 2500000"
											className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
											min="0"
										/>
										{errors.reserveFund && (
											<span className="text-red-500 text-xs">{errors.reserveFund.message}</span>
										)}
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<label className="font-semibold text-gray-700 text-sm">Bankszámlaszám *</label>
									<input
										{...register("bankAccount")}
										type="text"
										placeholder="pl. 12345678-12345678-12345678"
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									/>
									{errors.bankAccount && (
										<span className="text-red-500 text-xs">{errors.bankAccount.message}</span>
									)}
								</div>

								<div className="bg-blue-50 p-4 rounded-lg">
									<div className="flex">
										<div className="text-blue-600 mr-3 mt-1 text-lg">ℹ️</div>
										<div>
											<p className="text-sm text-blue-800">
												<strong>Tipp:</strong> A közös költség összegét később módosíthatja, és
												lakásonként eltérő összegeket is beállíthat.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="flex pt-6 justify-between flex-col sm:flex-row gap-3">
								<Button
									label="Vissza"
									severity="secondary"
									icon="pi pi-arrow-left"
									className="px-6 py-2"
									onClick={() => stepperRef.current?.prevCallback()}
								/>
								<Button
									label="Következő"
									icon="pi pi-arrow-right"
									iconPos="right"
									className="px-6 py-2"
									onClick={() => stepperRef.current?.nextCallback()}
								/>
							</div>
						</div>
					</StepperPanel>

					<StepperPanel header="Összefoglaló és befejezés">
						<form className="p-4 sm:p-6 lg:p-8" onSubmit={handleSubmit(onSubmit)}>
							<div className="text-center mb-8">
								<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Majdnem kész! ✅</h2>
								<p className="text-gray-600">Ellenőrizze az adatokat és fejezze be a regisztrációt</p>
							</div>

							<div className="space-y-6">
								<div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm">
										<div>
											<h4 className="font-medium text-gray-700 mb-2">Alapadatok</h4>
											<div className="space-y-1">
												<p>
													<strong>Név:</strong> {watch("propertyName")}
												</p>
												<p>
													<strong>Cím:</strong> {watch("address")} {watch("city")}
												</p>
												<p>
													<strong>Típus:</strong> {watch("propertyType")}
												</p>
											</div>
										</div>

										<div>
											<h4 className="font-medium text-gray-700 mb-2">Részletek</h4>
											<div className="space-y-1">
												<p>
													<strong>Lakások:</strong> {watch("totalUnits")} db
												</p>
												<p>
													<strong>Szintek:</strong> {watch("floors")}
												</p>
												<p>
													<strong>Havi költség:</strong> {watch("monthlyFee")} Ft/m²
												</p>
												<p className="truncate">
													<strong>Bankszámlaszám:</strong> {watch("bankAccount")}
												</p>
											</div>
										</div>
									</div>
								</div>

								<label className="flex items-start gap-3">
									<input
										{...register("termsAccepted")}
										type="checkbox"
										className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
									/>
									<span className="text-sm text-gray-700">
										Elfogadom a{" "}
										<a href="#" className="text-blue-600 hover:text-blue-800 underline">
											felhasználási feltételeket
										</a>{" "}
										és az{" "}
										<a href="#" className="text-blue-600 hover:text-blue-800 underline">
											adatvédelmi szabályzatot
										</a>
									</span>
								</label>
								{errors.termsAccepted && (
									<span className="text-red-500 text-xs block">{errors.termsAccepted.message}</span>
								)}

								<div className="flex justify-between flex-col sm:flex-row gap-3">
									<Button
										label="Vissza"
										severity="secondary"
										icon="pi pi-arrow-left"
										className="px-6 py-1"
										onClick={() => stepperRef.current?.prevCallback()}
									/>
									<Button
										label="Befejezés"
										severity="success"
										icon="pi pi-check"
										type="submit"
										className="px-6 py-1"
									/>
								</div>
							</div>
						</form>
					</StepperPanel>
				</Stepper>
			</div>
		</div>
	);
}
