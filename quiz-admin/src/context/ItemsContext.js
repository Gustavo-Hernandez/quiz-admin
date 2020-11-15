import createDataContext from "./createDataContext";
import { storage, firestore } from "../api/firebase";

const itemsReducer = (state, action) => {
  switch (action.type) {
    case "set_error":
      return {...state, error: action.payload};
    case "set_folders":
      return {...state, folders: action.payload};
    case "set_items":
      return {...state, items: action.payload};  
    default:
      return state;
  }
};

const setFolders = (dispatch) =>(folders) =>{
  dispatch({type:"set_folders", payload: folders})
}
const setItems = (dispatch) =>(items) =>{
  dispatch({type:"set_items", payload: items})
}


const createItem = (dispatch) => async({name, units, unitPrice, folder, description, file})=>{
  let error = "";
  if (!name || name.length === 0) {
    error += "Invalid name.\n";
  }
  if (!units || units < 0) {
    error += "Units must not be negative.\n";
  }
  if (!unitPrice || unitPrice <= 0) {
    error += "Unit price must be greater than zero.\n"
  }
  if (!folder || folder.length === 0) { //TODO: ADD FOLDER VALIDATION
    error += "Folder does not exist.\n"
  }
  if (!description || description.length === 0) {
    description = "";
  }
  if (!file) {
    error += "You must provide an image.\n"
  }else { 
    if(!file.type.includes("image")){
      error += "File is not an image\n"
    }
    if (file.size > 200000) {
      error += "Image size should be less or equal to 200KB\n"
    }
  }
  if (error.length > 0) {
    await dispatch({type:"set_error", payload:error});
    return false;
  }else{
    try {
      const itemImagesRef = storage.ref().child(`itemImages/${new Date().getTime()+"_"+file.name}`);
      const response = await itemImagesRef.put(file);
      const url = await response.ref.getDownloadURL();
            
      firestore.collection("items").doc().set({
        name,
        units,
        unitPrice,
        folder,
        description,
        url: url.toString()
      });

    } catch (err) {
      dispatch({type:"set_error", payload:err});
    }
    await dispatch({type:"set_error", payload:""});
    return true;
  }
  
}

export const { Provider, Context } = createDataContext(
  itemsReducer,
  {setFolders, setItems, createItem},
  {error: "", items:[], folders:[]}
);
