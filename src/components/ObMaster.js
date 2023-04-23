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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import reactDom from "react-dom";


import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { margin } from "@mui/system";
import ObmasterTable from "./ObMasterTable";

function ObMaster(props) {

  var selectedRow = props.editRow
  var isEditEnabled = props.isEditable

  console.log("Hello : " + JSON.stringify(selectedRow) + " :: " + isEditEnabled)
  const intialalvalue = {
    // a_id: "",
    // a_name: "",
    // b_id: "",
    // b_name: "",
    // table_name: "",
  }


  const [editValue, setEditValue] = useState(props.editRow)

  const [scheme, setScheme] = useState([]);
  // const [schemeName, setSchemeName] = useState( (editvalue =='' || editvalue =='undefined' || editvalue == null ) ?
  //   ''  : editvalue.scheme_name);

  const [schemeName, setSchemeName] = useState('');
  const [schemeName1, setSchemeName1] = useState('');
  const [schemeObj, setSchemeObj] = useState(null);

  const [budget, setBudget] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [budgetObj, setBudgetObject] = useState(null);

  const [budgetAcc, setBbudgetAcc] = useState([]);
  const [budgetAccName, setBudgeAcctName] = useState([]);
  const [budgetAccObj, setBudgeAcctObj] = useState(null);

  const [inputs, setInputs] = useState({});
  const [amount, setAmount] = useState({})

  const [ObMasterSync, setObMasterSync] = useState(intialalvalue)
  const [updatedData, setUpdatedData] = useState([])

  useEffect(function () {
    axios
      .post("http://localhost:8000/get_all_scheme_obmaster", { table_name: "Scheme" })
      .then((res) => {
        setScheme(res.data);
        console.log("axoius get" + JSON.stringify(res.data))
      })
      .then(console.error("no data"));

    axios
      .post("http://localhost:8000/get_all", { table_name: "budget" })
      .then((res) => {
        setBudget(res.data);
        //  console.log( "axoius get"+ JSON.stringify(res.data))
      })
      .then(console.error("no data"));


  }, []);


  const generateAccountDetails = (inputType) => {
    axios
      .post("http://localhost:8000/get_AccountDetails", {
        table_name: "acc_budget_map",
        budget_name: inputType,
      })
      .then((res) => {
        setBbudgetAcc(res.data);
        // console.log("Inside AccountDetails : " + JSON.stringify(res.data));
      })
      .then(console.error("on data"));
  };

  const handleChangeScheme = (event) => {
    setSchemeName(event.target.value);
    setSchemeObj(event.target.value);
  };

  const handleChangeBudget = (event) => {
    setBudgetName(event.target.value);
    // console.log('event.target.id:'+event.target.value);
    generateAccountDetails(event.target.value.name);

    setBudgetObject(event.target.value);

    // alert(JSON.stringify(event.target.value.id))
    // console.log("get"+JSON.stringify(budgetAccName))
  };

  const handleChangeBudgetAcc = (event) => {
    // console.log(event.target.value)
    // console.log(budgetAccName)

    setBudgeAcctName(event.target.value);
    setBudgeAcctObj(event.target.value);
  };


  const handleChange = (event) => {
    setInputs(event.target.value);
    // console.log(event.target.value);

  };


  const addObmaster = async () => {
    alert('Hello')
    var tableName = "obmaster"
    var temp = ObMasterSync;

    temp["scheme_id"] = schemeObj == null ? '' : schemeObj.id;
    temp["scheme_name"] = schemeObj == null ? '' : schemeObj.name;
    temp["budget_id"] = budgetObj == null ? '' : budgetObj.id;
    temp["budget_name"] = budgetObj == null ? '' : budgetObj.name;
    temp["acc_id"] = budgetAccObj == null ? "" : budgetAccObj.acc_id;
    temp["acc_name"] = budgetAccObj == null ? "" : budgetAccObj.acc_name;

    temp["credit"] = inputs == 'credit' ? amount : "0";
    temp["debit"] = inputs == 'debit' ? amount : "0";

    temp["table_name"] = tableName;


    setObMasterSync(temp);

    // console.log( ObMasterSync)
    await axios.post("http://localhost:8000/insert_obmaster", ObMasterSync)
      .then((res) => {
        setUpdatedData(res.data);
        //  console.log("update"+res.data)
      })
      .then(console.error("on data"));

    reactDom.render(<ObmasterTable />, document.getElementById('ObMasterTableDiv'));
  }



  const getValue = (type) => {
    var out = ''
    //  temp.id = editValue.scheme_id
    //  temp. name = editValue.scheme_name
    if (type == 'scheme')
      out = (editValue == '' || editValue == 'undefined' || editValue == null) ? schemeName :
        JSON.parse('{"id":"' + editValue.scheme_id + '","name":"' + editValue.scheme_name + '"}')
    // if(type == "budget")
    //   out =  (editValue =='' || editValue =='undefined' || editValue == null ) ? budgetName : editValue
    // if(type == "budgetAccName")
    //   out =  (editValue =='' || editValue =='undefined' || editValue == null ) ?  budgetAccName : editValue

    //   console.log("Out Value : "+JSON.stringify(out))

    //   console.log("scheme : "+JSON.stringify(scheme))

    //console.log("Out : "+out.name)
    return out;
  }

  return (
    <div id="obMasterDiv">
      <Box sx={{mt:3,justifyContent:"center",display:"grid"}}>
        <div>
          <Box style={{ padding: 5, justify: "center" }}>
            <InputLabel id="demo-simple-select-label" style={{ paddingTop: 0 }}>
              Scheme
            </InputLabel>
            <Select
              style={{ width: 500 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={
                schemeName
                //getValue('scheme')
              }
              onChange={(event) => handleChangeScheme(event)}
            >
              {scheme.map((data, index) => (
                <MenuItem value={data}>{data.name}</MenuItem>
              ))}
            </Select>
            &nbsp;&nbsp;
            <TextField
              id="outlined-read-only-input"
              label="Read Only"
              value={schemeObj == null ? " " : schemeObj.id}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </div>
        <div>
          <Box style={{ padding: 5, justify: "center" }}>
            <InputLabel id="demo-simple-select-label" style={{ paddingTop: 0 }}>
              Budget
            </InputLabel>
            <Select
              style={{ width: 500 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={getValue('budget').budget_name}
              label="Budget"
              onChange={(event) => handleChangeBudget(event)}
            >
              {(budget == "" || budget == null ? [] : budget).map(
                (data, index) => (
                  <MenuItem value={data}>{data.name}</MenuItem>
                )
              )}
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
        </div>
        <div>
          <Box style={{ padding: 5, justify: "center" }}>
            <InputLabel id="demo-simple-select-label" style={{ paddingTop: 0 }}>
              Account
            </InputLabel>
            <Select
              style={{ width: 500 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={getValue('budgetAccName').acc_name}
              label="Age"
              onChange={(event) => handleChangeBudgetAcc(event)}
            >
              {(budgetAcc == "" || budgetAcc == null || budgetAcc == "undefined"
                ? []
                : budgetAcc
              ).map((data, index) => (
                <MenuItem value={data}>{data.acc_name}</MenuItem>
              ))}
            </Select>
            &nbsp;&nbsp;
            <TextField
              id="outlined-read-only-input"
              label="Read Only"
              value={budgetAccObj == null ? "" : budgetAccObj.acc_id}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </div>
        <div style={{padding:10 }}>
          <Box>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={inputs}
                onChange={handleChange}
                onClick={document.getElementById('debit_credit_txt') != null ? document.getElementById('debit_credit_txt').focus() : ''}
              >
                <FormControlLabel value="debit" control={<Radio />} label="Debit" />
                <FormControlLabel value="credit" control={<Radio />} label="Credit" />
              </RadioGroup>
            </FormControl>
            &nbsp;&nbsp;
            <TextField
              id="debit_credit_txt"
              label="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </div>
        <div>
          <Button variant="contained" style={{ marginleft: 30 }}
            onClick={addObmaster}>
            Save Record
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default ObMaster;
