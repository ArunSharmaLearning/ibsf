import React from 'react';
import { Profiler } from 'react';
import { useHistory } from 'react-router';
import "./Card.css"

function Card(props) {
    const history = useHistory();
    props = props.data
    return (
        <div onClick={()=>history.push(`/news/${props.id}/${props.slug}`)} className="card_body" style={{  overflow:"hidden"}}>

            <div className = "card_image" style={{backgroundImage:`url(https://billiardsports.in/${props.image})`, backgroundSize:"cover" , backgroundRepeat:"no-repeat"}}>
            {/* <img src={props.image} style={{width:"auto", backgroundSize:"cover"}}/>              */}
            </div>
    
            <div className="card_container">

            <h4>{props.title}</h4>
            {/* <hr></hr> */}
            <p style={{marginBottom:"0rem", overflow:"hidden", textOverflow:"ellipsis"}} >
           {props.cf}
           {props.cf.length === 60 && <span>....</span>}
            </p>
            </div>
        </div>
    );
}

export default Card;