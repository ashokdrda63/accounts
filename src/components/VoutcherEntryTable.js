import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Select from "@mui/material/Select";
import { Autocomplete, Grid, MenuItem } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import VoucherEntry from "./VoucherEntry";
import { set } from "date-fns";


function createData(accountTy, accountDesName, accountTo, accountFrom) {
  return { accountTy, accountDesName, accountTo, accountFrom };
}

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th ": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

function VoutcherEntryTable(props) {
  console.log("props table", props);
  const [accountDes, setAccountDes] = useState([]);
  const [accountDesName, setAccountDesName] = useState("");
  // console.log("accountDesName",accountDesName)

  const handleChangeForAcc = (e) => {
    accountTy == "to" ? setAccountTo(accTo.current.value = "0") : setAccountFrom(accFrom.current.value = "0")
    setAccountDesName(e.target.value);
  };

  const [accountTo, setAccountTo] = useState("");
  const [accountFrom, setAccountFrom] = useState("");

  let accFrom = useRef(null);
  let accTo = useRef(null);

  const enterAmountTo = (e) => {
    setAccountTo(e.target.value);
  };
  const enterAmountFrom = (e) => {
    setAccountFrom(e.target.value);
  };

  const [rows, setRows] = React.useState([]);
  const [editFlag, setEditFlag] = React.useState(false);
  const [sr, SetSelectedRow] = React.useState([]);

  const deleteRecord = (row) => {
    var arr = rows.filter((x) => x != row);
    setRows(arr);
  };

  const [accountTy, setAccountTy] = useState("");
  const [check, setCheck] = useState(false);
  // console.log(accountTy, "accountTy");

  const handleChange1 = (e) => {
    setAccountTy(e.target.value);
    // console.log(accountTy, "accountTy1");
    // setCheck(true);
    // console.log('eeee', check);
    // accountTy=="to" ? setAccountTo(accTo.current.value="0"):setAccountFrom(accFrom.current.value="0")
    var schemeName = props.sn.name; // Staff Salary
    var voucherType = props.tv; // BR
    var toFrom = e.target.value; // FROM / TO
    if (schemeName != "" && voucherType != "" && toFrom != "") {
      axios
        .post("http://localhost:8000/get_all_accountDes", {
          scheme_name: schemeName,
          voucher_type: voucherType,
          to_from: toFrom,
        })
        .then((res) => {
          // console.log("res.data : " + res.data);
          setAccountDes(res.data);
        })
        .then(console.error("no data"));
    }
    // console.log("setAccountDes", accountDes)
  };

  const onEnterPress = (e) => {
    if (e.key == "Enter") {
      // console.log("editFlag : " + editFlag);
      if (editFlag == false) {
        // console.log("Inside if");
        var obj = createData(accountTy, accountDesName, accountTo, accountFrom);
        setRows((oldArray) => [...oldArray, obj]);
      } else {
        // console.log("Inside else");
        updateRecord();
      }
      resetFields();
    }
  };

  const updateRecord = () => {
    var obj = createData(accountTy, accountDesName, accountTo, accountFrom);
    rows[selectedIndex] = obj;
  };

  const resetFields = () => {
    setAccountTy("");
    setAccountDesName("");
    setAccountTo("");
    setAccountFrom("");
    setEditFlag(false);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const EditRecord = (row, indexVal) => {
    setAccountTy(row.accountTy);
    setAccountDesName(row.accountDes);
    setAccountTo(row.accountTo);
    setAccountFrom(row.accountForm);
    setEditFlag(true);
    SetSelectedRow(row);
    setSelectedIndex(indexVal);
  };

  // function subtotal() {
  //   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  // }
  const subTotalTo= rows.reduce((sum,item)=>sum + Number(item.accountTo),0);
  const subTotalFrom= rows.reduce((sum,item)=> sum+ Number(item.accountFrom),0);
  
  const [vchInEntSync,setVchInEntSync] = useState([]);
  // const [vchOutEntSync,setVchOutEntSync] = useState( );
  
  //  console.log("aaaa",props?.sn?.name)
  //  console.log("bb",rows?.accountTy)
  //  console.log("cc",props?.vn)
  
  const SubmitAllInward =async()=>{ 
    alert("hello")
     let vchInEntSync = rows.map( (v,i)=>(
        console.log("<<<",v,i),
      {...v,accountDesName:v?.accountDesName?.acc_name, vch_no:props?.vn,scheme_name: props?.sn?.name}) )

      // console.log('temp child',temp)
      console.log('temp child1',vchInEntSync)
    
    await axios.post("http://localhost:8000/insert_inword_voucher",vchInEntSync)
    .then((res)=>{
      console.log("res",res)
    })
    .then(console.error("no data"))
    

    await axios.post("http://localhost:8000/insert_outword_voucher", )
  }
  // console.log("vchInEntSync",vchInEntSync)
  // console.log(accountDesName, "rwwwwwwwwwwwwwwwwwwwwwwws");
  // console.log(rows, "rows");
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ backgroundColor: "#f4f5fd" }}>
      <Grid>
        <Box style={{ padding: 5 }}>
          <TextField
            id="outlined-basic"
            label="To/From"
            variant="outlined"
            size="small"
            select
            style={{ width: 200 }}
            value={accountTy}
            onChange={handleChange1}
          >
            <MenuItem value="to">TO</MenuItem>
            <MenuItem value="from">FROM</MenuItem>
          </TextField>
          &nbsp;&nbsp;
          <TextField
            id="outlined-basic"
            label=" Account Description"
            variant="outlined"
            size="small"
            select
            style={{ width: 200 }}
            value={accountDesName}
            // *********//
            onChange={handleChangeForAcc}
          >
            {accountDes.map((data) => (
              <MenuItem value={data}>{data.acc_name}</MenuItem>
            ))}
          </TextField>
          &nbsp;&nbsp;
          <TextField
            id="outlined-basic"
            label="Ammount-To"
            variant="outlined"
            size="small"
            style={{ width: 200 }}
            value={accountTo}
            ref={accTo}
            onChange={(event) => enterAmountTo(event)}
            onKeyPress={(event) => onEnterPress(event)}
          />
          &nbsp;&nbsp;
          <TextField
            id="outlined-basic"
            label="Ammount-From"
            variant="outlined"
            size="small"
            style={{ width: 200 }}
            value={accountFrom}
            ref={accFrom}
            onChange={(event) => enterAmountFrom(event)}
            onKeyPress={(event) => onEnterPress(event)}
          />
        </Box>
      </Grid>
      <Grid xs={10} justifyContent="center">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 30 }}>SL No.</TableCell>
                <TableCell style={{ width: 80 }} align="Left">
                  Account Type
                </TableCell>
                <TableCell style={{ width: 100 }} align="Left">
                  Account Description
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  Amount To
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  Amount From
                </TableCell>
                <TableCell style={{ width: 50 }} align="center">
                  Delete
                </TableCell>
                <TableCell style={{ width: 50 }} align="center">
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            {console.log("rows", rows)}
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.accountTy}</TableCell>
                  <TableCell align="left">
                    {row?.accountDesName?.acc_name}
                  </TableCell>
                  <TableCell align="center">{row.accountTo}</TableCell>
                  <TableCell align="center">{row.accountFrom}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteRecord(row)}><DeleteIcon/></Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => EditRecord(row, index)}><EditIcon/></Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={1} />
                <TableCell colSpan={2} align="center" sx={{ backgroundColor: "green" ,fontWeight:700}}>Subtotal</TableCell>
                <TableCell align="center">{subTotalTo}</TableCell>
                <TableCell align="center">{subTotalFrom}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={( )=>(SubmitAllInward(),props.SubmitAllOutward(accountDesName?.acc_name,subTotalTo,subTotalFrom))} sx={{mt:10,ml:"45%"}} >
          Submit
        </Button>
        {/* onClick={(SubmitAll, resetTable)} */}
        {/* <label>{total}</label>
        <div className="App" style={{ paddingTop: "30px" }}>
          <input type="file" onChange={saveFile} />
          <button onClick={uploadFile}>Upload</button>
        </div> */}
      </Grid>
    </Grid>
  );
}

export default VoutcherEntryTable; 
