import createDataContext from "./createDataContext";
import quizHandler from "../api/quizHandler";
import Typography from "@material-ui/core/Typography";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "set_error":
      return { ...state, errorMessage: action.payload };
    case "set_session":
      return { errorMessage: "", session: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { errorMessage: "", token: null };
    default:
      return state;
  }
};

const joinSession = (dispatch) => async ({ formattedPin, username, history }) => {
  if(formattedPin && formattedPin.length === 9){
    try {
      const {data} = await quizHandler.post("/api/join-session", {pin:formattedPin, username});
      if(data.success){
        let {user} = data;
        localStorage.setItem("session", JSON.stringify({user, pin:formattedPin, isActive:true}));
        dispatch({type: "set_session", payload:{user, pin:formattedPin,isActive:true}});
        history.push("/app");
      }
      else{
        let errorComponent = (
          <Typography component="p" style={{color:"pink", fontWeight:"bold", marginBottom:"15px"}} variant="body2">
            {data.message}
          </Typography>
        );
        dispatch({ type: "set_error", payload: errorComponent });
      }
    } catch (error) {
     let errorComponent = (
          <Typography component="p" style={{color:"pink", fontWeight:"bold", marginBottom:"15px"}}  variant="body2">
            An error occurred
          </Typography>
        );
        dispatch({ type: "set_error", payload: errorComponent });
    }
  }else{
    let errorComponent = (
      <Typography component="h5" style={{color:"pink", fontWeight:"bold", marginBottom:"15px"}} variant="subtitle1">
        Invalid Pin
      </Typography>
    );
    dispatch({ type: "set_error", payload: errorComponent });
  }
};

const relog = (dispatch) => ({user, pin})=>{
  dispatch({type: "set_session", payload:{user, pin,isActive:true}});
}

const clearSession = (dispatch)=>()=>{
  localStorage.removeItem("session");
  dispatch({type: "set_session", payload:{isActive: false, pin: null}});
}

const clearErrorMessage = (dispatch) => () => {
  return dispatch({ type: "clear_error_message" });
};


export const { Provider, Context } = createDataContext(
  quizReducer,
  { joinSession, clearErrorMessage, relog, clearSession},
  { session: {isActive: false, pin: null}, errorMessage: "" }
);
