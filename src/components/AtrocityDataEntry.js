import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React from 'react';
import axios from  'axios';

function createData(PSname, JERno, JERdate,NameVictim,Adress,Dateoccured,placeoccured,subcaste,Gender,udersection,ipcno,Inspby,Convictedby,Bankname,Benname,IFSCcosde,Mob_no,JERAmount,DWOAmount,Firstph,SecondP,Thitfph,) {
    return {PSname,JERno,JERdate,NameVictim,Adress,Dateoccured,placeoccured,subcaste,gender,udersection,inspby,Convictedby,Bankname,Benname,IFSCcosde,Mob_no,JERAmount,DWOAmount,Firstph,SecondP,Thitfph};
}
// var rows = []
export default function AtrocityDataEntry(props) {
    const [rows, setRows] = React.useState([])
    const [editFlag, setEditFlag] = React.useState(false)
    const [sr, SetSelectedRow] = React.useState(false)
   

     const [psname, setPsname] = React.useState('');
    const entepsname = (e) => {
        setpsname(e.target.value)
    }


    const [jerno, setjerno] = React.useState('');
    const enterjerno = (e) => {
        setjrno(e.target.value)
        console.log(jerno)
    }


    const [jerdate, setjerdate] = React.useState('');
    const enterjerdate = (e) => {
        setserdate(e.target.value)
    }

    const [gender, setGender] = React.useState('');
    const enterGender = (e) => {
        setGender(e.target.value)
    }

    const [salary, setsalary] = React.useState('');
    const entersalary = (e) => {
        setsalary(e.target.value)
    }

   

    const onEnterPress = (e) => {
        if (e.key == "Enter") {
            console.log("editFlag : "+editFlag)
            if(editFlag == false) {
                console.log("Inside if")
                var obj = createData(rollno, fname, age, gender, salary)
                setRows(oldArray => [...oldArray, obj])
            } else {
                console.log("Inside else")
                updateRecord()
            }
            
        }
    }

    
    const updateRecord = () => {
        var obj = createData(fname, age, gender, salary)
        var arr = (rows.filter(x => x != sr)).push(obj)       

        console.log(arr)
        setRows(oldArray => [...oldArray, arr])
    }

    const deleteRecord = (row) => {
        var arr = rows.filter(x => x != row)
        setRows(arr)
    }

    
    const EditRecord = (row, indexVal) => {
        //console.log(row )
        setrollno(row.rollno)
        setfname(row.fname)
        setAge(row.age)
        setGender(row.gender)
        setsalary(row.salary)
        
        setEditFlag(true)
        SetSelectedRow(row)
        
    }
    console.log("Value : "+JSON.stringify(rows))
       

    const SubmitAll =async() =>{
        await axios.post("http://localhost:8000/insert_familyy_particulars",rows)
     .then((res) => {
       console.log("update"+res.data)
      })
      .then(console.error("on data"));
    }
    const searchBasedOnrollno =async()=> {
        await axios.post("http://localhost:8000/search_rollno",{ rollno: rollno })
        .then((res) => {
          setRows(res.data)
         })
         .then(console.error("on data"));
}
    
    return (
        <div>
            <div style={{padding:10}}>
            <TextField id="outlined-basic" label="rollno." variant="outlined"
                    onChange={(event) => enterrollno(event)} value={rollno} /> &nbsp;

            <Button variant="contained" onClick={()=>searchBasedOnrollno()}>Search</Button>
            </div>
            <div style={{padding:10}}>
                <TextField id="outlined-basic" label="fname" variant="outlined"
                    onChange={(event) => enterfname(event)} value={fname} /> &nbsp;

                <TextField id="outlined-basic" label="Age" variant="outlined"
                    onChange={(event) => enterAge(event)} value={age} /> &nbsp;

                <TextField id="outlined-basic" label="Gender" variant="outlined"
                    onChange={(event) => enterGender(event)} value={gender} /> &nbsp;

                <TextField id="outlined-basic" label="salary" variant="outlined"
                    onChange={(event) => entersalary(event)} value={salary}
                    onKeyPress={(event) => onEnterPress(event)} />
            </div> <br />

            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 100 }}>SL No.</TableCell>
                                <TableCell style={{ width: 100 }}>fname</TableCell>
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
                                    <TableCell >{row.fname}</TableCell>
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
                {/* <div >
                {rows.map((row, index) => (
                    test += row.salary
                )))}
                </div> */}
                <Button variant="contained" onClick={SubmitAll}>Submit</Button>
            </div>
        </div>
    );
}