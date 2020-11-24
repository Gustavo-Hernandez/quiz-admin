import React, { useContext,useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { mainListItems } from "./listItems";
import {VistaClase} from './vistaClases';
import {VistaPreguntas} from './vistaPreguntas';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as QuizContext } from "../../context/QuizContext";
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © INVEX ${new Date().getFullYear()}.`}
    </Typography>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = ({history}) => {
  const classes = useStyles();
  const {
    state: { errorMessage },
    joinSession,
  } = useContext(QuizContext);
  let [pin, setPin] = React.useState("");
  let [username, setUsername] = React.useState("");
  const [preguntas,setPreguntas] = React.useState([]);
  const [nomClase,setNomClase] =  React.useState("");
  const [desClase,setDesClase] =  React.useState("");
  const [openDialog,setOpenDialog] = React.useState(false);
  const [openDrawer,setOpenDrawer] = React.useState(false);
  const [classData,setclassData] = React.useState(null)
  const {signout} = useContext(AuthContext);
  
  
    
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handleDataCallback = (obj,nom,des) =>{
    setclassData(obj)
    setNomClase(nom)
    setDesClase(des)
  }
  const handleDelClassData = () =>{
    setclassData(null)
  }
  const handleOpenDialog = () =>{
    setOpenDialog(true)
  }
  const handleCloseDialog = () =>{
    setOpenDialog(false)
  }
  const handlePreguntas = (data) =>{
    setPreguntas(data)
  }
  const crearSesion = () =>{
    axios.post("http://localhost:8080/api/create-session", {questions:preguntas, classname:nomClase,description:desClase})
    .then( data =>{
      console.log(data)
      username =  document.getElementById('name').value
      pin = data.data.session.pin
      let formattedPin = pin.split("-").join("");
      console.log(formattedPin)
      console.log(username)
      joinSession({ formattedPin, username, history });
    })
    .catch((error) => {
      console.log(error)
    });

    
  }
  

  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              openDrawer && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          {classData != null ? <IconButton color="inherit" onClick={handleDelClassData}>
            <ArrowBackIosIcon/>
          </IconButton> : <span></span>}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          
          {classData != null ? <Button variant="contained" style={{color:"white",backgroundColor: '#f44336'}} onClick={handleOpenDialog}>
            <b>Crear Sesion de Clase</b>
          </Button>  : <span></span>}
          <IconButton color="inherit" onClick={()=>signout()}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {classData != null ? <VistaPreguntas {...{classData,handlePreguntas}}/> : <VistaClase  {...{handleDataCallback}}/>}
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear Sesion de Clase</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={crearSesion} color="primary">
            Crear sesion
          </Button>
        </DialogActions>
      </Dialog>
      </main>
      
    </div>
  );
};
export default Dashboard;
