import React from 'react';
import OrdersTable from './OrdersTable/OrdersTable';
import Paper from '@material-ui/core/Paper';
import LockUnlockModal from './OrdersTable/LockUnlockModalComponent';
import DeleteModal from './OrdersTable/DeleteModalComponent';
import AddNewOrder from './OrdersTable/NewOrderComponent';

class OrdersPage extends React.Component {
    constructor(props) {
        super(props);
        let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')): [];
        console.log(orders);
        this.state = {
            order: 'asc',
            orderBy: 'id',
            orders: orders,
            addNew: false,
            selected: [],
            searchQuery: '',
            page: 0,
            rowsPerPage: 3,
            lockModalOpen: false,
            deleteModalOpen: false,
            orderToLockUnlock: '',
            orderToDelete: ''
        };
        this.handleDeleteSelected = this.handleDeleteSelected.bind(this);
        this.createSortHandler = this.createSortHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddNew = this.handleAddNew.bind(this);
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        this.handleOrderDelete = this.handleOrderDelete.bind(this);
        this.handleOrderLock = this.handleOrderLock.bind(this);
        this.searchOrderByID = this.searchOrderByID.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleLockUnlockModalOpen = this.handleLockUnlockModalOpen.bind(this);
        this.handleLockUnlockModalClose = this.handleLockUnlockModalClose.bind(this);
        this.handleDeleteModalOpen = this.handleDeleteModalOpen.bind(this);
        this.cancelOrderChanges = this.cancelOrderChanges.bind(this);
        this.orderSaveHandler = this.orderSaveHandler.bind(this);
        this.handleOpenNewTab = this.handleOpenNewTab.bind(this);
    };

    cancelOrderChanges() {
        this.setState({addNew: false});
    };

    orderSaveHandler = order =>{
        let dateObj = new Date(order.date);
        let month = dateObj.getUTCMonth() + 1 < 10 ? '0'+(dateObj.getUTCMonth() + 1): dateObj.getUTCMonth() + 1 ;
        let year = dateObj.getFullYear().toString().substr(-2);
        let lastOrder = this.state.orders[this.state.orders.length-1]
        let lastNum = parseInt(lastOrder.id.substr(-3));
        let newOrderId =lastNum+1< 10? '00'+(lastNum+1) : lastNum+1< 100?'0'+ (lastNum+1): lastNum+1;
        order.id = 'ORD-'+month+year+'-'+newOrderId;
        let orders = this.state.orders;
        orders.push(order);
        this.setState({orders});
        localStorage.setItem('orders', JSON.stringify(orders));
        this.setState({addNew: false});
    };

    handleLockUnlockModalOpen = orderId => {
        console.log(orderId);
        this.setState({lockModalOpen: true});
        this.setState({orderToLockUnlock: orderId});
    };
    handleLockUnlockModalClose (){
        this.setState({lockModalOpen: false});
    };

    handleDeleteModalOpen = orderId => {
        this.setState({deleteModalOpen: true});
        this.setState({orderToDelete: orderId});
    };

    handleDeleteModalClose () {
        this.setState({deleteModalOpen: false});
    };

    handleOrderLock = id => {
        let orders = this.state.orders;
        let orderIndex = orders.findIndex(order => order.id === id);
        orders[orderIndex].locked= !orders[orderIndex].locked;
        this.setState({orders});
        localStorage.setItem('orders', JSON.stringify(orders));
        this.setState({lockModalOpen: false});
    };

    createSortHandler = (proparty) => {
        const orderBy = proparty;
        let order = 'desc';

        if (this.state.orderBy === orderBy && this.state.order === 'desc') {
          order = 'asc';
        }

        const orders =
          order === 'desc'
            ? this.state.orders.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            : this.state.orders.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ orders, order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.orders.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleOrderDelete = id => {
        let  orders = this.state.orders.filter((order) => {
            return order.id !== id
        });
        this.setState({orders});
        localStorage.setItem('orders', JSON.stringify(orders.length? orders: []));
        this.setState({deleteModalOpen: false});
    };

    handleDeleteSelected () {
        let orders = this.state.orders.filter(value => !this.state.selected.includes(value.id));
        this.setState({orders}, () => {
            if(this.state.orders.length){
                localStorage.setItem('orders', JSON.stringify(this.state.orders));
            }else{
                localStorage.removeItem('orders');
            }

        });
        this.setState({selected: []});
    };

    searchOrderByID = query => {
        console.log(query);
        this.setState({searchQuery: query});
    };
    handleOpenNewTab = id => {
        this.props.openNewTab(id);
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }

        this.setState({ selected: newSelected });
      };

    handleAddNew = event => {
        event.preventDefault();
        this.setState({addNew : true}, () => {
            console.log(this.state.addNew);
        });
    };

    render() {
        const {addNew, searchQuery, orderToLockUnlock} = this.state;
        return (
            <Paper >
                { !addNew ?
                <OrdersTable
                    orders={searchQuery ? this.state.orders.filter(order => order['id'].includes(searchQuery)) : this.state.orders}
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    selected={ this.state.selected}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onSortClcik={this.createSortHandler}
                    deleteSelected= {this.handleDeleteSelected}
                    handleClick={this.handleClick}
                    addNew= {this.handleAddNew}
                    handleSelectAllClick= {this.handleSelectAllClick}
                    handleOrderDelete = {this.handleOrderDelete}
                    handleOrderLock = {this.handleOrderLock}
                    searchOrderByID = {this.searchOrderByID}
                    handleChangePage = {this.handleChangePage}
                    handleChangeRowsPerPage= {this.handleChangeRowsPerPage}
                    lockUnlockModalOpen= {this.state.lockModalOpen}
                    deleteModalOpen = {this.state.deleteModalOpen}
                    deleteModalOpenHandler= {this.handleDeleteModalOpen}
                    handleOpenTab= {this.handleOpenNewTab}
                    lockUnlockModalOpenHandler = {this.handleLockUnlockModalOpen}
                />
                : <AddNewOrder  cancelOrderChanges ={this.cancelOrderChanges} handleOrderSave={this.orderSaveHandler}/>
             }
             {this.state.lockModalOpen &&
                  <LockUnlockModal
                     closeHandler={this.handleLockUnlockModalClose}
                     orderToLockUnlock={orderToLockUnlock}
                     orders ={this.state.orders}
                     open={this.state.lockModalOpen}
                     lockUnlockHandler= {this.handleOrderLock}
                 />
             }
             {this.state.deleteModalOpen &&
                 <DeleteModal
                     closeHandler={this.handleDeleteModalClose.bind(this)}
                     orderToDelete={this.state.orderToDelete}
                     open= {this.state.deleteModalOpen}
                     deleteHandler = {this.handleOrderDelete}
                 />
             }

        </Paper>

        )
    }


}

export default OrdersPage;
