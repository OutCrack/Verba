import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("verba.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS verba (id INTEGER PRIMARY KEY NOT NULL, norwegian TEXT NOT NULL, english TEXT NOT NULL, category TEXT, partOfSpeech TEXT, description TEXT, imageUri TEXT, favorite INTEGER, dateAdded TEXT NOT NULL);",
        [],
        // SUCCESS FUNCTION
        () => {
          resolve();
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertVerba = (
  norwegian,
  english,
  category,
  partOfSpeech,
  description,
  imageUri,
  favorite,
  dateAdded
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO verba (norwegian, english, category, partOfSpeech, description, imageUri, favorite, dateAdded) VALUES (?,?,?,?,?,?,?,?);",
        [norwegian, english, category, partOfSpeech, description, imageUri, favorite, dateAdded],
        // SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const updateVerba = (
  id,
  norwegian,
  english,
  category,
  partOfSpeech,
  description,
  imageUri,
  favorite
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE verba SET norwegian = ?, english = ?, category = ?, partOfSpeech = ?, description = ?, imageUri = ?, favorite = ? WHERE id = ?;`,
        [
          norwegian,
          english,
          category,
          partOfSpeech,
          description,
          imageUri,
          favorite,
          id,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const removeVerba = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM verba WHERE id = ?;`,
        [id],
        // SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchVerba = (props) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        props,
        [],
        // SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
