import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React from 'react';
import axios from  'axios';

function createData(houseNo, name, age, gender, salary) {
    return { houseNo, name, age, gender, salary };
}
// var rows = []
export default function TableEntryTest(props) {


    const [houseNo, setHouseNo] = React.useState('');
    const enterHouseNo = (e) => {
        setHouseNo(e.target.value)
    }


    const [name, setName] = React.useState('');
    const enterName = (e) => {
        setName(e.target.value)
        console.log(name)
    }

    const [age, setAge] = React.useState('');
    const enterAge = (e) => {
        setAge(e.target.value)
    }

    const [gender, setGender] = React.useState('');
    const enterGender = (e) => {
        setGender(e.target.value)
    }

    const [salary, setSalary] = React.useState('');
    const enterSalary = (e) => {
        setSalary(e.target.value)
    }

    var [rows, setRows] = React.useState([])
    const [editFlag, setEditFlag] = React.useState(false)
    const [sr, SetSelectedRow] = React.useState([])

    const onEnterPress = (e) => {
        if (e.key == "Enter") {
            console.log("editFlag : "+editFlag)
            if(editFlag == false) {
                console.log("Inside if")
                var obj = createData(houseNo, name, age, gender, salary)
                setRows(oldArray => [...oldArray, obj])
                console.log("rows"+rows)
            } else {
                console.log("Inside else")
                updateRecord()
            }
           resetFields()
        }
    }

    //console.log('Rows : '+rows) 
    var total = 0
    rows.map((x) =>
        // tot  = tot + parseInt(x.gender)
        total  = total + parseInt(x.salary)
        )
        
    const updateRecord = () => {
        var obj = createData(houseNo, name, age, gender, salary)
        rows[selectedIndex] = obj
        // var arr = (rows.filter(x => x != sr))
        // arr.push(obj)      
        // setRows(arr)
    }

    const deleteRecord = (row) => {
        var arr = rows.filter(x => x != row)
        setRows(arr)
    }

    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const EditRecord = (row, indexVal) => {
        //console.log(row )
        setHouseNo(row.houseNo)
        setName(row.name)
        setAge(row.age)
        setGender(row.gender)
        setSalary(row.salary)
        
        setEditFlag(true)
        SetSelectedRow(row)
        setSelectedIndex(indexVal)
    }
    // console.log("Value : "+JSON.stringify(rows))
    console.log(        rows)
       

    const SubmitAll =async() =>{
        await axios.post("http://localhost:8000/insert_family_perticular",rows)
     .then((res) => {
       console.log("update"+res.data)
           
      })
      .then(console.error("on data"));

      
    }

    
    const resetFields = () => { 
        // setHouseNo("")
        setName("")
        setAge("")
        setGender("")
        setSalary("")
    }

    
    const resetTable = () => { 
        setRows([])
    }

    const searchBasedOnHouseNo =async()=> {
            await axios.post("http://localhost:8000/search_house_no",{ house_no: houseNo })
            .then((res) => {
              setRows(res.data)
             })
             .then(console.error("on data"));
    }

    const setFocus = (e, id) => {
        if(e.key == "Enter") 
        document.getElementById(id).focus()
    }

    const [file, setFile] = React.useState();
    const [fileName, setFileName] = React.useState("");

      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
          const res = await axios.post(
            "http://localhost:8000/upload",
            formData
          );
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      };
    return (
        <div>
            <div style={{padding:10}}>
            <TextField id="outlined-basic" label="House No." variant="outlined"
                    onChange={(event) => enterHouseNo(event)} value={houseNo} 
                    onKeyPress={(event) => setFocus(event,'name')}/> &nbsp;

            <Button variant="contained" onClick={()=>searchBasedOnHouseNo()}>Search</Button>
            </div>
            <div style={{padding:10}}>
                <TextField id="name" label="Name" variant="outlined"
                    onChange={(event) => enterName(event)} value={name}
                    onKeyPress={(event) => setFocus(event,'age')} /> &nbsp;

                <TextField id="age" label="Age" variant="outlined"
                     onChange={(event) => enterAge(event)} value={age} 
                     onKeyPress={(event) => setFocus(event,'gender')} /> &nbsp;
                    
                <TextField id="gender" label="Gender" variant="outlined"
                    onChange={(event) => enterGender(event)} value={gender}                    
                    onKeyPress={(event) => setFocus(event,'salary')} /> &nbsp;

                <TextField id="salary" label="Salary" variant="outlined"
                    onChange={(event) => enterSalary(event)} value={salary}
                    onKeyPress={(event) => onEnterPress(event)} />
            </div> <br />

            <div stye={{width: 100}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 150 }} aria-label="simple table" >
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
                
                <Button variant="contained" onClick={() => {SubmitAll(); resetTable();} }>Submit</Button>
                <label>{total}</label>
                
        <div className="App" style={{paddingTop: '30px'}}>
          <input type="file" onChange={saveFile} />
          <button onClick={uploadFile}>Upload</button>
        </div>

            </div>
        </div>
    );
}