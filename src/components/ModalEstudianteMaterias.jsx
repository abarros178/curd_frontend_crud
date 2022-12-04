import { Dialog, DialogContent, DialogTitle, Grid, Typography,MenuItem, DialogActions, Button } from '@mui/material'
import React from 'react'
import { SelectValidator, ValidatorForm } from 'react-material-ui-form-validator'


const ModalEstudianteMaterias = ({ materias,estudiantes,formrelacion,modalrelacion,setmodalrelacion,onInputChange,onsubmit}) => {
    return (
        <div>
            <Dialog
                open={modalrelacion}
                maxWidth="sm"
                fullWidth={true}
                onClose={() => setmodalrelacion(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle disableTypography>
                    <Typography variant="h3">Crea una nueva relacion</Typography>
                </DialogTitle>

                <ValidatorForm onSubmit={onsubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <SelectValidator
                                    value={formrelacion.id_materia}
                                    required
                                    // error={getError("celular", errores).length > 0}
                                    // helperText={getError("celular", errores)}
                                    id="id_materia"
                                    name="id_materia"
                                    label="Seleccione la materia a relacionar"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["El campo es requerido"]}
                                    onChange={onInputChange}
                                >
                                    {materias.map(({ id, nombre, profesor_id_pk}) => (
                                        <MenuItem key={id} value={id}>
                                            {`${nombre} - Lic. ${profesor_id_pk.nombre}`}
                                        </MenuItem>
                                    ))}
                                </SelectValidator>
                            </Grid>
                            <Grid item xs={12}>
                                <SelectValidator
                                    value={formrelacion.id_estudiante}
                                    required
                                    // error={getError("celular", errores).length > 0}
                                    // helperText={getError("celular", errores)}
                                    id="id_estudiante"
                                    name="id_estudiante"
                                    label="Seleccione el estudiante a relacionar"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["El campo es requerido"]}
                                    onChange={onInputChange}
                                >
                                    {estudiantes.map(({ id, nombre,identificacion}) => (
                                        <MenuItem key={id} value={id}>
                                            {`${identificacion} - ${nombre}`}
                                        </MenuItem>
                                    ))}
                                </SelectValidator>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setmodalrelacion(false)} autoFocus>
                            Cerrar
                        </Button>
                        <Button type="submit" variant="text" autoFocus>
                            Guardar relacion
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}

export default ModalEstudianteMaterias