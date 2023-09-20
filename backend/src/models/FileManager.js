const AbstractManager = require("./AbstractManager");

class FileManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.connection.query(
      `SELECT
 
    v.*,
    c.id AS category_id,
    c.name AS category_name,
    c.img AS category_img,
    c.description AS category_description
FROM videos v
JOIN category c ON v.category_id = c.id
 `
    );
  }

  find(id) {
    return this.connection.query(
      `SELECT
      v.*,
      c.id AS category_id,
      c.name AS category_name,
      c.img AS category_img,
      c.description AS category_description
  FROM videos v
  JOIN category c ON v.category_id = c.id
  WHERE v.id = ${id};
  
 `
    );
  }

  insert(videos, videoName, imgVideoName) {
    return this.connection.query(
      `insert into ${this.table} (url, name, description, img, promote, category_id ) values (?, ?, ?, ?,?, ?)`,
      [
        videoName,
        videos.name,
        videos.description,
        imgVideoName,
        videos.promote,
        videos.category_id,
      ]
    );
  }

  promotedVideo() {
    return this.connection.query(
      `select * from  ${this.table} where promote=1 ORDER BY creation_date DESC LIMIT 10`
    );
  }

  updatePromote(videos) {
    return this.connection.query(
      `update ${this.table} set promote= ? where id = ?`,
      [videos.promote, videos.id]
    );
  }
}

module.exports = FileManager;
