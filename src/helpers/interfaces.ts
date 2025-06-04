export interface RowInputs {
    accountNumber: string;
    description: string;
    debit?: unknown;
    credit?: unknown
}

export interface ValidationData {

    journalNumber: number,
    refrences: string,
    notes: string;
    accounts: RowInputs[];

}