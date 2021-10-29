import React , {useEffect  , useState} from 'react';
import Slider from "react-slick";
import { useHistory } from 'react-router';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive'
import AOS  from 'aos';
import Aos from 'aos';
import "./carousel_federation.css"
import "slick-carousel/slick/slick.css";
import 'aos/dist/aos.css';
import "slick-carousel/slick/slick-theme.css";




const Caroufredsel_federation = (props) => {


    const [slidesToShow , setslidesToShow] = useState();
    const [federation , setfederation] = useState([])
    const history =useHistory()

    
    useEffect(()=>
    {
        const width = window.innerWidth;
        AOS.init({
            duration : 900,
            once:true,
        });
        Aos.refresh()
        

        width>768? setslidesToShow(5):setslidesToShow(1)

        axios.get('https://ibsf.info/api/all-regions/')
        .then((res)=>
        {
            setfederation(res.data.data)
            setslidesToShow(federation.length)
        })
    },[])

    
    const handleMediaQueryChange = (matches) => {
        if(matches)
        setslidesToShow(1);
    }

    const handleMediaQueryChange1 = (matches) => {
        if(matches)
        setslidesToShow(federation.length);
    }

    

    useMediaQuery(
        { maxWidth: 768 }, undefined,  handleMediaQueryChange
    );
    

     useMediaQuery(
        { minWidth: 769 }, undefined,  handleMediaQueryChange1
    );


    var setting={
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay:true,
    }
    



    return (
        <div className="carouselfederation_container">

<Slider  {...setting}>
    {
    federation.map((data, index)=>(
                <>
                <div key={index} data-aos={"fade-up"}  data-aos-delay={(index)*100} data-aos-anchor-placement="top-center"  onClick={()=>history.push(`/member_countries/${data.id}/${data.slug}` )} className="slide_image" ><img src={`https://ibsf.info${data.logo}`} height='120px'style={{objectFit:"contain"}} alt="img" /></div>
                </>
            
    ))
    }

    </Slider>
    


        </div>
    );
};


export default Caroufredsel_federation;