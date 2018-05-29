import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteModal extends React.Component {

      handleClose = () => {
          this.props.closeHandler();
      };

      handledelete = orderId => {
          this.props.deleteHandler(orderId);
      };

      render() {
          const {open, orderToDelete} = this.props;
          return (
              <div>
                <Dialog
                  open={open}
                  onClose={this.handleClose.bind(this)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">Delete order {orderToDelete}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">
                      Close
                    </Button>
                    <Button onClick={this.handledelete.bind(this, orderToDelete)} color="primary" autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
          );
      }
}

export default DeleteModal;
