import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import {IoLocationSharp} from 'react-icons/io5'
import {BiTimeFive} from 'react-icons/bi'
import {AiOutlineLink} from 'react-icons/ai'
import Header from '../header/Header';
import Caroufredsel_wrapper from '../Carousel/Caroufredsel_wrapper';
import animationData from '../../assets/search_file.json';
import { Helmet } from 'react-helmet';
import './ParticularEvent.css'

const ParticularEvent = (props) => {
    const [data , setdata] = useState([]);
    const {id} =useParams()
    

 const [sponsor , setSponsor] = useState([])


    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    useEffect(()=>
    {
        axios.get(`https://ibsf.info/api/event/?id=${id}`)
        .then((res)=> setdata(res.data.data))
        .catch((e)=> console.log(e))

        
        axios.get("https://ibsf.info/api/sponsers/")
        .then((response) => setSponsor(response.data.data))



    }, [])
        
    if(data.length!=0)
        return (
        <div className="particulat_event">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Events | {data.name}</title>
                
            </Helmet>

            <Header active="events"/>
            
            <div>
                <h1 style={{fontFamily:"Poppins"}}>{data.name} </h1>
            </div>

            <section className="event_details">
                    <div>
                    <h4>LOCATION
                        </h4>

                        <p><IoLocationSharp className="event_icon"/>{data.location}</p>
                    </div>
                        
                        
                    <div>
                    <h4>VENUE
                        </h4>

                        <p> <span><IoLocationSharp className="event_icon"/></span>{data.venue}</p>

                    </div>
                    
                    <div>
                    <h4>START DATE
                        </h4>

                        <p> <span><BiTimeFive className="event_icon"/></span>{data.start_date}</p>

                    </div>
                    
                    <div>
                        
                    <h4>END DATE
                        </h4>

                        <p> <span><BiTimeFive className="event_icon"/></span>{data.end_date}</p>

                    </div>


                
                        {
                        data.results!=null?
                        <div>
                    <h4 onClick={()=> window.open(data.results ,'blank')}>RESULTS <AiOutlineLink />
                        </h4>

                        <p> </p>
                        </div>
                        :
                        <></>
                        }
                


                        
                    
                        {
                        
                        data.photographs!=null?
                        <div>
                    <h4  onClick={()=> window.open(data.photographs ,'blank')}>PHOTOGRAPHS  <AiOutlineLink />
                        </h4>

                        <p></p>
                        </div>
                        :
                        <></>
                        
                        } 
                
                    {
                        data.video!=null?
                        <div>
                    <h4  onClick={()=> window.open(data.video ,'blank')}>VIDEO  <AiOutlineLink />
                        </h4>

                        <p>  </p>
                        </div>
                        :
                        <></>
                    }
                    
                
                    {
                        data.live!=null?
                        <div>
                        
                    <h4  onClick={()=> window.open(data.live ,'blank')}>LIVE  <AiOutlineLink />
                        </h4>

                        <p></p>
                        </div>
                        :
                        <></>
                    }
                    


            </section>

            <section className="event_content">
                <div className="event_content1" dangerouslySetInnerHTML={{__html:data.content1}}>
                </div>
                
                <div className="event_content2" dangerouslySetInnerHTML={{__html:data.content2}}>

                </div>
            </section>

            <Caroufredsel_wrapper data={sponsor}/>
        </div>
    );

        else
    {
        return(
            <>
            <Header active="events"/>
            <Lottie options={defaultOptions} style={{marginTop:"2rem" , marginBottom:"7rem"}}
            height={400} width={350} />
            </>
        )
    }
};


export default ParticularEvent;