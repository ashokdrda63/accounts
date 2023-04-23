import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from "@mui/material/Select";
import axios from "axios";
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { json } from 'body-parser';



const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

function BudgetMaster() {

    const intialvalue ={
        id:'',
        name:'',
        created_by :'',
        modified_by :''
    }
    


    const [budget, setbudget] = useState(intialvalue);
    const classes = useStyles();

    const [entryVal , setEntryVal] = useState('')
    const onValueChange= (key,e)=>{
        setEntryVal( e.target.value)
    }

    const checkEntry= () => {
        if(entryVal.length < 4) {
            alert("Not a valid budget name. Minimum character should be 4")
            return false
        } else return true
    }

    const addBudgetDetails= async()=>{  
        
        if(checkEntry() == false) return

        var idStr = entryVal.substr(0,3)
        var maxSeq = await axios.post('http://localhost:8000/get_seq',{table_name:'budget'})
          console.log( "aaaaaaaaa"+ JSON.stringify (maxSeq));
        var isDataExist = maxSeq.data[0].max_seq == null ?  false:true
        
        console.log(JSON.stringify(maxSeq.data[0].max_seq))
        if(isDataExist == false)
            idStr = idStr+"_1"
        else
            idStr = idStr+"_"+(maxSeq.data[0].max_seq+1)

            console.log("idStr : "+idStr)
            var temp= budget;
            temp['id'] = idStr
            temp['name'] = entryVal
            temp['table_name'] = 'budget'
            setbudget(temp)
            await axios.post('http://localhost:8000/insert_budget',budget)
            
            document.getElementById('bidget_id').value = ''
            document.getElementById('bidget_id').focus()
    }
    

    return (
        <div>
            <FormGroup className={classes.container}>
            <Typography variant="h4">Add Budget</Typography>
            {/* <FormControl>
                <InputLabel htmlFor="my-input">Budget_id</InputLabel>
                <Input onChange={(e) => onValueChange("Budget_it",e)}  id="my-input" />
            </FormControl> */}
            <FormControl>
                <InputLabel htmlFor="my-input">Budget_name</InputLabel>
                <Input onChange={(e) => onValueChange("budget_name",e)}  id="bidget_id" />
            </FormControl>
            {/* <FormControl>    
                <InputLabel htmlFor="my-input">created_by</InputLabel>
                <Input onChange={(e) => onValueChange("account",e)}  id="my-input-id" />
            </FormControl> */}
            {/* <FormControl>
                <InputLabel htmlFor="my-input">created_date</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='created_date' id="my-input"/>
            </FormControl> */}
            {/* <FormControl>
                <InputLabel htmlFor="my-input">modified_by</InputLabel>
                <Input onChange={(e) => onValueChange("created_by",e)} name='created_by'  id="my-input" />
            </FormControl> */}
            <FormControl>
                <Button variant="contained" type="submit" color="primary" onClick={addBudgetDetails}
                // onKeyPress={addAccountDetails}
                >Add Budget</Button>
            </FormControl>
            </FormGroup>
         </div>
    )
}

export default BudgetMaster
