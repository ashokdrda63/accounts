import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Autocomplete, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { Grid } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core"; 
import CustomiseTable from "./CustomiseTable";

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

function AccountEntry() {
  const intialvalue = {
    // a_id: "",
    // a_name: "",
    // b_id: "",
    // b_name: "",
    // table_name: "",
  };

  const [budget, setBudget] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [account, setAccount] = useState(intialvalue);

  const [budgetObj, setBudgetObject] = useState(null);
  
  const [entvalue, setEntValue] = useState("");
  const classes = useStyles();
  
  const [maxSeq, setMaxSeq] = React.useState('')
  useEffect(function () {
    axios
    .post("http://localhost:8000/get_all", { table_name: "budget" })
    .then((res) => {
      console.log(res.data)
      setBudget(res.data);
    })
    .then(console.error("on data"));
    

    generateSeq ( );
    // axios.post("http://localhost:8000/get_seq", {
    //   table_name: 'acc_budget_map',
    // })
    // .then((res) => {
    //   console.log('Inside AccountEntry : '+res.data);
    //   setMaxSeq((res.data[0]).max_seq);
    // })
    // .then(console.error("on data"));
    
  }, []);
  
  const [accountID, setAccountId] = React.useState('')

  const handleChangeBudget = (event) => {
    setBudgetName(event.target.value);
    // alert(JSON.stringify(event.target.value.id))
    setBudgetObject(event.target.value);
    // console.log("get"+budgetObj)
  };

  const onValueChange = (key, e) => {
    var enteredTxt = e.target.value
    setEntValue(enteredTxt);
    console.log( maxSeq)

    var sequenceGen = '_'+(maxSeq+ 1);

    
    if(enteredTxt == ''|| enteredTxt =="null"){
      sequenceGen = " ";
      setAccountId('');
    }

    if(maxSeq ==0)
        setAccountId(enteredTxt.substr(0,3)+"_001")
      else
        setAccountId(enteredTxt.substr(0,3)+sequenceGen)
  };

 const checkEntry =()=>{
   if (budgetName == "" || entvalue == ""|| entvalue.length < 4){
     alert( "not a Valid account name")
     return false
   }else return true
 }
  
 // var idStr = ''
  const [updatedData, setUpdatedData] = useState([])
  const addAccountDetails = async () => {
    var tableName = 'acc_budget_map'
  
    if (checkEntry()==false) return
   

    var temp = account;
    temp["acc_id"] = accountID;
    temp["acc_name"] = entvalue;
    temp["budget_id"] = budgetObj == null ? '' :  budgetObj.id;
    temp["budget_name"] = budgetObj == null ? '' :budgetObj.name;
    temp["table_name"] = tableName;

    //console.log("Hello...." + account);

    setAccount(temp);
    await axios.post("http://localhost:8000/insert_acc_budget_map", account)
    .then((res) => {
      setUpdatedData(res.data);
      // console.log("update"+res.data)
    })
    .then(console.error("on data"));

  };

  const generateSeq = () => {
    axios.post("http://localhost:8000/get_seq", {
      table_name: 'acc_budget_map',
    })
    .then((res) => {
      // console.log('Inside AccountEntry : '+ JSON.stringify( res.data));
      setMaxSeq((res.data[0]).max_seq);
      // console.log('Inside AccountEntry : '+ JSON.stringify(res.data[0]).max_seq);
    })
    .then(console.error("on data"));
  }

  return (
    <div>
    <div>
      <Box  style={{ padding:5, justify: "center" }}>
      <InputLabel id="demo-simple-select-label" style = {{paddingTop:0}}>Budget</InputLabel>
      <Select
      style={{width:500}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={budgetName}
          
            onChange={(event) => handleChangeBudget(event)}
          >
            {((budget == null || budget == []) ? " ":budget).map((data, index) => (
              <MenuItem value={data}>{data.name}</MenuItem>
            ))}
          </Select>
              &nbsp;&nbsp;
          <TextField
          id="outlined-read-only-input"
          label="Read Only"
          value={budgetObj == null ? '' : budgetObj.id}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </div>

    <div>
      <Box  style={{  padding:5, justify: "center" }}>
      <TextField
        style={{width:500}}
          required
          id="Account-required"
          label="Account Entry"
          value={entvalue}
          onChange={(e) => onValueChange("account_name", e)}
              id="my-input-id"
           
        />
          &nbsp;&nbsp;
        <TextField
            id="outlined-read-only-input"
            label="Read Only"
            value={accountID}
            InputProps={{
              readOnly: true,
            }}      
          />
      </Box>
    </div>
    <div>
    <Button
          variant="contained"
          justify="center"
          type="submit"
          color="primary"
          onClick={addAccountDetails}
          onMouseEnter = {generateSeq}
          //onKeyPress={addAccountDetails}
        >
          Map Budget Account
        </Button>
    </div>
            <div>
              <CustomiseTable updatedData={updatedData}/>
            </div>
    </div>
  );
}

export default AccountEntry;
