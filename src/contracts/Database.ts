import { 
    Sequelize, ModelCtor
} from 'sequelize-typescript'

import fs from 'fs'

const model: Record<string, ModelCtor> = {}

enum dialects {
    db2 = 'db2',  mariadb = 'mariadb', 
    mssql = 'mssql', mysql = 'mysql', 
    oracle = 'oracle', postgres = 'postgres', 
    snowflake = 'snowflake', sqlite = 'sqlite'
}

export class Database extends Sequelize {
    
    public constructor(data: { database?: string, dialect: string, username?: string, password?: string, storage?: string, models?: ModelCtor[] }) {
        super({ database: data.database, dialect: data.dialect as dialects, password: data.password, models: data.models, storage: data.storage })

        if(data.storage != undefined) {
            if(!fs.existsSync(data.storage)){
                this.sync({ force: true }).then(result => {
                    console.log(`<< Database SQLITE3 initialize >>`)
                })
            }
        }
    }

    public async reload() {
        await this.sync({ force: true })
    }
}

