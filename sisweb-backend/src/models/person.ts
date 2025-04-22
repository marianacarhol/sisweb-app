import {Table, Model, Column, CreatedAt, UpdatedAt, HasMany, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import {Donation} from '../models/donation' //Tabla intermedia

interface PersonAttributes{
  id: number;
  nombre: string;
  rol: boolean; //true = donador, false = consumidor
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'>{}

@Table ({
  tableName: "Person"
})
export class Person extends Model<PersonAttributes, PersonCreationAttributes>{

   @Column
   nombre!: string;

   @Column
   rol!: number;

   @HasMany(() => Donation, { onDelete: 'CASCADE' })
   donaciones?: Donation[];
   
   @CreatedAt
   @Column
   createdAt!: Date;
 
   @UpdatedAt
   @Column
   updatedAt!: Date;
  } 