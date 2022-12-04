import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const ModalMateria = ({ form, modalcrear, setmodalcrear, onsubmit, onInputChange,profesores }) => {
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
                <DialogTitle disableTypography>
                    <Typography variant="h3">Crea una nueva materia</Typography>
                </DialogTitle>

                <ValidatorForm onSubmit={onsubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextValidator
                                    value={form.nombre}
                                    required
                                    // error={getError("celular", errores).length > 0}
                                    // helperText={getError("celular", errores)}
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    label="Nombre de la materia"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["El campo es requerido"]}
                                    onChange={onInputChange}
                                ></TextValidator>
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    value={form.ubicacion}
                                    required
                                    // error={getError("celular", errores).length > 0}
                                    // helperText={getError("celular", errores)}
                                    type="text"
                                    id="ubicacion"
                                    name="ubicacion"
                                    label="Ubicacion del salon"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["El campo es requerido"]}
                                    onChange={onInputChange}
                                ></TextValidator>
                                </Grid>
                            <Grid item xs={12}>
                                
                                <SelectValidator
                                    value={form.profesor_id}
                                    required
                                    // error={getError("celular", errores).length > 0}
                                    // helperText={getError("celular", errores)}
                                    id="profesor_id"
                                    name="profesor_id"
                                    label="Seleccione el profesor a asignar la materia"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["El campo es requerido"]}
                                    onChange={onInputChange}
                                >
                                    {profesores.map(({ id, nombre,identificacion }) => (
                                        <MenuItem key={id} value={id}>
                                            {`${identificacion} - ${nombre}`}
                                        </MenuItem>
                                    ))}
                                </SelectValidator>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setmodalcrear(false)} autoFocus>
                            Cerrar
                        </Button>
                        <Button type="submit" variant="text" autoFocus>
                            Guardar materia
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}

export default ModalMateria