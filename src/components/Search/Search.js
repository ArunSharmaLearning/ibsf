import React, { useEffect, useState } from 'react';
import Header from '../header/Header'
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';
import './Search.css'

const Search = props => {

    const {query} = useParams();
    const [searchdata , setSearchdata] = useState([]);
    const [loading, setloading] = useState(true);
    const history = useHistory()


    useEffect(()=>
    {
        setloading(true)
        setSearchdata([])
        axios.get(`https://ibsf.info/api/search/?query=${query}`)
        .then((res)=>
        {
            setSearchdata(res.data.data)
            setloading(false);
        })
        .catch((e)=>console.log(e));
        

    } , [query])
    return (
        <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Search | {query}</title>
                
            </Helmet>
            <Header/>


            <div className="ui container" style={{maxWidth:"1130px" , display:"flex",  flexDirection:"column" , margin:'auto' ,padding:"2rem"}}>

                {
                    searchdata.length!=0?
                    <>
                <h2 style={{textAlign:"start" ,margin:0, padding:"0" , width:'max-content'}}>Search results:<br></br><hr style={{marginTop:"1rem" ,marginBottom:"1.5rem" }}></hr></h2>
                {/* For news */}
                
                {
                    <>
                        {
                    searchdata.news.length>0&&
                    <div>
                    <h3 style={{color:"#0da1ff"}}>News:</h3>
                    {
                        searchdata.news.map((data, index)=>
                        (
                            <div style={{display:"flex" , flexDirection:'column'}}>
                                <h4 className="hoverable_titles" style={{cursor:'pointer'}} onClick={()=> history.push(`/news/${data.id}`)}>{data.title}</h4>
                                <p style={{margin:'0'}}>Article By {data.writer_name}</p>
                                <p>start Date <span>{new Date(data.timestamp).toLocaleDateString("en", {weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "numeric"})}
        </span></p>
        <br></br>
                            </div>
                        ))
                    }

                        </div>
                        }
                    
                    </>
                }


                {/* For Events */}
                
                {
                    <div>
                        {
                    searchdata.events.length>0&&
                    <>
                    <h3 style={{color:"#0da1ff"}}>Events:</h3>
                    {
                        searchdata.events.map((data, index)=>
                        (
                            <div style={{display:"flex" , flexDirection:'column'}}>
                                <h4 className="hoverable_titles" onClick={()=>history.push(`/events/${data.id}`)}>{data.name}</h4>
                                <h5 style={{margin:0}}>Location  {data.location}</h5>
                                <p style={{margin:0}}>Start Date: {data.start_date}</p>
                                <p>End Date: {data.end_date}</p>
                            </div>
                        ))
                    }

                        </>
                        }
                    </div>
                }

                    {
                    <div>
                        {
                    searchdata.events.length==0&&searchdata.news.length===0&&
                    <>
                    <h4>No Search results</h4>
                    <p>Your search query : <span style={{color:"#0da1ff"}}>{query}</span> did not match any documents.</p>
                        
                        <br></br>
                    <h4>Suggestions</h4>
                    <ul style={{paddingLeft:"4rem"}}>
                        <li>Make sure that all words are spelled correctly.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords..</li>
                        <li>Try different keywords.</li>
                    </ul>
                            
                        </>
                        }
                    </div>
                }
                </>:
                <>
                {
                loading?<div id="loader" style={{width:"100%" ,  textAlign:"center" , marginTop:"2rem" }}> <p><CircularProgress/></p> </div>:
                <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <h4>Nothing Found...</h4> </div>
                }
                </>


            }
                
            </div>
        </>
    );
};


export default Search;