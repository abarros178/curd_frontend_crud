import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogContent, FormControl, Grid,Button,MenuItem, DialogTitle, Typography } from '@mui/material'
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const ModalEstudiante = ({modalcrear,setmodalcrear,onInputChange,form,tipoidentificacion_back,tipo_sexo_back,onsubmit}) => {
  return (
    <div>
        <Dialog
        open={modalcrear}
        maxWidth="sm"
        fullWidth={true}
        onClose={() => setmodalcrear(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {
          !form.username &&
          <DialogTitle disableTypography>
          <Typography variant="h3">Crea un nuevo estudiante</Typography>
        </DialogTitle>
        }
        {
          form.username &&
          <DialogTitle disableTypography>
          <Typography variant="h4">{`Edita a ${form.nombre}`}</Typography>
        </DialogTitle>
        }
        {/* <AppBarModal titulo='¡ Crear estudiantees !' mostrarModal={modalcrear} titulo_accion='' /> */}
        <ValidatorForm onSubmit={onsubmit}>
          <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl sx={{ width: 550 }}>
                  <SelectValidator
                    value={form.tipo_identificacion}
                    required
                    // error={getError("celular", errores).length > 0}
                    // helperText={getError("celular", errores)}
                    id="tipo_identificacion"
                    name="tipo_identificacion"
                    label="Tipo de identificacion"
                    fullWidth
                    validators={["required"]}
                    errorMessages={["El campo es requerido"]}
                    onChange={onInputChange}
                  >
                    {tipoidentificacion_back.map(({ id, nombre }) => (
                      <MenuItem key={id} value={id}>
                        {nombre}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  value={form.identificacion}
                  required
                  // error={getError("celular", errores).length > 0}
                  // helperText={getError("celular", errores)}
                  type="number"
                  id="identificacion"
                  name="identificacion"
                  label="Identificacion del estudiante"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["El campo es requerido"]}
                  onChange={onInputChange}
                ></TextValidator>
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  value={form.nombre}
                  required
                  // error={getError("celular", errores).length > 0}
                  // helperText={getError("celular", errores)}
                  type="text"
                  id="nombre"
                  name="nombre"
                  label="Nombre del estudiante"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["El campo es requerido"]}
                  onChange={onInputChange}
                ></TextValidator>
              </Grid>
              {
                form.username &&
                <Grid item xs={12}>
                <TextValidator
                  value={form.username}
                  required
                  // error={getError("celular", errores).length > 0}
                  // helperText={getError("celular", errores)}
                  type="text"
                  id="username"
                  name="username"
                  label="Username"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["El campo es requerido"]}
                  onChange={onInputChange}
                ></TextValidator>
              </Grid>}
       
              <Grid item xs={12}>
              <FormControl sx={{ width: 550 }}>
                  <SelectValidator
                    value={form.gemale}
                    required
                    // error={getError("celular", errores).length > 0}
                    // helperText={getError("celular", errores)}
                    id="gemale"
                    name="gemale"
                    label="Tipo de genero"
                    fullWidth
                    validators={["required"]}
                    errorMessages={["El campo es requerido"]}
                    onChange={onInputChange}
                  >
                    {tipo_sexo_back.map(({ id, nombre }) => (
                      <MenuItem key={id} value={id}>
                        {nombre}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                  </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setmodalcrear(false)} variant="text">
              Cerrar
            </Button>
            <Button type="submit" variant="text">
              Guardar
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  )
}


export default ModalEstudiante