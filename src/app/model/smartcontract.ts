export class SmartContract{
  smartId!: number;
  trxHash: string;



  constructor(smartId: number, trxHash: string) {
    this.smartId = smartId;
    this.trxHash = trxHash;
  }

}
