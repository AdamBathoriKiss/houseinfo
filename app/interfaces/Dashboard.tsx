export interface Residents {
	id: string;
	name: string;
	address: string;
	phoneNumber: string;
	email: string;
	birthOfDate: string;
}

export interface News {
	id: string;
	title: string;
	publishedAt: string;
	createdBy: string;
	content: string;
}

export interface Maintence {
	id: string;
	title: string;
	deadline: string;
	status: string;
	description: string;
	responsible: string;
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
