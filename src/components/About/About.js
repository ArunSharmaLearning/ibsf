import React ,{useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import Header from '../header/Header';
import {Helmet} from "react-helmet";
import "./About.css"

function About() {

    const [data ,  setData] = useState([]);
    const [loading , setloading] = useState(true);

    useEffect(()=>
  {
  axios.get("https://ibsf.info/api/about/")
          .then((response) => {
            setData(response.data.data.content_about)
            setloading(false)
          })

      
      

  } , [])
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>About us</title>
                
            </Helmet>

        <Header active="aboutus"/>
        <div className="aboutus ui container">

            
            <div className="aboutus_title">

        
            <h1 style={{marginTop:0}}>About IBSF  </h1>
            <hr  style={{marginBottom:"1rem" , marginTop:0}}></hr>

            </div>

            {
            data.length!=0?


            <section className="aboutus_section" >
            <div dangerouslySetInnerHTML={{ __html: data }} />

            </section>
            :<>
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