import React , {useEffect, useState} from 'react';
import Card from '../Card/Card';
import ControlledCarousel from '../Carousel/Carousel';
import Caroufredsel_wrapper from '../Carousel/Caroufredsel_wrapper';
import axios from "axios"
import Header from '../header/Header';
import Current_Score from '../Card/Current_Score';
import Middle_widget_Heading from './widgets/Middle_widget_Heading';
import Caroufredsel_federation from '../Carousel/carousel_federation';
import WorldChampion from './widgets/WorldChampion';
import Twitter from './widgets/Twitter';
import { IoLogoTwitter} from 'react-icons/io'
import {BiWorld, BiCalendarEvent} from 'react-icons/bi'
import CircularProgress from '@material-ui/core/CircularProgress';
import LatestEvents from './widgets/LatestEvents';
import { Helmet } from 'react-helmet';
import "./Main_page.css"




const Main_page = () => {

  const [latestnews , setlatestnews] = useState([]);
  const [sponsor , setSponsor] = useState([])
  const [eventFront , seteventFront] = useState([]);
  const [loading ,setloading] = useState({
    loading1:true , loading2:true
  })
  

  useEffect(()=>
  {
  axios.get("https://ibsf.info/api/news/latest/")
          .then((response) => {
            setlatestnews(response.data.data)
            setloading((prev)=>(
              {
              ...prev , loading1:false
              }))

          })

          axios.get("https://ibsf.info/api/sponsers/")
        .then((response) => setSponsor(response.data.data))

        
        axios.get("https://ibsf.info/api/event/front/")
        .then((response)=>{
          seteventFront(response.data.data)
          setloading((prev)=>(
            {
            ...prev , loading2:false
            }))
          })

  } , [])
  
  if(loading.loading1!=true && loading.loading2!=true)
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Home | IBSF</title>
                
            </Helmet>

    <Header active="home"/>
    <div style={{height:"auto"}}>
      
    
      <div >
        <ControlledCarousel/>
      
</div>  

  
    <div className="headlines">

          <div style={{width:"100%"  , backgroundColor: "rgba(0, 0, 0, 0.9)"}}>

        
          <br></br>
          {
                  eventFront && eventFront.map((data ,i)=>
                  {
                    if(!data.is_active)
                    return(<></>)

                  return(
                    
                    <>
                    <div className="headlines_title">
                    <h2>{data.event_name}</h2>
                    <hr style={{backgroundColor:'#0da1ff'}}></hr>
                    </div>
                    
                  

                    <div className="headlines_current_score" style={{display:"flex" , flexWrap:"wrap" ,flexDirection:"row"}}>
                          {
                            (
                              <>
                            <Current_Score title={data.name1} url={data.url1} />
                            <Current_Score title = {data.name2} url={data.url2}/>
                            <Current_Score title = {data.name3} url={data.url3}/>
                            <Current_Score title = {data.name4} url={data.url4}/>
                            <Current_Score title = {data.name5} url={data.url5}/>
                            <Current_Score title = {data.name6} url={data.url6}/>
                              </>
                            )
                          }
                      </div>

                      </>

                  )})
            }

            
        </div>
        </div>


      </div>
      
    
    <div style={{background:'rgb(65 65 65)'}}>


    <div className="middle_widgets">
     
      
            <div className="current_champion">
              <Middle_widget_Heading icon={BiWorld} link="champion" text="World Champions"/>
              <WorldChampion/>

            </div>
            <div className="event_name">
            <Middle_widget_Heading icon={BiCalendarEvent} link="events" text="FUTURE CHAMPIONSHIPS"/>
            <LatestEvents/>

            </div>
            <div className="tweeter_field">
            <Middle_widget_Heading icon={IoLogoTwitter} text="Tweets"/>
            <Twitter/>

            </div>

      
      
      </div>

      </div>

      <div className="news_section" style={{display:"flex"   ,flexDirection:"row", justifyContent:"center" ,backgroundColor: "rgb(95 95 95)" ,paddingTop:"2rem" }}>
  
    {latestnews&&latestnews.slice(0 , 4).map((e , index)=>
    (
  
        <Card key={index} data={e} page="main" />
    ))    
    }
    </div>


  
    <div style={{background:"rgb(130 130 130)"}}>
    <Caroufredsel_wrapper data = {sponsor}/>
    </div>
    
    <br></br>

    <Caroufredsel_federation/>

      </>
  );
  else
  return(
    <>
    <Header active='home'/>
    <div id="loader"  style={{width:"100%"  , marginTop:"10%" , marginBottom:"10%", textAlign:'center'}}> <p><CircularProgress/></p> </div>
    </>
  )
};

export default (Main_page);