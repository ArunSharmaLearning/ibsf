import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Header from '../header/Header';
import Card from "../Card/Card"
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';

const NewsbyTag = props => {
    const {tagname } =useParams();
    const [databytagname , setdata] =useState([]);
    const [loading , setloading] = useState(true); 


    useEffect(()=>
    {
    axios.get(`https://ibsf.info/api/news/tags/?tag=${tagname}`).
    then((res)=>
    {
        setloading(false);
        setdata((res.data.data))
    })
    .catch((e)=>console.log(e));


    } , [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reports | {tagname}</title>
                
            </Helmet>
            <Header active="news"/>

            <div style={{maxWidth:"1130px" , padding:"2rem"   ,marginLeft:"auto" , marginRight:"auto"}}>
                <h1 style={{maxWidth:"100%" , width:'max-content', marginBottom:"4rem" , fontWeight:"550"}}>Reports under <span style={{backgroundColor:"#0da1ff",fontSize:"2.3rem" ,padding:"0.5rem"  , color:"white"}}>{tagname}</span><br></br><hr style={{marginTop:"1.5rem" }}></hr></h1>
                {
            databytagname.length!=0?
                <div style={{height:"auto",display:"flex" , flexWrap:"wrap" , justifyContent:"start" ,marginTop:"2rem" }}>
                {
                    databytagname.map((data , index)=>
                    (
                        <>
                        <Card key ={index} data={data} />
                        </>
                    ))
                }
                </div>:
                <>
                {(loading) && <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <CircularProgress/> </div>}
                </>
                }
                </div>
        
        </>
    );
};


export default NewsbyTag;