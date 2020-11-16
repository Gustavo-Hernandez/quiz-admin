import React, { useContext,useEffect,useState,useReF, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';

import PreguntaDataService from '../../services/preguntas.service'
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
    ansTable: {
        display: 'table' 
    },
    ansCell: {
        display: 'table-cell'
    }
  }));




const VistaPreguntas = props =>{
    let [preguntas,setPreguntas] = useState([])
    let [loading, setLoading] = useState(true)
    const classData = props.classData
    const classes = useStyles();
    var pregunta = ""
    var incisos = ['A','B','C','D']
    var respuestas = []
    let db = new PreguntaDataService(classData)
    const [open, setOpen] = useState(false);
    const [modopen, setModopen] = useState(false);
    const modalMod = []

    const getData = (ref) => {
      return new Promise((resolve, reject) => {
        const onError = error => reject(error);
        const onData = snap => resolve(snap.val());
    
        ref.on("value", onData, onError);
      });
    };

    useEffect(() =>{
      getData(db.getAll())
      .then((dato) => {
        for (let obj in dato){
          let cont = 0
          preguntas.push(
            <Grid item>
                  <Card className={classes.root}>
                    <CardContent>
                        
                        <Typography variant="h5" component="h2">
                          {dato[obj].pregunta}
                        </Typography>
                        <Typography variant="body2" component="p" >
                         {incisos[cont]})  {dato[obj].respuestas[cont].ans} {dato[obj].respuestas[cont].corr? <CheckIcon/> : <span/> } 
                        </Typography>
                        <br/>
                        <Typography variant="body2" component="p">
                        {incisos[cont +=1]}) {dato[obj].respuestas[cont].ans} {dato[obj].respuestas[cont].corr? <CheckIcon/> : <span/> } 
                        </Typography>
                        <br/>
                        
                        <Typography variant="body2" component="p">
                        {incisos[cont +=1]}) {dato[obj].respuestas[cont].ans} {dato[obj].respuestas[cont].corr? <CheckIcon/> : <span/> } 
                        </Typography>
                        <br/>
                        <Typography variant="body2" component="p">
                        {incisos[cont +=1]}) {dato[obj].respuestas[cont].ans} {dato[obj].respuestas[cont].corr? <CheckIcon/> : <span/> } 
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleModopen(dato,obj)}>Modificar</Button>
                        <Button size="small" style={{color:"red"}} onClick={() => borrarPregunta(obj)}>Borrar</Button>
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
    const handleModopen = (dato,obj) => {
      respuestas = []
      pregunta = dato[obj].pregunta
      for(var i = 0;i<4;i ++){
        let ans = dato[obj].respuestas[i].ans
        let corr = dato[obj].respuestas[i].corr
        respuestas.push({ans,corr})
      }
      crearModal(pregunta,respuestas)
      setModopen(true)
    }
    const handleModclose = () =>{
      setModopen(false)
    }
    const crearModal = (preg,respuestas) =>{
      modalMod.push(
        <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={modopen}
              onClose={handleModclose}
              disableBackdropClick = {true}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={modopen}>
                <div className={classes.modalpaper}>
                  
                    <h2 id="transition-modal-title">Modificar Pregunta</h2>
                    <form id="add-pregunta">
                    <label for="pregunta" >Pregunta <span style={{marginLeft: 120}}>Correcta</span></label><br/>
                    <input type="text" id="name" name="name" onChange={onChangePregunta} value={preg}/><br/>
                    {() =>{
                      let html = []
                      let cont = 0
                      for(let res in respuestas){
                        html.push(
                          <div className={classes.ansTable}>
                              <label for={"ans" + incisos[cont]} >{incisos[cont]})</label><br/>
                              <input type="text" id={"ans" + incisos[cont]} name={"ans" + incisos[cont]} className={classes.ansCell} value={res.ans}/>
                              <input type="checkbox" id="isCorrA" name="isCorrA" className={classes.ansCell} style={{marginLeft:25}} value={res.corr}/><br/>
                          </div>
                        )
                      }
                      return html
                    }}
                    </form>
                    <br/>
                    <Button variant="contained" color="secondary" onClick={handleModclose} style={{marginRight: 5}}>Cerrar</Button>
                    <Button variant="contained" color="primary" >Guardar</Button>
                </div>
                </Fade>
          </Modal>
      )
    }
      const onChangePregunta = (e) => {
        pregunta = e.target.value
      }
      const guardarPregunta = () =>{
        respuestas= []
        for(var i = 0;i<4;i ++){
          let ans = document.getElementById("ans"+incisos[i]).value
          let corr = document.getElementById("isCorr"+incisos[i]).checked
          respuestas.push({ans,corr})
        }
        let data ={
          pregunta : pregunta,
          respuestas : respuestas
        }
        db.create(data)
        .then(() => {
          pregunta = ""
          respuestas = []
          alert("Se agrego la Pregunta!");
          handleClose()
          window.location.reload();
        })
        .catch((e) => {
          alert("error")
          console.log(e);
        });

      }
      const borrarPregunta = (key) =>{
        db.delete(key)
        alert("Se borro la Pregunta")
        window.location.reload()
      }
      if(loading){
        return (<div> <CircularProgress /> </div>)
      }
    return(
      
    <div>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
               {preguntas}
                <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                    <button type="button" onClick={handleOpen}>
                    <AddCircleIcon color="secondary" style={{ fontSize: 50,textAlign: "center" }} />
                    </button>
                </Grid>
                
                </Grid>
            </Grid>
            {/* Modal de agregar pregunta */}
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
                    <h2 id="transition-modal-title">Agregar Pregunta</h2>
                    <form id="add-pregunta">
                    <label for="pregunta" >Pregunta <span style={{marginLeft: 120}}>Correcta</span></label><br/>
                    <input type="text" id="name" name="name" onChange={onChangePregunta}/><br/>
                    <div>
                        <div className={classes.ansTable}>
                            <label for="ansA" >A)</label><br/>
                            <input type="text" id="ansA" name="ansA" className={classes.ansCell}/>
                            <input type="checkbox" id="isCorrA" name="isCorrA" className={classes.ansCell} style={{marginLeft:25}}/><br/>
                        </div>
                        <div className={classes.ansTable}>
                            <label for="ansB" >B)</label><br/>
                            <input type="text" id="ansB" name="ansB" />
                            <input type="checkbox" id="isCorrB" name="isCorrB" className={classes.ansCell} style={{marginLeft:25}}/><br/>
                        </div>
                        <div className={classes.ansTable}>
                            <label for="ansC" >C)</label><br/>
                            <input type="text" id="ansC" name="ansC" className={classes.ansCell}/>
                            <input type="checkbox" id="isCorrC" name="isCorrC" className={classes.ansCell} style={{marginLeft:25}}/>
                        </div>
                        <div className={classes.ansTable}>
                            <label for="ansD" >D)</label><br/>
                            <input type="text" id="ansD" name="ansD" className={classes.ansCell}/>
                            <input type="checkbox" id="isCorrD" name="isCorrD" className={classes.ansCell} style={{marginLeft:25}}/>
                        </div>
                    </div>
                    </form>
                    <br/>
                    <Button variant="contained" color="secondary" onClick={handleClose} style={{marginRight: 5}}>Cerrar</Button>
                    <Button variant="contained" color="primary" onClick={guardarPregunta}>Guardar</Button>
                </div>
                </Fade>
          </Modal>

           {/* Modals de Modificar pregunta */}
           {modopen ? modalMod : <span/>}
           


        </Container>
    </div>)
}
export {VistaPreguntas}