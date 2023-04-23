
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


function SchemeMaster() {

    const intialvalue ={
        id:'',
        name:'',
        created_by :'',
        modified_by :''
    }




    
    const [scheme, setScheme] = useState(intialvalue);
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
        
        if(checkEntry( ) == false) return

        var idStr = entryVal.substr(0,3)
        var maxSeq = await axios.post('http://localhost:8000/get_seq',{table_name:'Scheme'})
         console.log( "aaaaaaaaa"+ JSON.stringify (maxSeq));
        var isDataExist = maxSeq.data[0].max_seq == null ?  false:true
        
        console.log(JSON.stringify(maxSeq.data[0].max_seq))
        if(isDataExist == false)
            idStr = idStr+"_1"
        else
            idStr = idStr+"_"+(maxSeq.data[0].max_seq+1)

            console.log("idStr : "+idStr)
            var temp= scheme;
            temp['id'] = idStr
            temp['name'] = entryVal
            temp['table_name'] = 'scheme'
            setScheme(temp)
            await axios.post('http://localhost:8000/insert_scheme',scheme)
            document.getElementById('scheme_id').value= ''
            document.getElementById('scheme_id').focus()
    }
    


    return (
        <div>
            <FormGroup className={classes.container}>
            <Typography variant="h4">Add Scheme</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Scheme_name</InputLabel>
                <Input onChange={(e) => onValueChange("Schemr_name",e)}  id="scheme_id" />
            </FormControl>
            <FormControl>
                <Button variant="contained" type="submit" color="primary" onClick={addBudgetDetails}
                // onKeyPress={addAccountDetails}
                >Add Budget</Button>
            </FormControl>
            </FormGroup>
        </div>
    )
}

export default SchemeMaster
