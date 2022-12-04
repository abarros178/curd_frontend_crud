import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import React from 'react'

const ModalProfeVacio = ({ modalprovacio, setmodalprovacio }) => {
    return (
        <div>
            <Dialog
                open={modalprovacio}
                maxWidth="sm"
                fullWidth={true}
                onClose={() => setmodalprovacio(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle disableTypography>
                    <Alert severity='info'>Recuerda que debes tener al menos un profesor creado </Alert>
                </DialogTitle>
                {/* <DialogContent>
                    <DialogContentText>
                        Usted debera primero crear un profesor para poder crear una materia
                    </DialogContentText>
                    </DialogContent> */}
                    <DialogActions>
                        <Button onClick={() => setmodalprovacio(false)} variant='text' autoFocus>
                            Cerrar
                        </Button>
                        <Button href='/profesores'variant='text' autoFocus>
                            Ir a crear profesores
                        </Button>
                    </DialogActions>
                
            </Dialog>

        </div>
    )
}

export default ModalProfeVacio