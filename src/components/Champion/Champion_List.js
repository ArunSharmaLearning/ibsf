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
        axios.get(`https://ibsf.info/api/allchamps/`)
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
                <title>Past champions</title>
                
            </Helmet>

        <Header active="aboutus"/>
    
        <div className='ui container' style={{maxWidth:"1130px" , padding:"2rem 2rem" , margin:"auto"}}>
            <div style={{width:'max-content'}}>
            <h1 style={{ fontFamily:"Poppins" , margin:"0"}}>Past champions</h1>
            <hr  style={{marginTop:"1rem" , marginBottom:"3rem"}}></hr>
            </div>

            {
    data.length!=0 ?
    <>
            <div style={{display:"flex" , flexWrap:"wrap" ,justifyContent:"flex-start"}}>

            {
                data.map((data, index)=>
                (
                    <>
                    <Rules_Champ key={index} path="champion" data ={data}/>
                    {/* <Rules_Champ key={index} path="champion" data ={data}/>
                    <Rules_Champ key={index} path="champion" data ={data}/> */}
                    </>
                    
                ))
            }
            </div>
            </>:
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