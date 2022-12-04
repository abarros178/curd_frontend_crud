import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogContent, FormControl, Grid,Button,MenuItem } from '@mui/material'
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
// import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-profesor-validator'

const Modaleditprofesor = ({modaledit,setmodaledit,profesor,onInputChange,tipo_profesores_back,tipo_sexo_back }) => {
     
    
    
    
    
    return (
        <div>
            <Dialog
                open={modaledit}
                maxWidth="sm"
                fullWidth={true}
                onClose={() => setmodaledit(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <AppBarModal titulo='¡ Crear profesores !' mostrarModal={modaledit} titulo_accion='' /> */}
                <ValidatorForm onSubmit={onsubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextValidator
                                    value={profesor.identificacion}
                                    required
                                    // error={getError("celular", errores).length > 0}
                                    // helperText={getError("celular", errores)}
                                    type="number"
                                    id="identificacion"
                                    name="identificacion"
                                    label="Identificacion del profesor"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["El campo es requerido"]}
                                    onChange={onInputChange}
                                ></TextValidator>
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    value={profesor.nombre}
                                    required
                                    // error={getError("celular", errores).length > 0}
                                    // helperText={getError("celular", errores)}
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    label="Nombre del profesor"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["El campo es requerido"]}
                                    onChange={onInputChange}
                                ></TextValidator>
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    value={profesor.username}
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
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 268 }}>
                                    <SelectValidator
                                        value={profesor.tipo_profesor}
                                        required
                                        // error={getError("celular", errores).length > 0}
                                        // helperText={getError("celular", errores)}
                                        id="tipo_profesor"
                                        name="tipo_profesor"
                                        label="Tipo de profesor"
                                        fullWidth
                                        validators={["required"]}
                                        errorMessages={["El campo es requerido"]}
                                        onChange={onInputChange}
                                    >
                                        {tipo_profesores_back.map(({ id, nombre }) => (
                                            <MenuItem key={id} value={id}>
                                                {nombre}
                                            </MenuItem>
                                        ))}
                                    </SelectValidator>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: 270}}>
                                    <SelectValidator
                                        value={profesor.gemale}
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
                        <Button onClick={() => setmodaledit(false)} variant="text">
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


export default Modaleditprofesor