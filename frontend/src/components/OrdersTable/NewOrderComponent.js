import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddItem from './AddItemsModalComponent';
import CancelOrder from './CancelOrderModalComponent';

const newOrderStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: {
      backgroundColor: "#CFCFCF",
      minHeight: '50px',
  },

  itemsContainer: {
      margin: '0px 15px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  itemsTableToolbar: {
    backgroundColor:  "#CFCFCF",
    minHeight: '50px',
  },
  saveButton: {
      backgroundColor: "#4B73B4",
      height: '30px',
      borderRadius: '5px',
      marginRight: '15px',
      width: '90px',
      border: 'none',
      color: '#fff',
  },
  cancleButton: {
      backgroundColor: '#fff',
      height: '30px',
      borderRadius: '5px',
      width: '90px',
      border: 'none',
  },
  inputLabel: {
      display: 'inline-block',
      width: '100px',
      textAlign: 'left',
  },
  block: {
    display: 'block',
    margin: '15px',
  },

  blockTopMargin: {
      margin: '25px 15px 15px 15px',

  },

  blockBorder: {
      display: 'block',
      margin: '15px',
      borderBottom: '1px solid gray',
  },

  orderInput: {
      width: '250px',
      borderRadius : '5px',
      height: '25px',
  },

  orderData: {
      float: 'right',
  },

  itaemsTableHead: {
      backgroundColor: '#EBEBEE',
  },

  itemsTableHeadRow:{
      height: '45px',
  },

  headerBordered: {
    borderBottom: '1px solid black',
  },
  orderInfo: {
      borderRadius: '5px',
      display: 'inline-block',
      float: 'right',
      margin: '5px',
      width: '300px',
      height: '250px',
      backgroundColor: '#EDEDEE',
  },

  orderInputs: {
      display: 'inline-block',
      width: '400px',
  },

  orderDetails: {
      width: '240px',
      display: 'inline-block',
      marginLeft: '15px',
  },

  newOrderContainer: {
    height: '100%'
  },
  newOrderdata: {
      height: '300px',
  },
  itemsHeader: {
      display: 'inline-block',
      float: 'left',
      fontSize: '32px',
  },
  addNewItemButton: {
      display: 'inline-block',
      float: 'right',
      height: '32px',
      width: '120px',
      backgroundColor: '#fff',
  },
  itemsHeaderContainer: {
      display: 'block',
      height: '35px',
      marginBottom: '15px',
  },
  pluseSign: {
      width: '15px',
      height: '15px',
      display: 'inline-block',
      fontSize: '13px',
      borderRadius: '50%',
      backgroundColor: 'green',
      color: '#fff',
      float: 'left',
  },


});

