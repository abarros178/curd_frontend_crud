import React from 'react'
// import NavBar from './navbar/navBar.jsx'
import img from '../assets/estudiante.jpg'
import img1 from '../assets/profesores.jpg'
import img2 from '../assets/asignaturas.jpg'
import img3 from '../assets/clases.jpg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';

export const Inicio = () => {
  return (
    <>


      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography xs={1} variant="h1" component="div">
            SISTEMA DE GESTION
          </Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 380 }}>
            <CardActionArea href='/profesores' >
              <CardMedia
                component="img"
                height="140"
                image={img1}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Profesores
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Aqui puedes ver todas los profesores,tambien puedes agregar mas profesores.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 380 }}>
            <CardActionArea href='/materias' >
              <CardMedia
                component="img"
                height="140"
                image={img2}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Materias
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Aqui puedes ver todas las materias,tambien puedes agregar mas materias.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
      
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 380 }}>
            <CardActionArea href='/estudiantes' >
              <CardMedia
                component="img"
                height="140"
                image={img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Estudiantes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Aqui puedes ver todas los estudiantes,tambien puedes agregar mas estudiantes.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        </Grid>
      </Grid>
    </>

  )
}