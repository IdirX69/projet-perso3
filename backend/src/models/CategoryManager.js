const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(img, category) {
    return this.connection.query(
      `insert into ${this.table} (name, img, description ) values (?, ?, ?)`,
      [category.name, img, category.description]
    );
  }

  update(category) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      category,
      category.id,
    ]);
  }
}

module.exports = CategoryManager;
