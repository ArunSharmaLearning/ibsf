import React ,{useEffect, useState} from 'react';
import axios from 'axios'
import Header from '../header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import {BsDownload} from 'react-icons/bs'
import { Helmet } from 'react-helmet';
import "../About/About.css"

function About() {

    const [data ,  setData] = useState([]);
    const [loading , setloading] = useState(true);
    const [downloads ,setdownloads]= useState([])

    useEffect(()=>
  {
            axios.get("https://ibsf.info/api/about/")
            .then((response) => 
            {setData(response.data.data.content_download)
                    setloading(false)   
            })
            .catch((e)=>console.log(e))

            axios.get("https://ibsf.info/api/downloads/")
            .then((response) => {
                setdownloads(response.data.data)
                
            })
            .catch((e)=>console.log(e))

  } , [])
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Downloads</title>
                
            </Helmet>

         <Header active="document"/>
        <div className="aboutus ui container">

            
            <div className="aboutus_title">

        
            <h1 style={{marginBottom:'0'}}>Downloads </h1>
            <hr  style={{marginTop:"1rem" , marginBottom:'3rem'}}></hr>

            </div>
            {
            data.length!=0?

            <section  >
            <div dangerouslySetInnerHTML={{ __html: data }} />

            <div>
                {
                    downloads.map((row,  index)=>
                    
                        (
                        <a style={{fontSize:"1.5rem"}} href={`${row.file}`} download target="_blank"> <h4> {row.name} <BsDownload/></h4></a>
                        )
                    
                    )
                }
            </div>
            </section>
            :
            <>
            {
                loading?<div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <p><CircularProgress/></p> </div>:
                <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <h3>Nothing Found...</h3> </div>
            }</>
        }
            
        </div>
        </>
    );
}

export default About;