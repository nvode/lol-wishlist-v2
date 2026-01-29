import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('lol_wishlist.db');

export const initDb = async () => {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS champions (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      alias TEXT,
      description TEXT,
      squarePortraitPath TEXT,
      is_favorited INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skins (
      id INTEGER PRIMARY KEY NOT NULL,
      champion_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      rarity TEXT,
      is_legacy INTEGER,
      splashPath TEXT,
      tilePath TEXT,
      loadScreenPath TEXT,
      description TEXT,
      is_owned INTEGER DEFAULT 0,
      is_wishlisted INTEGER DEFAULT 0,
      FOREIGN KEY (champion_id) REFERENCES champions (id)
    );
  `);
};
