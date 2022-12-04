import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ModalEstudiante from './ModalEstudiante';
import { TIPO_IDENTIFICACION, TIPO_SEXO, HOMBRE_SEXO } from '../../helper'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import { Card, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';

export const Estudiantes = () => {
  const [modalcrear, setmodalcrear] = useState(false);
  const [estudiantes, setestudiantes] = useState([]);
  const [cargando, setcargando] = useState(false);
  const [tipoidentificacion_back, settipoidentificacion_back] = useState([]);
  const [tipo_sexo_back, settipo_sexo_back] = useState([])
  const [modalconfirmar, setmodalconfirmar] = useState(false)

  const [form, setform] = useState({
    identificacion: "",
    nombre: "",
    tipo_identificacion: "",
    username: "",
    avatarlink: "",
    gemale: "",
  })
  // const [foto, setfoto] = useState(second)
  useEffect(() => {
    setmodalcrear(true);
  }, []);
  useEffect(() => {
    getestudiante()
    getparametroTipo_sexo()
    getparametro_tipoidentificacion()


  }, [modalcrear,modalconfirmar])
  const getAPI = async (gender) => {
    setcargando(true);
    await axios
      .get(`https://randomuser.me/api?&gender=${gender}`, {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          form.username = res.data.results[0].login.username
          form.avatarlink = res.data.results[0].picture.large
          //  setform(...form,{username:res.data.results[0].login.username}) 
          //  setform(...form,{avatarlink:res.data.results[0].picture.large}) 
          setcargando(false);
        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });
  };
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
  const getparametroTipo_sexo = async () => {
    setcargando(true);
    await axios
      .get(`http://localhost:3000/api/valorparametro/${TIPO_SEXO}`, {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          settipo_sexo_back(res.data.rows);
          setcargando(false);
        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });
  };
  const getparametro_tipoidentificacion = async () => {
    setcargando(true);
    await axios
      .get(`http://localhost:3000/api/valorparametro/${TIPO_IDENTIFICACION}`, {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          settipoidentificacion_back(res.data.rows);
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
  const limpiar_abrir = () => {
    setmodalcrear(true)
    setform({
      identificacion: "",
      nombre: "",
      tipo_profesor: "",
      username: "",
      avatarlink: "",
      gemale: "",
    });
  }
  const onsubmit = async (e) => {
    if (!form.username) {
      let helpgemale = "";
      if (form.gemale == HOMBRE_SEXO) {
        helpgemale = "male"
      } else {
        helpgemale = "female"
      }

      await getAPI(helpgemale);
      console.log(form)
      await axios
        .post("http://localhost:3000/api/estudiantes", form)
        .then((res) => {
          if (res.status == 200) {
            setmodalcrear(false);
            message.success("Estudiante guardado con exito");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('entre')
      await axios.put(`http://localhost:3000/api/estudiantes/${form.id}`, form).then((res) => {
        if (res.status == 200) {
          setmodalcrear(false);
          message.success("Estudiante editado con exito");
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    e.preventDefault();
  };
  const editestuabrir = (estudiante) => {
    setform(estudiante)
    setmodalcrear(true)
  }
  const eliminar_confirmacion = (estu) => {
    setmodalconfirmar(true)
    setform(estu)
  }
  const eliminar_estudiante = async () => {
    await axios.put(`http://localhost:3000/api/estudiantes/delete/${form.id}`).then((res)=>{
      if(res.status == 200){
        setmodalconfirmar(false)
        message.success('Estudiante eliminado')
      }
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" component="div">
            LISTA DE ESTUDIANTES
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => limpiar_abrir()} variant="contained">
            Agregar estudiantes
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {
              estudiantes.map((estu) => <Grid item xs={3}>
                {" "}
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      src={estu.avatarlink}
                    />
                  }
                  actions={[
                    <EditOutlined onClick={() => { editestuabrir(estu) }} key="edit" />,
                    <DeleteOutlined onClick={() => { eliminar_confirmacion(estu) }} key="delete" />
                  ]}
                >
                  <Meta
                    title={estu.nombre}
                    description={`El usuario generado para el estudiante es: ${estu.username}`}
                  />
                </Card>

              </Grid>)
            }
          </Grid>
        </Grid>
      </Grid>
      <ModalEstudiante
        form={form}
        modalcrear={modalcrear}
        setmodalcrear={setmodalcrear}
        onInputChange={onInputChange}
        tipoidentificacion_back={tipoidentificacion_back}
        tipo_sexo_back={tipo_sexo_back}
        onsubmit={onsubmit}
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
            Si elimina a esta persona desaparecera de la lista de estudiantes y no lo podra recuperar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setmodalconfirmar(false)}>
            Cerrar
          </Button>
          <Button onClick={()=>eliminar_estudiante()} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
