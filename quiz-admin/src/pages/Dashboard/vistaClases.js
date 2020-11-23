import React, { useContext,useEffect,useState,useReF, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import ClaseDataService from '../../services/clases.service'

const useStyles = makeStyles((theme) => ({
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
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalpaper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));
const VistaClase = props =>{
    const callback = props.handleDataCallback
    var nombre = ''
    var descripcion = ''
    let [clases,setClases] = useState([])
    let [loading, setLoading] = useState(true)
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    useEffect(() =>{
      getData(ClaseDataService.getAll())
        .then((dato) => {
          for (let obj in dato){
            clases.push(
              <Grid item>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                  {dato[obj].nombre}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {dato[obj].descripcion}
                  </Typography>
                </CardContent>
                <CardActions>
                  
                  <Button size="small" onClick={() => callback(obj,dato[obj].nombre,dato[obj].descripcion)}>Ver Preguntas</Button>
                  <Button size="small" style={{color:"red"}} onClick={() => borrarClase(obj)}>Borrar</Button>
                </CardActions>
              </Card>
              </Grid>
            )
          } 
          
          setLoading(false)
        })
        .catch((error) => {
          console.log("The read failed: " + error);
        });
    })
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const onChangeNombre = (e) => {
        nombre = e.target.value
      }
    
      const onChangeDescripcion = (e) => {
        descripcion = e.target.value
      }
      const guardarClase = () => {
        let data = {
          nombre : nombre,
          descripcion : descripcion
        }
        ClaseDataService.create(data)
        .then(() => {
          alert("Se agrego la clase!");
          handleClose()
          window.location.reload();
        })
        .catch((e) => {
          alert("error")
          console.log(e);
        });
      }
      const borrarClase = (key) =>{
        ClaseDataService.delete(key)
        alert("Se borro la clase")
        window.location.reload()
      }
      const getData = (ref) => {
        return new Promise((resolve, reject) => {
          const onError = error => reject(error);
          const onData = snap => resolve(snap.val());
      
          ref.on("value", onData, onError);
        });
      };
      
      
        
      if(loading){
        return (<div> <CircularProgress /> </div>)
      }
        return(
          <div>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                
                {clases}
                
                <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                    <button type="button" onClick={handleOpen}>
                    <AddCircleIcon color="secondary" style={{ fontSize: 50,textAlign: "center" }} />
                    </button>
                </Grid>
                
                </Grid>
            </Grid>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              disableBackdropClick = {true}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
                }}>
            <Fade in={open}>
              <div className={classes.modalpaper}>
                <h2 id="transition-modal-title">Agregar Clase</h2>
                <form id="add-clase">
                  <label for="name" >Nombre:</label><br/>
                  <input type="text" id="name" name="name" onChange={onChangeNombre}/><br/>
                  <label for="desc" >Descripcion:</label><br/>
                  <input type="text" id="desc" name="desc" onChange={onChangeDescripcion}/><br/>
                </form>
                <br/>
                <Button variant="contained" color="secondary" onClick={handleClose} style={{marginRight: 5}}>Cerrar</Button>
                <Button variant="contained" color="primary" onClick={guardarClase}>Guardar</Button>
              </div>
            </Fade>
          </Modal>
      
            </Container>
      </div>
        )
      
}

export  {VistaClase};