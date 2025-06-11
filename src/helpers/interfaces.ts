export interface RowInputs {
    accountNumber: string;
    description: string;
    debit?: number;
    credit?: number
}

export interface ValidationData {

    journalNumber: number;
    refrences: string;
    notes: string;
    accounts: RowInputs[];

}
