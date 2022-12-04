import React, { useEffect, useState } from "react";
import { TIPO_PROFESOR, TIPO_SEXO, HOMBRE_SEXO, MUJER_SEXO } from "../../helper";
import axios from "axios";
import { Card, message } from "antd";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Modalprofesor from "./Modalprofesor";
// import Modaleditprofesor from "./Modaleditprofesor";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

export const Profesores = () => {
  const [form, setform] = useState({
    identificacion: "",
    nombre: "",
    tipo_profesor: "",
    username: "",
    avatarlink: "",
    gemale: "",
  });
  const [profesores, setprofesores] = useState([]);
  const [modalcrear, setmodalcrear] = useState(false);
  const [modalconfirmar, setmodalconfirmar] = useState(false)
  const [cargando, setcargando] = useState(false);
  const [tipo_profesores_back, settipo_profesores_back] = useState([]);
  const [tipo_sexo_back, settipo_sexo_back] = useState([])
  const [modaledit, setmodaledit] = useState(false)

  useEffect(() => {
    setmodalcrear(true);
  }, []);
  useEffect(() => {
    getprofesores();
    getparametrotipo_profesor();
    getparametroTipo_sexo()
    // if (profesores.length === 0) setmodalcrear(true);

  }, [modalcrear,modalconfirmar]);

  const onInputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

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


  const editprofeabrir = (profesor) => {
    setform(profesor)
    setmodalcrear(true)
  }

  const getparametrotipo_profesor = async () => {
    setcargando(true);
    await axios
      .get(`http://localhost:3000/api/valorparametro/${TIPO_PROFESOR}`, {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          settipo_profesores_back(res.data.rows);
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
        .post("http://localhost:3000/api/profesores", form)
        .then((res) => {
          if (res.status == 200) {
            setmodalcrear(false);
            message.success("Profesor guardado con exito");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('entre')
      await axios.put(`http://localhost:3000/api/profesores/${form.id}`, form).then((res) => {
        if (res.status == 200) {
          setmodalcrear(false);
          message.success("Profesor editado con exito");
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    e.preventDefault();
  };
  const eliminar_confirmacion = (profesor) => {
    setmodalconfirmar(true)
    setform(profesor)
  }
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
  const eliminar_profesor = async () => {
    await axios.put(`http://localhost:3000/api/profesores/delete/${form.id}`).then((res)=>{
      if(res.status == 200){
        setmodalconfirmar(false)
        message.success('Profesor eliminado')
      }
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" component="div">
            LISTA DE PROFESORES
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => limpiar_abrir()} variant="contained">
            Agregar profesores
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {
              profesores.map((profe) => <Grid item xs={3}>
                {" "}
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      src={profe.avatarlink}
                    />
                  }
                  actions={[
                    <EditOutlined onClick={() => { editprofeabrir(profe) }} key="edit" />,
                    <DeleteOutlined onClick={()=>{eliminar_confirmacion(profe)}} key="delete" />
                  ]}
                >
                  <Meta
                    title={profe.nombre}
                    description={`El usuario generado para el profesor es: ${profe.username}`}
                  />
                </Card>

              </Grid>)


            }
          </Grid>
        </Grid>
      </Grid>
      <Modalprofesor
        form={form}
        modalcrear={modalcrear}
        setmodalcrear={setmodalcrear}
        onInputChange={onInputChange}
        tipo_profesores_back={tipo_profesores_back}
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
            Si elimina a esta persona desaparecera de la lista de profesores y no la podra recuperar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setmodalconfirmar(false)}>
            Cerrar
          </Button>
          <Button onClick={()=>eliminar_profesor()} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};
