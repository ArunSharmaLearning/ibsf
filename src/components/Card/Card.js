import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive'
import "./Card.css"

function Card(props) {
    const history = useHistory();
    const page= props.page;


    useMediaQuery(
        { maxWidth: 768 }, undefined,
    );
    

    useMediaQuery(
        { minWidth: 769 }, undefined,
    );


    props = props.data
    return (
        <div onClick={()=>history.push(`/news/${props.id}/${props.slug}`)} className="card_body" style={page==="main" && window.innerWidth>768? { maxWidth:'30rem' , marginRight:"1.2rem" , overflow:"hidden"}:{ overflow:"hidden"}}>

            <div className = "card_image" style={{backgroundImage:`url(https://ibsf.info${props.image})`, backgroundSize:"cover" , backgroundRepeat:"no-repeat"}}>
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