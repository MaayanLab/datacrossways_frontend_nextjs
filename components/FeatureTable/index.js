import * as React from 'react';
import {useEffect, useState} from 'react'
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

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

import FileSaver from 'file-saver';

import styles from "./featuretable.module.css";
import { Config } from '../../config/Config.js'; 

const downloadFile = (file) => {
  const fetchURL = async () => {
    const res = await fetch(Config["api_url"]+"/api/file/download/"+file.id);
    const urlres = await res.json();
    FileSaver.saveAs(urlres.url, file.display_name);
  
  };
  fetchURL();
}

function niceBytes(bytes, decimals=2, binaryUnits=false) {
  if(bytes == 0) {
      return '0 Bytes';
  }
  var unitMultiple = (binaryUnits) ? 1024 : 1000; 
  var unitNames = (unitMultiple === 1024) ? // 1000 bytes in 1 Kilobyte (KB) or 1024 bytes for the binary version (KiB)
      ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']: 
      ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));
  return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(decimals || 0)) + ' ' + unitNames[unitChanges];
}

function niceDate(date_string){
  let d = new Date(date_string);
  var options = { hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' };
  const regex = /:[0-9]*\s/ig;
  return d.toLocaleString(options).toLowerCase().replaceAll(regex, " ");
}

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
    console.log(row);
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
            {row.display_name}
          </TableCell>
          <TableCell className={styles.cell} style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} align="right">{niceDate(row.date)}</TableCell>
          <TableCell className={styles.filesize} style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} align="right">{niceBytes(row.size)}</TableCell>
          <TableCell className={`${styles.cell} ${styles.tchover}`} style={{paddingTop: 0, paddingBottom: 0, border: '0px solid black'}} align="right">
            {(() => {
              if(row.permissions.indexOf("read")!=-1 || row.accessibility!="locked"){
                return(
                  <>
                  <div className={styles.access}>open <LockOpenIcon/></div>
                  <div className={styles.download}>
                    download 
                    <Tooltip title="Download file">
                      <IconButton style={{boxSizing: "border-box", height: 26}}>
                        <SaveAltIcon onClick={() => {
                          downloadFile(row);
                        }}/>
                      </IconButton>
                    </Tooltip>
                  </div>
                  </>
                )
              }
              else{
                return(
                  <div className={styles.noaccess}>private <LockRoundedIcon/></div>
                )
              }
          })()}
          </TableCell>
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
                  Name: {row.name}
                  <br/>
                  Display Name: {row.display_name}
                  <br/>
                  UUID: {row.uuid}
                  <br/>
                  Creation Date: {niceDate(row.date)}
                  <br/>
                  Accessibility: {row.accessibility}
                  <br/>
                  Owner: {row.owner_name}
                  <br/>
                  Visibility: {row.visibility}
                  <br/>
                  File Size: {niceBytes(row.size)}

                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  

function FeatureTable({collection, cid}) {

  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => {
    if(event.target.checked){
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
      if(collection){
        setRows(collection[0]["child_files"]);
      }
    };
    fetchData();
  }, [collection]);

  return (
    <>
    <TableToolbar selected={selected}/>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{height: 20, paddingTop: 0, paddingBottom: 0, border: '0px solid black'}}>
            <TableCell padding="checkbox">
            <Tooltip title="Select/Deselect all">
              <Checkbox
                className={styles.check}
                color="primary"
                indeterminate={selected.length > 0 && selected.length < rows.length}
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            </Tooltip>
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
                key={row.uuid} 
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