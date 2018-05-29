import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CancelOrder extends React.Component {

      handleClose = () => {
          this.props.closeHandler();
      };

      cancelOrder () {
          this.props.cancelOrder();
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
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All changes will be destroyed. Continue
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">
                      No
                    </Button>
                    <Button onClick={this.cancelOrder.bind(this)} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
          );
      }
}

export default CancelOrder;
