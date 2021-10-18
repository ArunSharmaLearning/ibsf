import axios from 'axios';
import React, { useState } from 'react';
import Header from "../header/Header"
import Rules_Champ from '../Card/Rules_Champ/Rules_Champ';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';

const Rules = (props) => {
    const [data ,setData] = useState([])
    const [loading, setloading]=useState(true)
    useState(()=>
    {
        axios.get(`https://ibsf.info/api/all-rules/`)
        .then((res)=> {
        setData(res.data.data)
        setloading(false)
        })
        .catch((e)=> console.log(e));
    },[])

    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Rules</title>
                
            </Helmet>

        
        <Header active="rules"/>
        <div className='ui container' style={{maxWidth:"1130px" , padding:"2rem" , margin:"auto"}}>
            <h1 style={{ fontFamily:"Poppins", width:'max-content' ,  margin:"0 0 3rem 0"}}>Rules<br></br><hr style={{marginTop:"1rem" }}></hr></h1>


            {
    data.length!=0 ?

            <div style={{display:"flex" ,justifyContent:"flex-start" , flexWrap:"wrap"}}>

            {
                data.map((data, index)=>
                (
                    <>
                    <Rules_Champ key={index} path="all-rules" data ={data}/>
                    </>
                    
                ))
            }
            </div>
            :
            <>{
        loading?<div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <p><CircularProgress/></p> </div>:
        <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <h3>Nothing Found...</h3> </div>
            }</>
            }


            
        </div>

        </>
    );
};

export default Rules;