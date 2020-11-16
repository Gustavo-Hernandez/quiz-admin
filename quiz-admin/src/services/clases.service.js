import {database} from '../api/firebase' 

const db = database.ref("/"+localStorage.getItem('email') + "/clases");

class ClaseDataService {
  getAll() {
    return db;
  }

  create(clase) {
    return db.push(clase);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ClaseDataService();