import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BiMailSend } from 'react-icons/bi'
import {BsFillPersonFill} from 'react-icons/bs'
import Header from '../header/Header'
import Caroufredsel_wrapper from '../Carousel/Caroufredsel_wrapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';
import './Contact.css'



  const useStyles = makeStyles({
    table: {
        display:'flex',
        justifyContent:'space-between'

    },
    style_key:
    {
        width:"45%",color:'black'
    },

    value:
    {
        color:'#0da1ff',
        width:"45%",
        marginLeft:'3.5rem',
        wordBreak:"break-all",
        cursor:'pointer'
    }
  
  });
  


const Contact = props => {
    const [data, setdata] = useState([])
    const history = useHistory()
    const classes = useStyles();
    const [sponsor , setSponsor] = useState([])
    const [loading , setloading] = useState(true);

    
    useEffect(()=>
    {
        axios.get('https://ibsf.info/api/contact/')
        .then((res)=> {
          
          setdata(res.data.data)
          setloading(false)
          })
        .catch((e)=>console.log(e))


        
        axios.get("https://ibsf.info/api/sponsers/")
        .then((response) => setSponsor(response.data.data))




    }, [])


    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Contact IBSF</title>
                
            </Helmet>

            <Header active="contactus"/>
            <div className='ui container' style={{maxWidth:'1130px' , margin:'auto' , padding:'2rem'}}>
              
            <div style={{width:'max-content'}}>
                <h1 style={{fontFamily:'Poppins' , margin:0 }}>Contact IBSF</h1>
                <hr  style={{marginBottom:"1rem" , marginTop:'1rem'}}></hr>
            </div>

            <br></br>
            <div style={{maxWidth:"1200px"  }}>
            {
            data.length!=0?
              <>
              <div  style={{display:'flex' , flexWrap:"wrap" , justifyContent:'space-between'}}>
                <div className="contact_responsive" style={{display:"flex" }}>
                    <h3 style={{color:"rgb(13, 161, 255)"}}>Address</h3>
                    <div dangerouslySetInnerHTML={{__html:data.address}}></div>
                </div >

                <div className="contact_responsive" style={data.bank_details.length===0?{display:'none'} :{display:"flex", flexDirection:'column' }}>
                    <h3 style={{color:"rgb(13, 161, 255)"}}>Bank Details</h3>
                    <p>{data.bank_details}</p>
                </div>

            
              </div>
              <br></br>
              <hr></hr>

              <div style={{display:'flex' , flexDirection:'column' }}>
              
              
              {
                data.name1&&
                <div className={classes.table}>
                    <h4 className={classes.style_key}><BsFillPersonFill/> {data.name1}</h4>
                    <h4 onClick={()=>window.location.href=`mailto: ${data.email1}`} className={classes.value}><BiMailSend style={{color:'black', fontSize:"2.2rem"}}/> {data.email1}</h4>
                </div>

              }
              {
                data.name2&&
                <div className={classes.table}>
                    <h4 className={classes.style_key}><BsFillPersonFill/>{data.name2}</h4>
                    <h4 onClick={()=>window.location.href=`mailto: ${data.email2}`} className={classes.value}><BiMailSend style={{color:'black', fontSize:"2.2rem"}}/> {data.email2}</h4>
                </div>

              }
              {
                data.name3&&
                <div className={classes.table}>
                    <h4 className={classes.style_key}><BsFillPersonFill/>{data.name3}</h4>
                    <h4 onClick={()=>window.location.href=`mailto: ${data.email3}`} className={classes.value}><BiMailSend style={{color:'black', fontSize:"2.2rem"}}/> {data.email3}</h4>
                </div>

              }
              {
                data.name4&&
                <div className={classes.table}>
                    <h4 className={classes.style_key}><BsFillPersonFill/>{data.name4}</h4>
                    <h4 onClick={()=>window.location.href=`mailto: ${data.email4}`} className={classes.value}><BiMailSend style={{color:'black', fontSize:"2.2rem"}}/> {data.email4}</h4>
                </div>

              }
              </div>

              </>
          :
          <>
            {
                loading?<div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <p><CircularProgress/></p> </div>:
                <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <h3>Nothing Found...</h3> </div>
            }</>
          }
          </div>
            <br></br>
            <br></br>

    </div>
          
          
    <Caroufredsel_wrapper data={sponsor}/>
    </>
    );

}


export default Contact;