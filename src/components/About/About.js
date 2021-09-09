import React ,{useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import Header from '../header/Header';

import "./About.css"

function About() {

    const [data ,  setData] = useState([]);
    const [loading , setloading] = useState(true);

    useEffect(()=>
  {
  axios.get("https://billiardsports.in/api/about/")
          .then((response) => {
            setData(response.data.data.content_about)
            setloading(false)
          })

          console.log(data)
      

  } , [])
    return (
        <>
         <Header active="aboutus"/>
        <div className="aboutus">

            
            <div className="aboutus_title">

        
            <h1>About us  </h1>
            <hr  style={{marginBottom:"1rem"}}></hr>

            </div>

            {
            data.length!=0?


            <section className="aboutus_section" >
            <div dangerouslySetInnerHTML={{ __html: data }} />

            </section>
            :<>
            {
                loading?<div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <p><CircularProgress/></p> </div>:
                <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <h4>Nothing Found...</h4> </div>
            }</>
            }
        </div>

        </>
    );
}

export default About;