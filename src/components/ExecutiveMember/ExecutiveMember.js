import React, { useEffect, useState } from 'react';
import ExecutiveCard from "../Card/ExecutiveCard.js"
import Header from "../header/Header"
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Helmet} from 'react-helmet'
function ExecutiveMember(props) {
    const [data, setData]= useState([]);
    const [loading , setloading] = useState(true);

    useEffect(()=>
    {
        axios.get('https://ibsf.info/api/executives/')
        .then((res)=>
        {setData(res.data.data)
            setloading(false)
        })
        .catch((e)=>console.log(e))

    } ,[])
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Executives</title>
                
            </Helmet>

        <Header active="aboutus"/>
        <div className="ui container" style={{maxWidth:"1130px" , padding:"2rem 2rem" , margin:"auto"}}>
            <div style={{width:'max-content'}}>
            <h1 style={{fontFamily:'Poppins' , margin:0 }}>Executives</h1>
            <hr  style={{marginTop:"1rem" , marginBottom:"3rem"}}></hr>
            </div>
        

        {
        data.length!=0 ?


        <div style={{display:"flex"  ,  flexWrap:"wrap"}}>

            {
                data.map((data , index)=>(
                    <>
                <ExecutiveCard data={data}/>
                </>
                ))
            }
        </div>
        :
        <>
        {
            loading?<div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <p><CircularProgress/></p> </div>:
            <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <h3>Nothing Found...</h3> </div>
        }
        </>
        }
        </div>
        </>
    
    );
}

export default ExecutiveMember;