import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './ExecutiveCard.css'

const componentName = (props) => {

    props=props.data;
    return (
        <div className="executive_card" style={{backgroundImage:`url(https://ibsf.info/${props.image})` , backgroundRepeat:"no-repeat" , backgroundSize:"cover" }}>

            <div className="executive_overlap_div">


                <div className="executive_overlap_text">
                <p>{props.position}</p>
                <h3>{props.name}</h3>
                <div className="executive_social_links">
            {props.email && <MailOutlineIcon onClick={()=>window.location.href=`mailto: ${props.email} `}/>}
            {props.fb_url && <FacebookIcon onClick={()=>{window.open(`${props.fb_url}` , 'blank')}}/>}
            {props.insta_url && <InstagramIcon  onClick={()=>{window.open(`${props.insta_url}` , 'blank')}}/>}
            {props.twitter_url && <TwitterIcon  onClick={()=>{window.open(`${props.twitter_url}` , 'blank')}}/>}
            </div>
            
                </div>

            </div>

        </div>
    );
};

export default componentName;