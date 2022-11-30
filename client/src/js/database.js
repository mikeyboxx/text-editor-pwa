import { openDB } from 'idb';

// checks if database already exists, if not then create the database and object store
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

// checks the object store if object exists.
// if objects exists then overwrite with content, otherwise create a new object
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

// retrieves the object from the object store, if not found return null
export const getDb = async () => {
  try {
    const jateDb = await openDB('jateDB', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    const request = await store.get(1);
    if (request) console.log('🚀 - data retrieved from the database'); 

    return !request ? null : request.content;
  } 
  catch (err) {
    console.log(err);
  }
}

initdb();