import React, { useEffect, useState } from 'react';
import ContinentCard from '../Card/ContinentCard';
import Header from '../header/Header';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Helmet} from 'react-helmet'

function MemberContinent() {

    const [country , setCountry] =useState([]);
    const [loading, setloading]=useState(true)

    useEffect(() =>
    {
        axios.get('https://ibsf.info/api/all-regions/')
        .then((res)=>
        {
            setCountry(res.data.data)
            setloading(false)
        })
        .catch((e)=>console.log(e))

    }, [])
    
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Members</title>
                
            </Helmet>
        <Header active="aboutus"/>

        
        <div className="ui container" style={{maxWidth:"1130px" , padding:"2rem"  , margin:"auto"}}>

        <h1 style={{maxWidth:'max-content' , margin:'0'}}>Members<br></br><hr style={{marginTop:"1rem" }}></hr></h1>

        {
    country.length!=0 ?
        <div style={{display:"flex" ,flexWrap:"wrap" ,justifyContent:"center", textAlign:"center"  , padding:"4rem" }}>

            {
                country&&country.map((data  , index)=>
                (
                    <ContinentCard data={data}/>
                ))
            
            }
            
        </div>
        :
        <>
        {
        loading?<div id="loader" style={{width:"100%" , marginTop:"5rem" ,  textAlign:"center" }}> <p><CircularProgress/></p> </div>:
        <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <h3>Nothing Found...</h3> </div>
        }
        </>
        }

        </div>
        </>
    );
}

export default MemberContinent;