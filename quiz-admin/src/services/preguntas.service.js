import {database} from '../api/firebase' 


class PreguntaDataService {
    constructor(...args) {
        this.db = database.ref("/"+localStorage.getItem('email') + "/clases/"+args[0]+"/preguntas")
      }
  print() {
    console.log(this.db)
  }
  getAll() {
    return this.db;
  }

  create(clase) {
    return this.db.push(clase);
  }

  update(key, value) {
    return this.db.child(key).update(value);
  }

  delete(key) {
    return this.db.child(key).remove();
  }

  deleteAll() {
    return this.db.remove();
  }
}

export default PreguntaDataService;