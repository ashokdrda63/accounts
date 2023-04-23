import React,{useState,useEffect} from 'react';
import axios from "axios";
import { Typography, Box, TextField,Menu,MenuItem } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';

function DayBook() {
  const [scheme, setScheme] = useState([]);
  const [schemeName, setSchemeName] = useState("");

  useEffect(function () {
    axios
      .post("http://localhost:8000/get_all", { table_name: "Scheme" })
      .then((res) => {
        setScheme(res.data);
        //  console.log( "axoius get"+ JSON.stringify(res.data))
      })
      .then(console.error("no data"));
  }, []);

  const handleChangeScheme = (event) => {
    setSchemeName(event.target.value);
    // setGenerateAccDet(event.target.value.name);
  };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }} >
              <TextField
              style={{ width: 400 }}
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
           
        </Box>
    )
}

export default DayBook