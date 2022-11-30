import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jateDB', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    const request = await store.get(1);
    
    if (!request)
      await store.add({ content });
    else 
      await store.put({ id: 1, content });
    
    console.log('🚀 - data saved to the database');
  } 
  catch (err) {
    console.log(err);
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const jateDb = await openDB('jateDB', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    const request = await store.getAll(1);
    
    return !request ? null : request.content;
  } 
  catch (err) {
    console.log(err);
  }
}

initdb();
