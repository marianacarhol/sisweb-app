import {Table, Model, Column, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, HasMany, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Donation } from '../models/donation';
import { ProductType } from './productType';

interface ProductAttributes{
  id: number;
  nombre: string;
  cantidad: number;
  productTypeId: number;
  updatedAt: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'>{}

@Table ({
  tableName: "Products"
})
export class Product extends Model<ProductAttributes, ProductCreationAttributes>{

  // Here, TS infers Data Type from the JS Type
  // The ! means that the variable title wont be null or undefine. 
   @Column
   nombre!: string;

   @Column
   cantidad!: number;
   
   @HasMany(() => Donation, { onDelete: 'CASCADE' })
   donaciones?: Donation[];

   @ForeignKey(() => ProductType)
   @Column
   productTypeId!: number;

   @BelongsTo(() => ProductType, { onDelete: 'CASCADE' })
   productType!: ProductType;

   @CreatedAt
   @Column
   createdAt!: Date;
 
   @UpdatedAt
   @Column
   updatedAt!: Date;
}