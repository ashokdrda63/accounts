import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Button } from "@material-ui/core";
import reactDom from 'react-dom';
import ObMaster from "./ObMaster";

export default function ObmasterTable(props) {

  const [obmaster, setObmaster] = React.useState([])
   
  useEffect(function () {
    axios.post("http://localhost:8000/get_all", {
      table_name: 'obmaster',
    })
    .then((res) => {
      //  console.log(res.data)
        setObmaster (res.data)
    })
    .then(console.error("on data"));
  }, []);

   var keys =Object.keys( obmaster);
  //  console.log (keys)
  
  var colNames = (keys.legth == 0 || keys == '' || keys == "undefined" || keys == "null"  ) /////  ||isDataPresent=="false"
  ? [] : Object.keys(obmaster[0]) 
  // console.log (colNames)

   var filterColName = colNames.filter(x => x != '')
        // console.log(filterColName)

   var modifiedColName = {
      seq_no:"S.no",
      scheme_id:"Scheme Id",
      scheme_name:"Scheme Name",
      budget_id:'Budget Id',
      budget_name:'Budget Name',
      acc_id:'Account Id',
      acc_name:'Account Name',
      credit:"Cradit",
      debit:"Debit",
     // isEdit:isEditable // if false then insert the data. if true then update
    }

    const[isEditable, setIsEditable] = React.useState('false')
    const EditRow =(row, isEdit)=>{
        setIsEditable(isEdit)
        
        reactDom.render(
          <React.Fragment>
              <ObMaster editRow={row} isEditable = {true}/>
          </React.Fragment>, document.getElementById('obMasterDiv')
      );

          setIsEditable("false")
    }



  return (
    <div id="ObMasterTableDiv">
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              filterColName.map((data) => 
                    <TableCell>{modifiedColName[data]}</TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
         {
           obmaster.map((row)=>(
            <TableRow key={row} >
              <TableCell component="th" scope="row">{row.seq_no}</TableCell>
              <TableCell align="left">{row.scheme_id}</TableCell>
              <TableCell align="left">{row.scheme_name}</TableCell> 
              <TableCell align="left">{row.budget_id}</TableCell>
              <TableCell align="left">{row.budget_name}</TableCell> 
              <TableCell align="left">{row.acc_name}</TableCell>
              <TableCell align="left">{row.acc_id}</TableCell>
              <TableCell align="left">{row.credit}</TableCell>
              <TableCell align="left">{row.debit}</TableCell>
              <TableCell align="left">
              <Button variant="contained" justify="center" type="submit" color="primary"
              onClick={()  => EditRow(row, "true")}
              >
                        Edit
                </Button>
              </TableCell> 
             </TableRow> 
           ))
         }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
