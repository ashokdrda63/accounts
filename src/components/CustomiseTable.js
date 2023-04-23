import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@material-ui/core";

export default function CustomiseTable(props) {

    const [accBudgetMap, setAccBudgetMap] = React.useState(props.updatedData)
    const [deleteBudgetAcc, setDeleteBudgetAcc] = React.useState({
      acc_id:'',
      budget_id:'',
      table_name:''
    })
      
    useEffect(function () {
          axios.post("http://localhost:8000/get_all", {
            table_name: 'acc_budget_map',
          })
          .then((res) => {
            // console.log(res.data)
            setAccBudgetMap(res.data)
          })
          .then(console.error("on data"));
      }, [props.updatedData]);

      const deleteRow =async(row)=> {
        // console.log(row.acc_id,'+abs')
        // console.log(row.budget_id,'+abs')

        var temp= deleteBudgetAcc;
        temp["acc_id"] = row.acc_id;
        temp["budget_id"] = row.budget_id;
        temp["table_name"] = 'acc_budget_map'
        setDeleteBudgetAcc(temp)
        axios.post("http://localhost:8000/delete", deleteBudgetAcc)
          .then((res) => {
            // console.log(res.data);
            setAccBudgetMap(res.data); // will be written 2 queries. 1 for delete another for selecting other records
          })
          .then(console.error("on data"));
      }

      //  console.log('accBudgetMap..'+JSON.stringify(accBudgetMap))
      var keys = Object.keys(accBudgetMap)
      // console.log("accBudgetMap.data  :"+keys)

      var isDataPresent  =  keys != "dataExists" ? "true" : "fales"   //////-------------accBudgetMap.data

      // console.log("isDataPresent : "+isDataPresent)
      // console.log("isDataPresent : "+ accBudgetMap.dataExists )


      var colNames = (keys.legth == 0 || keys == '' || keys == "undefined" || keys == "null" || isDataPresent=="false" ) /////  ||isDataPresent=="false"
      ? [] : Object.keys(accBudgetMap[0]) 

      // console.log("colName: "+colNames)


      var filterColName = colNames.filter(x => x != 'seq_no')

      // console.log(filterColName)
      var modifiedColName = {
        acc_id:'Account Id',
        acc_name:'Account Name',
        budget_id:'Budget Id',
        budget_name:'Budget Name'
      }

  //console.log("accBudgetMap : "+accBudgetMap)
      
  return (
      <div >
    <TableContainer component={Paper} style={{padding: 4, width:900}}>
      <Table aria-label="simple table">
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
          {/* {((accBudgetMap == '' || accBudgetMap =='undefined' || accBudgetMap == null ) */}
          {((accBudgetMap == '' || accBudgetMap =='undefined' || accBudgetMap == null  || isDataPresent == "false")
                  ? [] : accBudgetMap).map((row) => (
            <TableRow key={row} >
              <TableCell component="th" scope="row">{row.acc_id}</TableCell>
              <TableCell align="left">{row.acc_name}</TableCell>
              <TableCell align="left">{row.budget_id}</TableCell>
              <TableCell align="left">{row.budget_name}</TableCell>
              <TableCell align="left">
              <Button variant="contained" justify="center" type="submit" color="primary"
              onClick={()  => deleteRow(row)}
              >
                        Delete
                </Button>
              </TableCell>
              <TableCell align="left">
              <Button variant="contained" justify="center" type="submit" color="primary"
              // onClick={()  => editRow(row)}
              >
                        Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
