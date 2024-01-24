import { 
    Model, Table, Column, 
    CreatedAt, PrimaryKey, 
    AutoIncrement, UpdatedAt, 
    DataType, Default, ForeignKey, 
    BelongsTo, HasMany 
} from 'sequelize-typescript'

interface IPeople {
    pkPeople?: Number, 
    name: String, createdAt?: Date, updatedAt?: Date
}

@Table({ timestamps: true })
export class People extends Model<IPeople> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    pkPeople?: Number

    @Column(DataType.STRING)
    name!:String

    @CreatedAt
    @Default(new Date())
    @Column(DataType.DATE)
    createdAt?: Date;

    @UpdatedAt
    @Default(new Date())
    @Column(DataType.DATE)
    updatedAt?: Date;

    @HasMany(() => User)
    User!: User[]
}

interface IUser {
    pkUser?: Number, fkPeople: Number
    username: String, password: String, 
    createdAt?: Date, updatedAt?: Date
}

@Table({ timestamps: true })
export class User extends Model<IUser> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    pkUser?: Number

    @Column(DataType.STRING)
    username!:String

    @Column(DataType.STRING)
    password!:String

    @ForeignKey(() => People)
    @Column(DataType.NUMBER)
    fkPeople!: Number

    @BelongsTo(() => People)
    people!: People


    @CreatedAt
    @Default(new Date())
    @Column(DataType.DATE)
    createdAt?: Date;

    @UpdatedAt
    @Default(new Date())
    @Column(DataType.DATE)
    updatedAt?: Date;
}