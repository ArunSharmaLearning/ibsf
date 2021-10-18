import React, { useEffect , useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { useParams } from 'react-router';
import Category_event_card from '../Card/category_event_card';


const useStyles = makeStyles(() => ({
    center: {
      textAlign: "center",
    },
    SearchBar: {
      margin: "24px 0 28px 360px",
    },
  }));

const Category_Event = props => {
    const classes = useStyles()
    const [data  , setdata] = useState([]);
    const {id} = useParams();
    const [loading , setloading] = useState(false);
    const [bottom, setBottom] = useState(false)
    const [page , setPage] = useState(1);





    useEffect(()=>
    {
  
    
        if(page===1){
        setdata([])
        setBottom(false);
  
        }
        setloading(true)
      axios.get(`https://ibsf.info/api/category/?num=${page}&category=${id}&type=event`).
      then((res)=>setdata((prev)=> {
        if(res.data.data.event.length===0)
        setBottom(true)
  
        setloading(false)
        return (prev.concat(res.data.data.event))}))
      .catch((e)=> console.log(e));
    } , [page ,id])


  
    
    return (
        
        <div className="news-gallery">
            <Grid item container>
          
          
                
                {
                    props.data.map((raw ,index)=>
                    (
                        <>
                        <Category_event_card key={index} data = {raw}/>
                        </>
                    ))

                } 

        {/* {
          data.length==0 && loading==false && <div style={{width:'100%', textAlign:"center"}}><h3 >Nothing Found...</h3></div>
        }
{(loading && bottom!=true) && <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <CircularProgress/> </div>} */}
            
                
            </Grid>
            
        </div>
    );
};


export default Category_Event;