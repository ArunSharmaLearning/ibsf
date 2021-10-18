import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import MemberCountry from "../Card/MemberCountry"
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles , makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import animationData from "../../assets/search_file.json"
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter';
import Lottie from 'react-lottie';
import { Helmet } from 'react-helmet';
import {HiOutlineGlobeAlt} from 'react-icons/hi';

const useStyles = makeStyles({
    key:
    {
        fontSize:"1.4rem",
        fontWeight:"600" ,
    },
    value:
    {
        fontSize:"1.4rem" ,
    },
    hoverable:
    {
        '&:hover': {
            color: "rgb(13, 161, 255)",
         },     
    }
});

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      }
    }

  }))(TableRow);


function MemberCountries() {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:723px)');

    const [continent , setContinent] =useState("");
    const [related_country  , setCountry]=useState("");
    const {id} = useParams()
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
   

    useEffect(() =>
    {
        axios.get(`https://ibsf.info/api/region/?id=${id}`)
        .then((res)=>setContinent(res.data.data))
        .catch((e)=>console.log(e));

        axios.get(`https://ibsf.info/api/member-countries/?rid=${id}`)
        .then((res)=>setCountry(res.data.data))
        .catch((e)=>console.log(e))

    }, [])

    if(continent && related_country.length!=0)
    {
        return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Members | {continent.name}</title>
                
            </Helmet>
        <Header active="aboutus"/>
        
        <div className='ui container' style={{maxWidth:'1130px' , padding:'2rem' , margin:"auto"}}>
        <h3 style={{textAlign:"center", lineHeight:"3rem" , fontSize:"2.8rem", fontFamily:'Poppins' , margin:'0.5rem'  ,marginBottom:"0rem"}}>{continent.body_name} <br></br><hr style={{ alignContent:"center"  , margin:'1rem auto 1rem auto', width:'20%' }}></hr> </h3>
    
    
        <div style={{display:"flex" , flexWrap:"wrap"   ,width:"100%" , height:"auto" , padding:"2rem" , maxWidth:"1130px"}}>

            {
                related_country&&related_country.map((data  , index)=>
                (
                    <>
                    <MemberCountry key ={index} data ={data}/>
                    </>
                ))
            
            }
            
        </div>
            

        <hr style={{border:"0", backgroundImage:"linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 1),rgba(0, 0, 0, 0.2))" , marginTop:'0.5rem' , marginBottom:"1.5rem"}}></hr>
        
        <br></br>
                

        <div className="federation_info" style={{maxWidth:"70rem", padding:"1rem" , margin:"auto"}}>
            <h3 style={{textAlign:"center", lineHeight:"3rem" , fontSize:"2.8rem", fontFamily:'Poppins' , margin:'0.5rem'  ,marginBottom:"3rem"}}>{continent.name} <br></br><hr style={{ alignContent:"center"  , margin:'1rem auto 4rem auto', width:'50%' }}></hr> </h3>
            
            <div className="frderation_info_contact" style={{display:"flex" , justifyContent:"space-between"}}>

                <div className="contact" style={{display:"flex" , flexDirection:"column"}}>
                    <p style={{fontWeight:"900" , fontSize:'1.5rem'}} >{continent.contact.toUpperCase()} {continent.mobile && <CallIcon onClick={()=>window.location.href=`tel:${continent.mobile}`} style={{fontSize:'2rem',cursor:'pointer' ,  color:"green"}}/>}
                    <span style={{cursor:"pointer"}}></span> <span style={{color:"rgba(255 , 0 , 0 , 0.7)"}} onClick={()=>window.location.href=`mailto: ${continent.email_id}`}>  <MailOutlineIcon style={{cursor :"pointer", fontSize:'2.2rem'}}/></span>
                    </p>
                </div>

                <div className="website">
                
        
                    {continent.website!=null && <HiOutlineGlobeAlt className={classes.hoverable} style={{fontSize:"2.5rem" , cursor:'pointer' , marginRight:'1rem'}} onClick={() => {window.open(continent.website , 'blank')}}/>}
                        {continent.fb_url!=null && <FacebookIcon className={classes.hoverable} style={{fontSize:"2.5rem" , cursor:'pointer' , marginRight:'1rem'}} onClick={() => {window.open(continent.fb_url, '_blank')}}/>}
                        {continent.insta_url!=null && <InstagramIcon className={classes.hoverable} style={{fontSize:"2.5rem" , cursor:'pointer' , marginRight:'1rem'}} onClick={() => {window.open(continent.insta_url, '_blank')}}/>}
                        {continent.twitter_url!=null && <TwitterIcon className={classes.hoverable} style={{fontSize:"2.5rem" , cursor:'pointer' , marginRight:'1rem'}} onClick={() => {window.open(continent.twitter_url, '_blank')}}/>}
    
                </div>
            </div>
            {/* <hr ></hr> */}
            <br></br>
            {/* <br></br> */}

            <div style={{display:"flex" , flexWrap:"wrap" }}>
                <div style={matches?{width:'100%'}:{width:'60%'}}>
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
          
        <TableHead>
        {
              continent.president&&
          <StyledTableRow>
            <TableCell className={classes.key} >President</TableCell>
            <TableCell className={classes.value}  align="right">{continent.president}</TableCell>
          </StyledTableRow>
          }
          
          {continent.vice_president&&
        <StyledTableRow>
            <TableCell className={classes.key}>Vice President</TableCell>
            <TableCell className={classes.value} align="right">{continent.vice_president}</TableCell>
        </StyledTableRow>
        }
        {continent.secretary&&
        <StyledTableRow>
            <TableCell className={classes.key}>Secretary</TableCell>
            <TableCell className={classes.value} align="right">{continent.secretary}</TableCell>
        </StyledTableRow>
        }
        {continent.treasurer&&
        <StyledTableRow>
            <TableCell className={classes.key}>Treasurer</TableCell>
            <TableCell className={classes.value} align="right">{continent.treasurer}</TableCell>
        </StyledTableRow>
        }
        {continent.exe1&&
        <StyledTableRow>
            <TableCell className={classes.key}>Executive</TableCell>
            <TableCell className={classes.value} align="right">{continent.exe1}</TableCell>
        </StyledTableRow>
        }
        {continent.exe2&&
        <StyledTableRow>
            <TableCell className={classes.key}>Executive</TableCell>
            <TableCell className={classes.value} align="right">{continent.exe2}</TableCell>
        </StyledTableRow>
        }
        {continent.exe3&&
        <StyledTableRow>
            <TableCell className={classes.key}>Executive</TableCell>
            <TableCell className={classes.value} align="right">{continent.exe3}</TableCell>
        </StyledTableRow>
        }
        {continent.exe4&&
        <StyledTableRow>
            <TableCell className={classes.key}>Executive</TableCell>
            <TableCell className={classes.value} align="right">{continent.exe4}</TableCell>
        </StyledTableRow>
        }
        </TableHead>
        </Table>
    </TableContainer>
                </div>
                <br></br>

                <div style={matches?{width:'80%',paddingLeft:"auto" , margin:"auto"}:{width:'40%' , maxHeight:'200px'}}>
                    <img style={!matches?{float:"right"  }:{marginTop:'1rem' , marginLeft:"2rem"}}  height='200' width="200" src={`https://ibsf.info/${continent.logo}`}/>
                </div>

            </div>

            

        </div>

        </div>
        </>
        );
    }
        else
        {
            return(<>
            <Header/>
            <Lottie options={defaultOptions} style={{marginTop:"2rem" ,marginBottom:"7rem"}}
            height={400} width={350} />
            </>
            )
        }
}

export default MemberCountries;