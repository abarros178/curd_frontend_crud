import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalMateria from './ModalMateria';
import ModalProfeVacio from './ModalProfeVacio';
// import EditIcon from '@material-ui/icons/Edit';
// import BlockIcon from '@material-ui/icons/Block';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ModalEstudianteMaterias from './ModalEstudianteMaterias';

export const Materias = () => {
  const [form, setform] = useState({
    nombre: "",
    ubicacion: "",
    profesor_id: "",
  });
  const [formrelacion, setformrelacion] = useState({
    id_materia:"",
    id_estudiante: ""
  })
  const [profesores, setprofesores] = useState([]);
  const [estudiantes, setestudiantes] = useState([]);
  const [materias, setmaterias] = useState([]);
  const [materias_relacion, setmaterias_relacion] = useState([]);
  const [modalcrear, setmodalcrear] = useState(false);
  const [modalprovacio, setmodalprovacio] = useState(false);
  const [modalconfirmar, setmodalconfirmar] = useState(false);
  const [modalconfirmar_relacion, setmodalconfirmar_relacion] = useState(false);
  const [modalrelacion, setmodalrelacion] = useState(false);
  const [cargando, setcargando] = useState(false);
  useEffect(() => {
    const obtenerprofe = async () => {
      await getprofesores()
      await getestudiante()
      await getmaterias_relacion()
    }

    obtenerprofe()
    // setmodalprovacio(true);
    message.warning('Recuerda que debes tener al menos un profesor creado para tener una nueva materia')




  }, [])
  const getestudiante = async () => {
    setcargando(true);
    await axios
      .get("http://localhost:3000/api/estudiantes", {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          setestudiantes(res.data.rows);
          setcargando(false);
        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });
  };

  const onInputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const onInputChangeRelacion = (e) => {
    setformrelacion({ ...formrelacion, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getmaterias()
    getmaterias_relacion()



  }, [modalcrear,modalconfirmar,modalrelacion,modalconfirmar_relacion])
  const getprofesores = async () => {
    setcargando(true);
    await axios
      .get("http://localhost:3000/api/profesores", {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          setprofesores(res.data.rows);
          setcargando(false);

        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });

  };
  const getmaterias = async () => {
    setcargando(true);
    await axios
      .get("http://localhost:3000/api/materia", {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          setmaterias(res.data.rows);
          setcargando(false);

        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });

  };
  const getmaterias_relacion = async () => {
    setcargando(true);
    await axios
      .get("http://localhost:3000/api/materia_estudiantes", {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          setmaterias_relacion(res.data.rows);
          setcargando(false);

        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });

  };
  const onsubmit = async () => {
    if(!form.estado){
    await axios
      .post("http://localhost:3000/api/materia", form)
      .then((res) => {
        if (res.status == 200) {
          setmodalcrear(false);
          message.success("Materia guardado con exito");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }else {
      await axios
      .put(`http://localhost:3000/api/materia/${form.id}`, form)
      .then((res) => {
        if (res.status == 200) {
          setmodalcrear(false);
          message.success("Materia editada con exito");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  const onsubmit_relacion = async () => {
    if(!formrelacion.estado){
    await axios
      .post("http://localhost:3000/api/materia_estudiantes", formrelacion)
      .then((res) => {
        if (res.status == 200) {
          setmodalrelacion(false);
          message.success("Relacion guardada con exito");
        }
      })
      .catch((err) => {
        message.error(`El estudiante ya se encuentra registrado en la materia`);
      });
    }else {
      await axios
      .put(`http://localhost:3000/api/materia_estudiantes/${formrelacion.id}`, formrelacion)
      .then((res) => {
        if (res.status == 200) {
          setmodalrelacion(false);
          message.success("Relacion editada con exito");
        }
      })
      .catch((err) => {
        message.error("El estudiante ya tiene esta materia asignada");
      });
    }
  }
  const limpiar_abrir = () => {
    setmodalcrear(true)
    setform({
      nombre: "",
      ubicacion: "",
      profesor_id: "",
    });
  }
  const limpiar_abrir_relaciones = () => {
    setmodalrelacion(true)
    setformrelacion({
      id_materia:"",
    id_estudiante: ""
    });
  }
  const eliminar_materia = async () => {
    await axios
      .put(`http://localhost:3000/api/materia/delete/${form.id}`)
      .then((res) => {
        if (res.status == 200) {
          setmodalconfirmar(false);
          message.success("Materia eliminada con exito");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const eliminar_materia_relacion = async () => {
    await axios
      .put(`http://localhost:3000/api/materia_estudiantes/delete/${formrelacion.id}`)
      .then((res) => {
        if (res.status == 200) {
          setmodalconfirmar_relacion(false);
          message.success("Relacion eliminada con exito");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
const editar_materia= (materia) => {
  setform(materia)
  setmodalcrear(true)
}
const editar_materia_relacion= (materia) => {
  setformrelacion(materia)
  setmodalrelacion(true)
}
const eliminar_confirmacion = (materia) => {
  setmodalconfirmar(true)
  setform(materia)
}
const eliminar_confirmacion_relacion = (materia) => {
  setmodalconfirmar_relacion(true)
  setformrelacion(materia)
}
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" component="div">
            LISTA DE MATERIAS
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => limpiar_abrir()} variant="contained">
            Agregar materias
          </Button>
        </Grid>
        { estudiantes &&
        <Grid item xs={6}>
          <Button onClick={() => limpiar_abrir_relaciones()} variant="contained">
            Asignar estudiantes a materias
          </Button>
        </Grid>
}
        <Grid item xs={6} >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de la materia</TableCell>
                  <TableCell>Ubicacion</TableCell>
                  <TableCell align="right">DNI del profesor</TableCell>
                  <TableCell align="right">Nombre del profesor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materias.map((materia) => (
                  <TableRow
                    key={materia.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {materia.nombre}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {materia.ubicacion}
                    </TableCell>
                    <TableCell align="right">{materia.profesor_id_pk.identificacion}</TableCell>
                    <TableCell align="right">{materia.profesor_id_pk.nombre}</TableCell>
                    <TableCell align="right">
                      <IconButton variant='text' onClick={()=>{editar_materia(materia)}} color="primary" aria-label="upload picture" component="span">
                      <EditOutlined />
                    </IconButton>
                    </TableCell>
                    <TableCell align="right">
                    <IconButton variant='text' onClick={()=>{eliminar_confirmacion(materia)}} color="primary" aria-label="upload picture" component="span">
                    <DeleteOutlined />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
     
        <Grid item xs={6} >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de la materia</TableCell>
                  <TableCell>Ubicacion</TableCell>
                  <TableCell align="right">DNI del estudiante</TableCell>
                  <TableCell align="right">Nombre del estudiante</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materias_relacion.map((materia_relacion) => (
                  <TableRow
                    key={materia_relacion.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {materia_relacion.id_materia_aaa.nombre}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {materia_relacion.id_materia_aaa.ubicacion}
                    </TableCell>
                    <TableCell align="right">{materia_relacion.id_estudiante_aaa.identificacion}</TableCell>
                    <TableCell align="right">{materia_relacion.id_estudiante_aaa.nombre}</TableCell>
                    <TableCell align="right">
                      <IconButton variant='text' onClick={()=>{editar_materia_relacion(materia_relacion)}} color="primary" aria-label="upload picture" component="span">
                      <EditOutlined />
                    </IconButton>
                    </TableCell>
                    <TableCell align="right">
                    <IconButton variant='text' onClick={()=>{eliminar_confirmacion_relacion(materia_relacion)}} color="primary" aria-label="upload picture" component="span">
                    <DeleteOutlined />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        </Grid>
      <ModalMateria
        form={form}
        modalcrear={modalcrear}
        setmodalcrear={setmodalcrear}
        onInputChange={onInputChange}
        profesores={profesores}
        onsubmit={onsubmit}

      />
      <ModalProfeVacio
        modalprovacio={modalprovacio}
        setmodalprovacio={setmodalprovacio}
      />
      <ModalEstudianteMaterias
      materias={materias}
      estudiantes={estudiantes}
      formrelacion={formrelacion}
      modalrelacion={modalrelacion}
      setmodalrelacion={setmodalrelacion}
      onInputChange={onInputChangeRelacion}
      onsubmit={onsubmit_relacion}
      />
      <Dialog
        open={modalconfirmar}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth={true}
        onClose={() => setmodalconfirmar(false)}
      >
        <DialogTitle id="responsive-dialog-title">
          {`Desea eliminar a ${form.nombre}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si elimina esta materia desaparecera de la lista y no la podra recuperar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setmodalconfirmar(false)}>
            Cerrar
          </Button>
          <Button onClick={()=>eliminar_materia()} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalconfirmar_relacion}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth={true}
        onClose={() => setmodalconfirmar_relacion(false)}
      >
        <DialogTitle id="responsive-dialog-title">
          {`Desea eliminar a ${formrelacion.id_estudiante_aaa ? formrelacion.id_estudiante_aaa.nombre:''} de la materia ${formrelacion.id_estudiante_aaa ? formrelacion.id_materia_aaa.nombre:''}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si elimina esta materia desaparecera de la lista y no la podra recuperar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setmodalconfirmar_relacion(false)}>
            Cerrar
          </Button>
          <Button onClick={()=>eliminar_materia_relacion()} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
