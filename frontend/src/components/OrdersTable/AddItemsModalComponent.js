import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const addItemStyles = theme => ({
    addItemModalContainer: {
        width: '300px',
    },
    formControl: {
        width: '250px',
        display: 'block',
        marginTop: '30px',
    },
    newItesmSelect: {
        width: '100%'
    },
    newItemInput: {
        width: '100%',
        height: '35px',
        borderRadius: '5px',
    }
});

class AddItem extends React.Component {
        constructor(props) {
            super(props);
            this.state ={
                name: '',
                price: '',
                quantity: ''
            }
        };
        handleClose = () => {
            this.props.handleClose();
        };
        handleSave() {
            let item  = this.state;
            if(this.state.name!= '' && this.state.quantity > 0 && this.state.price > 0){
                this.props.handleAddNewItem(item);
            }

        }

        changeItem = event => {
            if(event.target.name == 'name'){
                this.setState({[event.target.name]: event.target.value})
            } else {
                this.setState({[event.target.name]: parseInt(event.target.value)})
            }

        }

        render() {
          const { classes} = this.props;
          const {open} = this.props;

          return (
              <div>
                <Dialog
                  open={open}
                  onClose={this.handleClose.bind(this)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Add new Item"}</DialogTitle>
                  <DialogContent className= {classes.addItemModalContainer}>

                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="controlled-open-select">Procuct</InputLabel>
                          <Select
                              className={classes.newItesmSelect}
                            value={this.state.name}
                            onChange={this.changeItem.bind(this)}
                            inputProps={{
                              name: 'name',
                              id: 'controlled-open-select',
                            }}
                          >
                            <MenuItem value={'notebook'}>NoteBook</MenuItem>
                            <MenuItem value={'pan'}>Pen</MenuItem>
                            <MenuItem value={'book'}>Book</MenuItem>
                            <MenuItem value={'pencil'}>Book</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <input
                                required
                                type="number"
                                name="quantity"
                                className={classes.newItemInput}
                                onChange={this.changeItem.bind(this)}
                                min="1"
                                value={this.state.quantity}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <input
                                required
                                name="price"
                                className={classes.newItemInput}
                                type="number"
                                step="0.01"
                                onChange={this.changeItem.bind(this)}
                                min="1" value={this.state.price}
                            />
                        </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSave.bind(this)} color="primary" autoFocus>
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
          );
        }
}

export default withStyles(addItemStyles)(AddItem);
