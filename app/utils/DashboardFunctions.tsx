// Type guard függvények
const isNews = (item: News | Maintence): item is News => {
	return type === "news";
};

const isMaintence = (item: News | Maintence): item is Maintence => {
	return type === "maintence";
};

const renderNewsTemplate = (news: News, isHoverable = false) => {
	const hoverProps = isHoverable
		? {
				onMouseEnter: () => setHoveredItem(news),
				//onMouseLeave: () => setHoveredItem(null),
				style: { cursor: "pointer" },
			}
		: {};

	return (
		<div
			className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg hover:!bg-[#3d4651] transition-colors duration-200"
			{...hoverProps}
		>
			<div className="flex flex-row w-full justify-between items-center">
				<div className="flex flex-col gap-2">
					<div className="text-xl font-bold text-gray-100">{news.title}</div>
					<div className="text-sm text-gray-300">{news.content}</div>
					<div className="text-xs text-gray-400">
						<i className="pi pi-user mr-2"></i>
						{news.createdBy}
					</div>
				</div>
				<div className="flex flex-col items-end gap-2">
					<span className="text-sm font-semibold text-gray-100">{news.publishedAt}</span>
					{isHoverable && (
						<Button
							icon="pi pi-trash"
							tooltip="Hír törlése"
							className="p-button-rounded p-button-sm !bg-red-500  !text-white"
						/>
					)}
					{!isHoverable && (
						<div className="flex justify-center items-center gap-3">
							<Button
								icon="pi pi-eye"
								className="p-button-rounded p-button-sm"
								onClick={() => {
									setSelectedItem(news);
									setOnViewDialogOpened(true);
								}}
							/>
							<Button
								icon="pi pi-trash"
								tooltip="Hír törlése"
								className="p-button-rounded p-button-sm !bg-red-500  !text-white"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const renderMaintenceTemplate = (Maintence: Maintence, isHoverable = false) => {
	const hoverProps = isHoverable
		? {
				onMouseEnter: () => setHoveredItem(Maintence),
				//onMouseLeave: () => setHoveredItem(null),
				style: { cursor: "pointer" },
			}
		: {};

	return (
		<div
			className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg hover:!bg-[#3d4651] transition-colors duration-200"
			{...hoverProps}
		>
			<div className="flex flex-row w-full justify-between items-center">
				<div className="flex flex-col gap-2">
					<div className="text-xl font-bold text-gray-100">{Maintence.title}</div>
					<div className="text-sm text-gray-300">{Maintence.description}</div>
					{Maintence.responsible && (
						<div className="text-xs text-green-400">
							<i className="pi pi-user-plus mr-2"></i>
							Felelős: {Maintence.responsible}
						</div>
					)}
				</div>
				<div className="flex flex-col justify-center items-end">
					{isHoverable && (
						<Button
							icon="pi pi-trash"
							tooltip="Feladat törlése"
							className="p-button-rounded p-button-sm !bg-red-500  !text-white"
						/>
					)}
					{!isHoverable && (
						<div className="flex justify-center items-center gap-3">
							<Button
								icon="pi pi-eye"
								className="p-button-rounded p-button-sm"
								onClick={() => {
									setSelectedItem(Maintence);
									setOnViewDialogOpened(true);
								}}
							/>
							<Button
								icon="pi pi-trash"
								tooltip="Feladat törlése"
								className="p-button-rounded p-button-sm !bg-red-500  !text-white"
							/>
						</div>
					)}
					<div className="text-xs my-3 text-gray-400">
						<i className="pi pi-wave-pulse mr-2"></i>
						{Maintence.status}
					</div>
				</div>
			</div>
		</div>
	);
};

const itemTemplate = (item: News | Maintence, isHoverable = false) => {
	if (isNews(item)) {
		return renderNewsTemplate(item, isHoverable);
	} else if (isMaintence(item)) {
		return renderMaintenceTemplate(item, isHoverable);
	}
};

// Külön template a dialog-ban lévő DataScroller-hez (hover funkcionalitással)
const hoverableItemTemplate = (item: News | Maintence) => {
	return itemTemplate(item, true);
};

// Komponens a jobb oldali részletekhez
const renderItemDetails = () => {
	if (!hoveredItem && !createNews && !createTask) {
		return (
			<div className="flex items-center justify-center h-full text-gray-400">
				<div className="text-center">
					<i className="pi pi-info-circle text-4xl mb-4"></i>
					<p>Vigye az egeret egy elem fölé a részletek megtekintéséhez</p>
				</div>
			</div>
		);
	}

	if (createNews) {
		return (
			<div className="p-4  rounded-lg h-fit">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-bold text-gray-100 mb-4">Új hír létrehozása</h3>
					<i
						className="pi pi-times cursor-pointer"
						style={{ fontSize: "2rem" }}
						onClick={() => setCreateNews(false)}
					></i>
				</div>
				<NewsPage title="" content="" createdBy="" date="" />
			</div>
		);
	}

	if (createTask) {
		return (
			<div className="p-4  rounded-lg h-fit">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-bold text-gray-100 mb-4">Új feladat létrehozása</h3>
					<i
						className="pi pi-times cursor-pointer"
						style={{ fontSize: "2rem" }}
						onClick={() => setCreateTask(false)}
					></i>
				</div>
				<Maintences title="" description="" responsible="" status="" />
			</div>
		);
	}

	if (hoveredItem) {
		return (
			<div className="p-4  rounded-lg h-fit">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-bold text-gray-100 mb-4">Részletek</h3>
					<i
						className="pi pi-times cursor-pointer"
						style={{ fontSize: "2rem" }}
						onClick={() => setHoveredItem(null)}
					></i>
				</div>
				{isNews(hoveredItem) ? (
					<div className="space-y-3">
						<NewsPage
							title={hoveredItem.title}
							content={hoveredItem.content}
							createdBy={hoveredItem.createdBy}
							date={hoveredItem.publishedAt}
						/>
					</div>
				) : (
					<div className="space-y-3">
						<Maintences
							title={hoveredItem.title}
							description={hoveredItem.description}
							responsible={hoveredItem.responsible || ""}
							status={hoveredItem.status}
						/>
					</div>
				)}
			</div>
		);
	}
};