class AddNewOrder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            date: '',
            price: '',
            locked: false,
            items: [

            ],
            isOpen: false,
            cancelModalOpen: false,
        }
        this.cancelOrderModalOpenHandler = this.cancelOrderModalOpenHandler.bind(this);
        this.saveNewOrder = this.saveNewOrder.bind(this);
    }

    changeInput = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    getExtPrice(){
        let total = 0;
        let itemsCount= 0;
        const items = this.state.items;
        items.forEach(item => {
            total+=(item.quantity*item.price);
            itemsCount += parseInt(item.quantity);
        });
        return {
            extPrice: total,
            tax: total*15/100,
            itemsCount: itemsCount
        } ;
    };

    handleItemDlete = index => {
        let items = this.state.items;
        items.splice(index, 1);
        this.setState(items);
    };

    changeItem = (index, event) => {
        let value = event.target.value;
        let items = this.state.items;
        console.log(items);
        console.log(event.target.value)
        items[index][event.target.name] = value ? value : 1;
        this.setState({items: items});
    };

    handleAddNewItem = item => {
        let items = this.state.items
        items.push(item);
        this.setState({item});
        this.setState({isOpen: false});
    };
    addItemModalCloseHandler() {
        this.setState({isOpen: false});
    };

    handleAddItemModalOpen() {
        this.setState({isOpen: true});
    };

    cancelOrder () {
        this.props.cancelOrderChanges();
    };

    cancelModalCloseHandler() {
        this.setState({cancelModalOpen: false});
    };

    saveNewOrder() {
        let itemsData= this.getExtPrice();
        let order ={
            date: this.state.date,
            price: itemsData.extPrice,
            items: this.state.items,
            locked: this.state.locked
        }
        if(order.date){
            this.props.handleOrderSave(order);
        }

    }

    cancelOrderModalOpenHandler() {
        this.setState({cancelModalOpen: true});
    }

    render() {
        const {classes} =this.props;
        let orderDeatils = this.getExtPrice();
        return (
            <div className={classes.newOrderContainer}>
                <h1>New Order</h1>
                <Toolbar className={classes.highlight}>
                  <div className = {classes.buttonWrapper}>
                      <button
                          className={classes.saveButton}
                          onClick={this.saveNewOrder}
                          >Save</button>
                      <button
                          className={classes.cancleButton}
                          onClick= {this.cancelOrderModalOpenHandler}
                      >Cancle</button>
                  </div>
                </Toolbar>
                <div className={classes.newOrderdata}>
                    <div className={classes.orderInputs}>
                        <div className={classes.block}>
                            <label className={classes.inputLabel}>Order No:</label>
                            <input
                                onChange={this.changeInput}
                                name="id"
                                className={classes.orderInput}
                                type="text"
                                placeholder="ORD-MMYY-xxx"
                                disabled
                             />
                        </div>
                        <div className={classes.block}>
                            <label className={classes.inputLabel}>Date:</label>

                            <input type="date"
                                max="2018-01-06"
                                min="2018-30-06"
                                disabled= {this.state.locked}
                                onChange={this.changeInput}
                                name="date"
                                className={classes.orderInput}
                            />
                        </div>
                        <div className={classes.block}>
                            <label className={classes.inputLabel}>Tax:</label>
                            <input
                                className={classes.orderInput}
                                type="text" disabled placeholder='15%'
                                onChange={this.changeInput}
                                name="id"
                            />
                        </div>

                    </div>
                    <div className={classes.orderInfo}>
                        <h3 className={classes.headerBordered}> <strong>Total</strong></h3>
                        <div className={classes.orderDetails}>
                            <div className={classes.block}>
                                <span className={classes.inputLabel}>Ext. Price:</span>
                                <span className={classes.orderData}>{orderDeatils.extPrice}</span>
                            </div>
                            <div className={classes.blockBorder}>
                                <span className={classes.inputLabel}>Tax:</span>
                                <span className={classes.orderData}>{orderDeatils.tax}</span>
                            </div>
                            <div className={classes.block}>
                                <span className={classes.inputLabel}>Total Value:</span>
                                <span className={classes.orderData}>{orderDeatils.extPrice+orderDeatils.tax}</span>
                            </div>
                            <div className={classes.blockTopMargin}>
                                <span className={classes.inputLabelLong}>Total Items in Order:</span>
                                <span className={classes.orderData}>{orderDeatils.itemsCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.itemsContainer}>
                    <div className= {classes.itemsHeaderContainer}>
                        <span className={classes.itemsHeader}>Items</span>
                        <button className={classes.addNewItemButton} onClick={this.handleAddItemModalOpen.bind(this)}>
                            <span className={classes.pluseSign}>+</span>
                            Add Item
                        </button>
                    </div>

                    <Toolbar className={classes.itemsTableToolbar}>
                        1 - {this.state.items.length} of { this.state.items.length}
                    </Toolbar>
                    <Table className={classes.itemsTable}>
                        <TableHead className={classes.itaemsTableHead}>
                           <TableRow  className={classes.itaemsTableHead}>
                               <TableCell>Product</TableCell>
                               <TableCell>Quantity</TableCell>
                               <TableCell>Price</TableCell>
                               <TableCell>Extended Price</TableCell>
                               <TableCell className={classes.actions}></TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {
                               this.state.items.map((item ,key) => {
                                   return (
                                       <TableRow key={key}>
                                        <TableCell>
                                            <FormControl className={classes.formControl}>
                                              <InputLabel htmlFor="controlled-open-select">Procuct</InputLabel>
                                              <Select
                                                value={item.name}
                                                onChange={this.changeItem.bind(this, key)}
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
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="number"
                                                name="quantity"
                                                onChange={this.changeItem.bind(this, key)}
                                                disabled={this.state.locked}
                                                min="1"
                                                value={item.quantity}/>
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="number"
                                                name='price'
                                                onChange={this.changeItem.bind(this, key)}
                                                min="1" value={item.price}
                                                step='0.01'
                                                disabled={this.state.locked}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item.quantity *item.price}
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon onClick={this.handleItemDlete.bind(this, key)}/>
                                        </TableCell>
                                    </TableRow>
                                   )
                               })
                           }
                       </TableBody>
                   </Table>
                   { this.state.isOpen &&
                       <AddItem
                           open={this.state.isOpen}
                           handleAddNewItem = {this.handleAddNewItem.bind(this)}
                           handleClose= {this.addItemModalCloseHandler.bind(this)}
                       />}

                   {this.state.cancelModalOpen &&
                       <CancelOrder
                           open={this.state.cancelModalOpen}
                           cancelOrder={this.cancelOrder.bind(this)}
                           handleClose= {this.cancelModalCloseHandler.bind(this)}

                       />

                   }
                </div>

            </div>
        );
    }
}

AddNewOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(newOrderStyles)(AddNewOrder)
