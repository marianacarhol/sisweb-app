declare module "my-types" {
    /*export interface Donation {
      id : number;
      personId : number;
      productId: number;
      cantidad: number;
      fecha: Date;
    }*/

    /*export interface Person{
      id: number;
      nombre: string;
      rol: boolean;
    }*/
   
    export interface Product {
      id: number;
      nombre: string;
      cantidad: number;
      productTypeId: number;
      updatedAt: Date;
    }

    export interface ProductType{
      id: number;
      nombre: string;
    }
  }
  