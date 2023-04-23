import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React from 'react';
import axios from  'axios';

    var [rows, setRows] = React.useState([])
    const [editFlag, setEditFlag] = React.useState(false)
    const [sr, SetSelectedRow] = React.useState([])


    const SubmitAll =async() =>{
        await axios.post("http://localhost:8000/insert_family_perticular",rows)
     .then((res) => {
       console.log("update"+res.data)
           
      })
      .then(console.error("on data"));
    }

 
    

        
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 100 }}>SL No.</TableCell>
                                <TableCell style={{ width: 100 }}>Name</TableCell>
                                <TableCell style={{ width: 100 }} align="right">Age</TableCell>
                                <TableCell style={{ width: 100 }} align="center">Gender</TableCell>
                                <TableCell style={{ width: 100 }} align="right">Salary</TableCell>
                                <TableCell style={{ width: 100 }} align="center">Delete</TableCell>
                                <TableCell style={{ width: 100 }} align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >{index + 1}</TableCell>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell align="right">{row.age}</TableCell>
                                    <TableCell align="right">{row.gender}</TableCell>
                                    <TableCell align="right">{row.salary}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => deleteRecord(row)}>Delete</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => EditRecord(row, index)}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
                </TableContainer>
                
                <Button variant="contained" onClick={SubmitAll, resetTable}>Submit</Button>
                <label>{total}</label>
                
            </div>
        </div>
    );
}