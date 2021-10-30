import React , {useState , useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import axios from "axios"
import { useHistory } from 'react-router';
import './carousel.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


function ControlledCarousel() {

  const [navbar , setNavbar] = useState();
  const history = useHistory();


    useEffect(()=>
    {

          axios.get("https://ibsf.info/api/news/featured/")
          .then((response) => setNavbar(response.data.data))


          
    } , [])

  
    return (
      <Carousel className="mainPage_carousel" interval={4000} indicators={false}>

      {
      
        navbar&&navbar.map((data , index)=>
        (
        
          
              <Carousel.Item key={index} style={{height:"100%" , overflow:"hidden"}}>
        <img
          loading='lazy'
          className="d-block w-100"
          src={`https://ibsf.info${data.image}`}
          style = {{ height:"100%" , filter:"brightness(90%)"  }}
          alt="Pre Slide"
        />


        <Carousel.Caption onClick={()=> history.push(`/news/${data.id}/${data.slug}`)} className="carousel_caption">
          <span></span>
          <h3 style={{margin:0}}>{data.title}</h3>
        
        </Carousel.Caption>
      </Carousel.Item>

        

        ))
      
    }

    </Carousel>
    );
  }
  
  export default ControlledCarousel;