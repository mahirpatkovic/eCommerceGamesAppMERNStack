import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

function GameVideoModal(props) {
    return (
        <div >
            <Dialog
                onClose={props.onClose}
                open={props.visible}
                >
                <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
                    Need for Speed
                </DialogTitle>
                <DialogContent dividers>
                <iframe width="550" height="315" src="https://www.youtube.com/embed/D6ouHWP0KrY?autoplay=1" 
                title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay;" allowFullScreen></iframe>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.onClose} style={{ color: 'white', backgroundColor: 'black' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default GameVideoModal;