export interface IPaymentMethod {
    id: number;
    paymentId: string;
    idempotenceKey: string;
    active: boolean; 
    cardFirstSix: string;
    cardLastFour: string;
    expYear: string;
    expMonth: string;
    cardType: string;
}