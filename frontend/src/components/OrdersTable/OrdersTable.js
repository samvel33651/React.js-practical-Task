import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import Moment from 'moment';
import OrdersTableToolbar from "./OrdersTableToolbar";

const tableStyles = theme => ({
  tableCells: {
      textAlign: 'right',
  },
  tableHead: {
      backgroundColor: '#EBEBEE',
  },
  tableHeadRow:{
      height: '45px',
  },
  ordersList: {
      fontSize: '32px',
      display: 'inline-block',
      float: 'left',
  },
  searchAddContainer: {
      height: '100px',
      padding: '15px',
  },
  addNew: {
      float: 'right',
      marginRight: '15px',
  },
  searchField: {
     display: 'inline-block',
     position: 'absolute',
     top: '135px',
     right: '35px',
 },
 searchInput: {
     width: '300px',
     height: '25px',
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
 addNewButton: {
     width: '120px',
     height: '30px',
     backgroundColor: '#fff',
 }
});

const columnData = [
  { id: 'id', numeric: false, disablePadding: false, label: 'Order Number' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Order Date' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

class OrdersTable  extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.handleDelete = this.handleDelete.bind(this);
    //     this.handleOrderLock = this.handleOrderLock.bind(this);
    // };

    onSortClcik = (proparty) => {
        this.props.onSortClcik(proparty);
    };

    // deleteSelected = (event) => {
    //     this.props.deleteSelected();
    // };

    isSelected = id => {
        return this.props.selected.indexOf(id) !== -1;
    };

    handleClick = (event, id) => {
            this.props.handleClick(event, id);
    };

    handleDelete = id => {
        this.props.handleOrderDelete(id);
    };

    searchOrderByID = event => {
        this.props.searchOrderByID(event.target.value);
    }

    handleOrderLock = id => {
        this.props.handleOrderLock(id);
    };

    handleLockUnlockModalOpen = orderId => {
        this.props.lockUnlockModalOpenHandler(orderId);
    };

    handleDeleteModalOpen = orderId => {
        this.props.deleteModalOpenHandler(orderId);
    };

    handleIdClick = id => {
        this.props.handleOpenTab(id);
    }

    render (){
        const { classes } = this.props;
        const { orders, order, orderBy, selected, rowsPerPage, page, lockUnlockModalOpen, orderToUnlock } = this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);
        const numSelected = selected.length;
        const rowCount = orders.length;
        let totalPrice = 0;
        return (
            <div>
            <div className={classes.searchAddContainer}>
                <div >
                    <span className={classes.ordersList}>Orders List</span>
                    <div className={classes.addNew}>
                        <button className={classes.addNewButton} onClick={this.props.addNew}>
                            <span className={classes.pluseSign}>+</span>
                            Add New</button>
                    </div>
                    <div className={classes.searchField} >
                        <input className= {classes.searchInput} type="text"
                            onChange= {this.searchOrderByID.bind(this)}
                        />
                    </div>
                </div>
            </div>
            <OrdersTableToolbar numSelected={numSelected} deleteSelected= {this.props.deleteSelected}/>
            <Table>
                <TableHead className={classes.tableHead}>
                   <TableRow  className={classes.tableHeadRow}>
                     <TableCell padding="checkbox">
                       <Checkbox
                         indeterminate={numSelected > 0 && numSelected < rowCount}
                         checked={numSelected === rowCount}
                         onChange={this.props.handleSelectAllClick}
                       />
                     </TableCell>
                    {columnData.map(column => {

                        return (

                            <TableCell
                                className={classes.tableCells}
                                key={column.id}
                                numeric={column.numeric}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                {column.id !== 'actions'
                                ? <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        value= {column.id}
                                        onClick={this.onSortClcik.bind(this, column.id)}
                                    >
                                    {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                                : column.label
                            }
                            </TableCell>
                            );

                            }, this)}
                   </TableRow>
                 </TableHead>
                 <TableBody>
              {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                totalPrice += n.price;
                return (
                  <TableRow
                    hover

                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                          checked={isSelected}
                          onClick={event => this.handleClick(event, n.id)}
                       />
                    </TableCell>
                    <TableCell
                        className={classes.tableCells} numeric
                        onClick={this.handleIdClick.bind(this, n.id)}
                    >
                        {n.id}
                    </TableCell>
                    <TableCell className={classes.tableCells} numeric>{Moment(n.date).format('MM-DD-YYYY')}</TableCell>
                    <TableCell className={classes.tableCells} numeric>{n.price}</TableCell>
                    <TableCell  className={classes.tableCells} numeric>
                        {n.locked
                            ?<LockIcon onClick ={this.handleLockUnlockModalOpen.bind(this, n.id)}/>
                            :<div>
                                <LockOpen onClick ={this.handleLockUnlockModalOpen.bind(this, n.id)}/>
                                <DeleteIcon onClick={this.handleDeleteModalOpen.bind(this, n.id)}/>
                            </div>
                        }




                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              <TableRow>
                  <TableCell numeric colSpan={4}>Total Price: {totalPrice}</TableCell>
              </TableRow>
            </TableBody>
         </Table>
        <TablePagination
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
            }}
            onChangePage={this.props.handleChangePage}
            onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
        />

     </div>
        );
    }
}

export default withStyles(tableStyles)(OrdersTable);
