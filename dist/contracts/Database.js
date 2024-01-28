"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const fs_1 = __importDefault(require("fs"));
const model = {};
var dialects;
(function (dialects) {
    dialects["db2"] = "db2";
    dialects["mariadb"] = "mariadb";
    dialects["mssql"] = "mssql";
    dialects["mysql"] = "mysql";
    dialects["oracle"] = "oracle";
    dialects["postgres"] = "postgres";
    dialects["snowflake"] = "snowflake";
    dialects["sqlite"] = "sqlite";
})(dialects || (dialects = {}));
class Database extends sequelize_typescript_1.Sequelize {
    constructor(data) {
        super({ database: data.database, dialect: data.dialect, password: data.password, models: data.models, storage: data.storage });
        if (data.storage != undefined) {
            if (!fs_1.default.existsSync(data.storage)) {
                this.sync({ force: true }).then(result => {
                    console.log(`<< Database SQLITE3 initialize >>`);
                });
            }
        }
    }
    reload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sync({ force: true });
        });
    }
}
exports.Database = Database;
