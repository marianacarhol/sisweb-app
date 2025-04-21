import { Table, Model, Column, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Person } from '../models/person';
import { Product } from '../models/product';

interface DonationAttributes {
    id : number;
    personId : number;
    productId: number;
    cantidad: number;
    fecha: Date;
}

interface DonationCreationAttributes extends Optional<DonationAttributes, 'id'> {}

@Table({
    tableName: 'Donations'
})

export class Donation extends Model<DonationAttributes, DonationCreationAttributes> {

    @ForeignKey(() => Person)
    @Column
    personId!: number;

    @ForeignKey(() => Product)
    @Column
    productId!: number;

    @Column
    cantidad!: number;

    @Column
    fecha!: Date;

    @BelongsTo(() => Person)
    persona?: Person;

    @BelongsTo(() => Product)
    producto?: Product;

    @CreatedAt
    @Column({ type: DataType.DATEONLY })
    createdAt!: string;

    @UpdatedAt
    @Column({ type: DataType.DATEONLY })
    updatedAt!: string;
}