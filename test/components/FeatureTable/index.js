import * as React from 'react';
import {useEffect} from 'react'
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

import styles from "./featuretable.module.css";
import { TableFooter } from '@mui/material';

function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
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
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow style={{height: 24, paddingTop: 0, paddingBottom: 0, border: '0px solid rgba(0, 0, 0, 0.00)'}} sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell  style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}}>
            <IconButton
              aria-label="expand row"
              size="small"
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
          <TableCell style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow style={{height: 33}}>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date} style={{height: 13}}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    createData('Frozen yoghurt2', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich2', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair2', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake2', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread2', 356, 16.0, 49, 3.9, 1.5),
    createData('Frozen yoghurt3', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich3', 237, 9.0, 37, 4.3, 4.99),
    createData('Ecl3air', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcak3e', 305, 3.7, 67, 4.3, 2.5),
    createData('Ginger3bread', 356, 16.0, 49, 3.9, 1.5),
    createData('Frozen yog3hurt2', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sa3ndwich2', 237, 9.0, 37, 4.3, 4.99),
    createData('Ec3lair2', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupca3ke2', 305, 3.7, 67, 4.3, 2.5),
    createData('Ginger3bread2', 356, 16.0, 49, 3.9, 1.5)
  ];
  

function FeatureTable() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Row style={{height: 33}} key={row.name} row={row} />
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
  );
}

export default FeatureTable;