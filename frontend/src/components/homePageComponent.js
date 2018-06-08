import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrdersComponent from './OrdersComponent';
import EditOrder from './OrdersTable/EditOrderComponent';
// import OrderComponent from './OrderComponent';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class HomePage extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                // value : 'orders',
                tabs: [
                    'orders'
                ],
                selectedTab: 'orders',
            }
            this.handleNewTab = this.handleNewTab.bind(this);
            this.cancelChanges = this.cancelChanges.bind(this);
        };
        cancelChanges = id => {
            let tabs = this.state.tabs.filter(x => x !== id);
            this.setState({tabs: tabs});
            this.setState({selectedTab: 'orders'});
        };

        handleNewTab = id => {
            let tabs = this.state.tabs;
            if(!this.state.tabs.includes(id)){
                tabs.push(id);
                this.setState({tabs: tabs});
            }
            this.setState({selectedTab: id});
        };

        handleChange = (event, value) => {
            this.setState({ selectedTab: value });
            this.forceUpdate();
        };

        render() {
            const { classes } = this.props;
            const { tabs } = this.state;

            return (
                <div className={classes.root}>
                    <Tabs
                        value={this.state.selectedTab}
                        onChange={this.handleChange}
                        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                    >
                    { tabs.map((tab) => {
                            return (
                                <Tab key={tab}
                                    disableRipple
                                value={tab}

                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label={tab}
                                />

                            )
                        })
                    }
                    </Tabs>
                    { this.state.selectedTab === 'orders'
                        ? <OrdersComponent openNewTab={this.handleNewTab}/>
                        : <EditOrder orderId={this.state.selectedTab} onCancel= {this.cancelChanges} />
                    }
                </div>
            );
                    }
                    }

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
