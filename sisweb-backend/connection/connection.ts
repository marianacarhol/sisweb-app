import { Sequelize } from "sequelize-typescript";
import { Product } from "../src/models/product";
import { Person } from "../src/models/person";
import { Donation } from "../src/models/donation";
import { ProductType } from "../src/models/productType";

const connection = new Sequelize({
    database: 'sisweb_db',
    dialect: 'mysql',
    username: 'sisweb_user',
    password: '12345',
    host: 'localhost',
    port: 3306,
    //storage: ':memory:',
    models: [
        Product,
        Person,
        Donation,
        ProductType
    ]
});

async function connectionDB(){
    try{
    await connection.sync();
    }catch(e){
    console.log(e);
    }
} 

export default connectionDB;