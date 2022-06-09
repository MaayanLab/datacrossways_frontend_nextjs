import * as React from 'react';
import {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';

import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import styles from "./featuretable.module.css";
import { TableFooter } from '@mui/material';
import { boxSizing } from '@mui/system';

const rows = [
  createData('Frozen yoghurt',"wqelknwq89", 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich',"wqelkrgtwq89", 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair',"wqelkfgh", 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake',"wqel543dr", 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread',"werq89", 356, 16.0, 49, 3.9, 1.5),
  createData('Frozen yoghurt2',"wqdfgwq89", 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich2',"wqdfgknwq89", 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair2',"wqehfghq89", 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake2',"wqelknfgh89", 305, 3.7, 67, 4.3, 2.5)
];

function createData(name, uuid, calories, fat, carbs, protein, price) {
    return {
      name,
      uuid,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
  
  function Row({row, onCheckClick, selected}) {
    const [open, setOpen] = useState(false);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isItemSelected = isSelected(row.uuid);

    return (
      <React.Fragment>
        <TableRow className={styles.tr} style={{height: 36, paddingTop: 0, paddingBottom: 0, borderTop: '1px solid #e6e8eb'}} sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell  style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}}>
            
          <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                'aria-labelledby': row.uuid,
              }}
              style={{boxSizing: "border-box", height: 26}}
              onClick={(event) => onCheckClick(event, row.uuid)}  
            />
          </TableCell>
          <TableCell style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} component="th" scope="row">
            <IconButton
              aria-label="expand row"
              size="small"
              style={{boxSizing: "border-box", height: 26}}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} align="right">{row.calories}</TableCell>
          <TableCell style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} align="right">{row.fat}</TableCell>
          <TableCell style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} align="right">{row.carbs}</TableCell>
          <TableCell className={styles.tchover} style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: '0px solid black' }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 , border: '0px solid black'}}>
                <Typography variant="h6" gutterBottom component="div">
                  Info
                </Typography>
                <div>
                  This is just a small div.
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  

function FeatureTable() {

  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.uuid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setSelected(newSelected);
  };  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/file");
      const files = await res.json();
      console.log(files);
    };
    fetchData();
  }, []);

  return (
    <>
    <TableToolbar selected={selected}/>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{height: 20, paddingTop: 0, paddingBottom: 0, border: '0px solid black'}}>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={selected.length > 0 && selected.length < rows.length}
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            </TableCell>
            <TableCell/>
            <TableCell>Name</TableCell>
            <TableCell align="right">Modified</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Access</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Row 
                style={{height: 26}} 
                key={row.name} 
                row={row}
                selected={selected}
                onCheckClick={handleClick}  
              />
            ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      </>
  );
}

const TableToolbar = ({selected}) => {
  const { numSelected } = selected.length;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Files
        </Typography>
      )}
      {selected.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default FeatureTable;