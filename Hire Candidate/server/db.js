import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';

const file = join(process.cwd(), 'db.json');
const adapter = new JSONFile(file);

// Pass default data to Low constructor to avoid missing default data error
const db = new Low(adapter, { candidates: [] });

await db.read(); // Reads db.json or initializes with default data

export default db;
