import { Sequelize } from "sequelize";

const db = new Sequelize("tugas3-123220019", "root", "kelompok-9-tcc", {
  host: "34.30.70.247",
  dialect: "mysql",
  timezone: "+07:00",
});

export default db;
