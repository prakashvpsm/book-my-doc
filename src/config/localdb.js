import Dexie from 'dexie';
export const localDB = new Dexie('spur');

localDB.version(1).stores({
    slots: '++id, startTime, endTime, docId',
});


