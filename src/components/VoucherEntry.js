import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Autocomplete, MenuItem } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import VoutcherEntryTable from "./VoutcherEntryTable";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Check, Description } from "@mui/icons-material";
// import { findAllInRenderedTree } from 'react-dom/test-utils';

const useStyles = makeStyles((them) => ({
  root: {
    display: "flex",
    alignItems: "left",
    padding: 0,
  },
}));

const createOutWard = (schemeName, Check, voucherDate, chequeDate, voucherType, voucherno, bank) => {
  return { schemeName, Check, voucherDate, chequeDate, voucherType, voucherno, bank }
}

function VoucherEntry() {
  console.log('this is voucher Ent');
  const [scheme, setScheme] = useState([]);
  const [schemeName, setSchemeName] = useState("");
  const [cheque, setCheque] = useState("");
  const [voucherDate, setVoucherDate] = React.useState(null);
  const [chequeDate, setChequeDate] = React.useState(null);

  const [voucherType, setVoucherType] = useState([
    "BR",
    "BP",
    "CR",
    "CP",
    "JV",
  ]);
  //  const [selVoucherType,setSelVoucherType]=  useState("")
  const [newVoucher, setNewVoucher] = useState("");
  const [voucherno, setVoucherno] = useState("");

  const [month, setMonth] = useState([
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec",
  ]);
  const [selectedMon, setSelectedMon] = useState("");
  const [bank, setBank] = useState("");
  const [description, setDescrpition] = useState("")

  const [accountTy, setAccountTy] = useState("");

  useEffect(function () {
    axios
      .post("http://localhost:8000/get_all", { table_name: "Scheme" })
      .then((res) => {
        setScheme(res.data);
        //  console.log( "axoius get"+ JSON.stringify(res.data))
      })
      .then(console.error("no data"));
  }, []);
  // console.log("voutcher Entry:" + newVoucher);

  const [generateAccDet, setGenerateAccDet] = useState("");

  const handleChangeScheme = (event) => {
    setSchemeName(event.target.value);
    setGenerateAccDet(event.target.value.name);
  };

  const ChangeCheque = (event) => {
    setCheque(event.target.value);
  };

  const ChangeVoucherType = (event) => {
    setNewVoucher(event.target.value);
  };

  const changeVoucherno = (event) => {
    setVoucherno(event.target.value);
  };

  const ChangeBank = (event) => {
    setBank(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setSelectedMon(event.target.value);
    console.log(setSelectedMon);
  };

  const handleChange = (event) => {
    setAccountTy(event.target.value);
  };

  const classes = useStyles();

  const [outWard, setOutWard] = useState({});
  const SubmitAllOutward = async (accountDesName, subTotalTo, subTotalFrom) => {

    let table = "outward_vchentry"
    let temp = outWard;
    console.log("temp1", temp)

    temp["Scheme_name"] = schemeName?.name;
    temp["VchType"] = newVoucher;
    temp["Vch_date"] = voucherDate;
    temp["Chq_no"] = cheque;
    temp["Chq_date"] = chequeDate;
    temp["Bank_name"] = bank;
    temp["Vch_desc"] = description;
    temp["Amount_rec"] = subTotalFrom;
    temp["Amount_pay"] = subTotalTo;
    temp["table_name"] = table;
    console.log("temp2", temp);
    setOutWard(temp)
    console.log("3333", outWard)

    await axios.post("http://localhost:8000/insert_outward_voucher", outWard)
      .then((res) => {
        console.log("res", res)
      })
      .then(console.error("no data"))
  }
  // console.log(setOutWard,"wwwwww")

  const handleChangeDes = (event) => {
    setDescrpition(event.target.value)
  }

  return (
    <div style={{ marginTop: 10 }}>
      <Box>
        <div>
          <Box style={{ padding: 5, justify: "center" }}>
            <TextField
              style={{ width: 200 }}
              id="outlined-basic"
              select
              size="small"
              label="Scheme"
              variant="outlined"
              onChange={(event) => handleChangeScheme(event)}
              value={schemeName}
            >
              {scheme.map((data, index) => (
                <MenuItem value={data}>{data.name}</MenuItem>
              ))}
            </TextField>
            &nbsp;&nbsp;
            <TextField
              style={{ width: 200 }}
              id="outlined-basic"
              select
              size="small"
              label="Type of Voucher"
              variant="outlined"
              onChange={(event) => ChangeVoucherType(event)}
              value={newVoucher}
            >
              {voucherType.map((data, index) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </TextField>
            &nbsp;&nbsp;
            <TextField
              style={{ width: 200 }}
              id="outlined-basic"
              label="Voucher NO"
              size="small"
              variant="outlined"
              onChange={(event) => changeVoucherno(event)}
              value={voucherno}
            />
            &nbsp;&nbsp;
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Voucher Date"
                value={voucherDate}
                onChange={(newValue) => {
                  setVoucherDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ width: 200, height: 0 }}
                    size="small"
                  />
                )}
              />
            </LocalizationProvider>
            &nbsp;&nbsp;
            <TextField
              id="outlined-basic"
              style={{ width: 200 }}
              size="small"
              label="Cheque No"
              variant="outlined"
              onChange={(event) => ChangeCheque(event)}
              value={cheque}
            />
            &nbsp;&nbsp;
          </Box>
        </div>
        <div>
          <Box style={{ padding: 5, justify: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Cheque Date"
                value={chequeDate}
                onChange={(newValue) => {
                  setChequeDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ width: 200, height: 0 }}
                    size="small"
                  />
                )}
              />
            </LocalizationProvider>
            &nbsp;&nbsp;
            <TextField
              id="outlined-basic"
              style={{ width: 200 }}
              size="small"
              label="Bank Name"
              variant="outlined"
              onChange={(event) => ChangeBank(event)}
              value={bank}
            />
            &nbsp;&nbsp;
          </Box>
          <div>
            <Box style={{ padding: 5, justify: "center" }}>
              <TextField
                style={{ width: 1040 }}
                fullWidth
                label="Descrpition"
                id="fullWidth"
                size="small"
                multiline
                rows={1}
                onChange={(event) => handleChangeDes(event)}
                defaultValue={description}
              />
            </Box>
          </div>
          {/* <Box style={{ width: 620, padding: 5 }}>    
        </Box> */}
          <div style={{ padding: 5, justify: "center" }}></div>
          <VoutcherEntryTable tv={newVoucher} vn={voucherno} sn={schemeName} SubmitAllOutward={SubmitAllOutward} />
        </div>
      </Box>
    </div>
  );
}

export default VoucherEntry;
