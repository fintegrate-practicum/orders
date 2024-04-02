export class Order{
    static collectionName = "Orders";
    status: boolean;
    destinationAddress:{
        city:string,
        street:string,
        numBuild:number
    };
    date: Date;
}