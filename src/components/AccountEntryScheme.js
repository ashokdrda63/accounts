import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";

export default function BasicSelect() {

    // const m ={
    //     b_id:'',
    //     a_id:'',
    // }
  const [budgetValue, setBudgetValue] = React.useState('');
  const [accountValue, setAccountValue] = React.useState('');
  
//   const [budgetId, setBudgetId] = React.useState('');
//   const [accountId, setAccountId] = React.useState('');
  
  const [budget, setBudget] = React.useState([]);
  const [account, setAccount] = React.useState([]);

  const handleChangeBudget = (event) => {
    setBudgetValue(event.target.value);
    console.log(setBudgetValue,"kkkkkk")
    //setBudgetId(event.target.id);
  };

  const handleChangeAccount = (event) => {
    setAccountValue(event.target.value);
   
    //setAccountId(event.target.id);
  };

  console.log(" ------- "+budgetValue+ ", "+accountValue+"");
  // console.log("abc"+JSON.stringify(budgetValue);

  const [mappings, setMappings] = React.useState(
    {
        budget_id:'',
        // budget_name:'',
        account_id:'',
    }
  );
  
  //const[res, getResponse] = React.useState('')
  var res = ''
  const saveMapping= async () => {
      
      var temp = mappings;
      temp['budget_id'] = budgetValue
      temp['account_id'] = accountValue
      setMappings(temp)

      console.log(mappings)
      await axios.post('http://localhost:8000/insert_map',mappings)
      .then(response => res = JSON.stringify(response.data))
      .then(console.error('no  data'))

      alert(res)
  }

 

  React.useEffect(function () {
    axios.post('http://localhost:8000/get_all',{table_name:'budget'})
    .then((response) => {setBudget(response.data);
      console.log(response.data,'lllll')
    })
    .then(console.error('no data'))

    axios.post('http://localhost:8000/get_all',{table_name:'account'})  
    .then(response => setAccount(response.data))
    .then(console.error('no data'))

    },[])

   
   

  return (
    <div>
    <Box sx={{ maxWidth: 500 }} style={{paddingTop: 10,justify:'center'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Budget</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={budgetValue}
          label="Age"
          onChange={handleChangeBudget}
        >
            {
                budget.map((data, index) =>
                <MenuItem value={data.id} id={data.id}>{data.name}</MenuItem>
                )
            }
          
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ maxWidth: 500 }} style={{paddingTop: 30,justifyContent:'center'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Account</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accountValue}
          label="Account"
          onChange={handleChangeAccount}
        >
            {
                account.map((data)=>
                <MenuItem value={data.id}  id={data.id} >{data.name}</MenuItem>

                )
            }
        </Select>
      </FormControl>
    </Box>
    <Stack top-margin={40} >  
      <Button variant="contained" onClick={() => saveMapping()}>Save Budget-Account Map</Button>
    </Stack>
    </div>
  );
}