import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LockUnlockModal extends React.Component {

      handleClose = () => {
          console.log('close clicked')
          this.props.closeHandler();
      };

      handleLockUnlock = orderId => {
          this.props.lockUnlockHandler(orderId);
      };

      getLockStatus = orderId => {
          let orders = this.props.orders;
          let order = orders.filter(x => x.id === orderId);
          return order[0].locked
      }

      render() {
          const {open, orderToLockUnlock} = this.props;
          let locked = this.getLockStatus(orderToLockUnlock);
          return (
              <div>
                <Dialog
                  open={open}
                  onClose={this.handleClose.bind(this)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">
                      Close
                    </Button>
                    <Button onClick={this.handleLockUnlock.bind(this, orderToLockUnlock)} color="primary" autoFocus>
                      {locked ? 'Unlock': 'Lock'}
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
          );
      }
}

export default LockUnlockModal;
