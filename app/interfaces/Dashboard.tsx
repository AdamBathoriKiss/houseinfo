export interface Residents {
	id: string;
	name: string;
	address: string;
	phoneNumber: string;
	email: string;
	birthOfDate: string;
}

export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	phone: string | null;
	role: string;
	// ... többi mező ha kell
}

export interface News {
	id: string;
	title: string;
	publishedAt: string;
	author?: User;
	authorId?: number;
	content: string;
}

export interface Parking {
	id?: number;
	spotNumber: string;
	type: string;
	isOccupied: boolean;
	createdAt: Date;
	buildingId: number
}

export interface Maintence {
	id: string;
	title: string;
	deadline: string;
	status: string;
	description: string;
	reportedBy: User;
	reportedById: string;
	priority: string;
}

export interface Event {
	id?: number;
	title: string;
	description: string;
	startTime: Date;
	endTime?: Date;
	organizerId: number | string;
	buildingId: number;
}

export interface Bills {
	id: string;
	accountNumber: string;
	amount: number;
	invoiceDate: string;
	paymentDeadline: string;
	status: string;
}

export interface Documents {
	id: string;
	name: string;
	createdBy: string;
	date: string;
	type: string;
	size: string;
}

export interface ChartData {
	parkings: number;
	normalParkings: number;
	occupiedNormal: number;
	freeNormal: number;
	electricParkings: number;
	occupiedElectric: number;
	freeElectric: number;
}

export interface FinanceReports {
	financeIncomes: Array<{
		paidDate: string;
		amount: string;
	}>;
	financeOutcomes: Array<{
		paidDate: string;
		amount: string;
	}>;
}
