import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: {
      backgroundColor: "#CFCFCF",
      minHeight: '50px',
  },

  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  deleteSelected: {
      width: '120px',
      backgroundColor: '#fff',
      height: '30px',
  }
});

let OrdersTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.highlight)}
    >
      <div className={classes.title}>
        {/* {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Nutrition
          </Typography>
        )} */}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
          { numSelected
              ?<button className={classes.deleteSelected} onClick= {props.deleteSelected}>Delete ({numSelected})</button>
              :<button className={classes.deleteSelected} onClick= {props.deleteSelected} disabled>Delete ({numSelected} )</button>


          }

      </div>
    </Toolbar>
  );
};

OrdersTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  deleteSelected: PropTypes.func.isRequired,
};
export default withStyles(toolbarStyles)(OrdersTableToolbar);
