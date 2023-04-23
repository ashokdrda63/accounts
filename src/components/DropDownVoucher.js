import React ,{useEffect}from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios'
import AccountEntryScheme from "./AccountEntryScheme";
// import { margin } from "@mui/system";

export default function DropDownVouchert() {
  const [data1, setdata1] = React.useState([]);
    
  useEffect( function () {
     axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => setdata1(response.data))
        .then(console.error('no data'))
},[])

  const handleChange = (event) => {
    setdata1(event.target.value);
  };

//   const hChange = (event) => {
//     setdata1(event.target.value);
//   };


  return  (
    <Box sx={{ m: 1, width: 500 ,display:'flex'}}>
      <FormControl fullWidth>
      <InputLabel >Schem name</InputLabel>
        <Select defaultValue="Schem name"
          label="Schem name"
          onChange={(event)=> handleChange(event)}
          value={data1}
        >
        { data1.map((newdata)=> <menuitem value={newdata.id} key={newdata.id}>{newdata.name} </menuitem>)} 
        </Select>
      </FormControl>
      {/* <FormControl fullWidth style={{marginInline:'10px'}}>
        <InputLabel id="demo-simple-select-label">Schem code</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Schem code"
          onChange={hChange}
          value={data1}
        >
            
     { data.map((newdata)=> <option value={newdata.id} key={newdata.id}>{newdata.id} </option>)}
          
        </Select>
      </FormControl> */}
    </Box>
  );
}
