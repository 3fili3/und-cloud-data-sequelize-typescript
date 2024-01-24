import { Sequelize, ModelCtor, Model, Table, Column, CreatedAt, PrimaryKey, AutoIncrement, UpdatedAt, DataType } from 'sequelize-typescript'
// import {} from 

const model: Record<string, ModelCtor> = {}

enum dialects {
    db2 = 'db2',  mariadb = 'mariadb', 
    mssql = 'mssql', mysql = 'mysql', 
    oracle = 'oracle', postgres = 'postgres', 
    snowflake = 'snowflake', sqlite = 'sqlite'
}

export class Database extends Sequelize {
    
    public constructor(data: { database?: string, dialect: string, username?: string, password?: string, storage?: string, models?: ModelCtor[] }) {
        super({ database: data.database, dialect: data.dialect as dialects, password: data.password, models: data.models })
    }
}

interface IPeople {
    pkPeople?: number,
    name: string, 
    createdAt?: Date, 
    updatedAt?:Date
}

export class ValidatorPeople {
    
}

@Table
export class People extends Model<IPeople> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    pkPeople!: number

    @Column(DataType.STRING)
    name!:string

    @CreatedAt
    @Column(DataType.DATE)
    createdAt?: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt?: Date;
}