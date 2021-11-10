import { Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

/**
 * Ventana modal que muestra un contenido, usualmente un formulario
 * @returns 
 */
const ModalForm = (props) => {
    return (
        <div>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-wind-title"
            >
                <Box sx={modalBoxStyle}>
                    <Typography sx={{paddingBottom: 4}} id="modal-wind-title" variant="h6" component="h2">
                            {props.title}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )

}

export default ModalForm
