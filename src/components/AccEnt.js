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
import CustomiseTable from "./CustomiseTable";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";


function AccEnt() {
  const intialvalue = {};
  const [budget, setBudget] = useState([]);
  const [budgetName, setBudgetName] = useState(" ");
  const [budgetObj, setBudgetObj] = useState(null);
  const [account, setAccount] = useState(intialvalue);
  const [entvalue, setEntValue] = useState("");
  const [maxSeq, setMaxSeq] = useState("");
  const [accountID, setAccountId] = useState("");

  useEffect(function () {
    axios
      .post("http://localhost:8000/get_all", { table_name: "budget" })
      .then((res) => {
        setBudget(res.data);
        console.log("axoius get" + JSON.stringify(res.data))
        // console.log( "axoius get"+res )
        // console.log( "axoius get"+ JSON.stringify(res))
        console.log("budhet" + budget)
      })
      .then(console.error("no data"));
  }, []);

  const handleChangeBudget = (event) => {
    setBudgetName(event.target.value);
    setBudgetObj(event.target.value);
    console.log("get" + JSON.stringify(event.target.value));
    console.log("get" + JSON.stringify(budgetObj));
    console.log("name" + JSON.stringify(budgetName));

  };

  const onValueChange = (key, event) => {
    var enterTxt = event.target.value;
    setEntValue(enterTxt);
    var sequenceGen = "_" + (maxSeq + 1); 
    if (enterTxt == "" || enterTxt == "null") {
      sequenceGen = " ";
      setAccountId("");
    }
    if (maxSeq.length == 0)
      setAccountId(enterTxt.substr(0, 3) + "_01");
    else
      setAccountId(enterTxt.substr(0, 3) + sequenceGen);
  };


  const generateSeq = () => {
    axios.post("http://localhost:8000/get_seq", {
      table_name: 'acc_budget_map',
    })
      .then((res) => {
        console.log('Inside AccountEntry : ' + JSON.stringify(res.data));
        console.log('Inside AccountEntry : ' + JSON.stringify(res.data[0]));
        setMaxSeq((res.data[0]).max_seq); ///////
      })
      .then(console.error("on data"));
  }
  const [updatedData, setUpdatedData] = useState([])
  const addAccountDetails = async () => {
    var tableName = 'acc_budget_map'
    var temp = account;
    temp["acc_id"] = accountID;
    temp["acc_name"] = entvalue;
    temp["budget_id"] = budgetObj == null ? "" : budgetObj.id
    temp["budget_name"] = budgetObj == null ? "" : budgetObj.name
    temp["table_name"] = tableName
    setAccount(temp)
    await axios.post("http://localhost:8000/insert_acc_budget_map", account)
      .then((res) => {
        setUpdatedData(res.data);
        console.log("update" + res.data)
      })
      .then(console.error("on data"));;
  };

  return (
    <Box sx={{ display: "grid", justifyContent: "center", justifyItems: "center",my:4 }}>
      <Box style={{ padding: 5, justify: "center" }}>
        <InputLabel id="demo-simple-select-label">Budget name</InputLabel>
        <Select
          style={{ width: 500 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={budgetName}
          onChange={(event) => handleChangeBudget(event)}
        >
          {budget.map((data) => (
            <MenuItem value={data}>{data.name}</MenuItem>
          ))}

        </Select>
        &nbsp;&nbsp;
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          value={budgetObj == null ? "" : budgetObj.id}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <Box style={{ padding: 5, justify: "center" }}>
        <TextField
          style={{ width: 500 }}
          required
          id="outlined-required"
          label="Account name"
          value={entvalue}
          onChange={(event) => onValueChange("account_name", event)}
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
      <Box sx={{my:2}}>
        <Button
          variant="contained"
          justify="center"
          type="submit"
          color="primary"
          onClick={addAccountDetails}
          onMouseEnter={generateSeq}
        >
          Map Budget Account
         </Button>
      </Box>
      <Box sx={{my:3}}>
        <CustomiseTable updatedData={updatedData} />
      </Box>
    </Box>
  );
}

export default AccEnt;
