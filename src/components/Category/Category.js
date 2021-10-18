import React ,{useState ,useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {  makeStyles } from '@material-ui/core/styles';
import Header from '../header/Header';
import Category_Event from './Category_Event'
import Category_News from './Category_News';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';
import './Category.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
      
      minWidth:150,
      marginRight:"1rem"
    },
    formControlType:
    {
        minWidth:150
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
    table: {
      // maxWidth:"400px"
      fontSize:"1.2rem"
    },
    style_key:{
      border:0
  }
    
  }));
  


const Category = props => {
    var category;
    const [stateType, setStateType] = useState('News')
    const history = useHistory()
    const classes = useStyles();
    const {id} =  useParams();

    const [data_news  , setdata_news] = useState([]);
    const [data_event , setdata_event] =useState([]);
    const [loading_news , setloading_news] = useState(true);
    const [loading_event , setloading_event] = useState(true);
    const [bottom_event, setBottom_event] = useState(true)
    const [bottom_news, setBottom_news] = useState(true)
    const [page_news , setPage_news] = useState(1);
    const [page_event , setPage_event] = useState(1);

    if(id==1)
    category='World Snooker';
    else
    if(id==2)
    category='World Billiards'
    else
    if(id==3)
    category='World 6Reds';
    else
    if(id==4)
    category='World Team';
    else
    if(id==5)
    category='World U21';
    else
    if(id==6)
    category='World U18';
    else
    if(id==7)
    category='World U17';
    else
    if(id==8)
    category='World U16';
    else
    if(id==9)
    category='World Cup';
    const handleChangeType = (event) => {
        setStateType(event.target.value);
    };

    useEffect(()=>
    {
  
    
        if(page_news===1){
        setdata_news([])
        setBottom_news(false);
  
        }
        setloading_news(true)
      axios.get(`https://ibsf.info/api/category/?num=${page_news}&category=${id}&type=news`).
      then((res)=>setdata_news((prev)=> {
        if(res.data.data.news.length===0)
        setBottom_news(true)
  
        setloading_news(false)
        return (prev.concat(res.data.data.news))}))
      .catch((e)=> console.log(e));
    } , [page_news ,id])

  

    useEffect(()=>
    {
  
    
        if(page_event===1){
        setdata_event([])
        setBottom_event(false);
  
        }
        setloading_event(true)
      axios.get(`https://ibsf.info/api/category/?num=${page_event}&category=${id}&type=event`).
      then((res)=>setdata_event((prev)=> {
        if(res.data.data.event.length===0)
        setBottom_event(true)
  
        setloading_event(false)
        return (prev.concat(res.data.data.event))}))
      .catch((e)=> console.log(e));
    } , [page_event ,id])



    useEffect(()=>
    {
      setdata_news([]);
      setdata_event([]);
      setPage_news(1);
      setPage_event(1);
    } ,[id])



    const handleScroll_news = (e) => {

      const {scrollTop , clientHeight , scrollHeight} = e.currentTarget
    
  
      if(clientHeight + scrollTop + 300 >= scrollHeight && bottom_news!=true && loading_news==false)
          {
              
  
                
                      
                      setloading_news(true)
                      setPage_news((prev)=>  prev+1)
              
                  
              return
                
          }
    }

    const handleScroll_event = (e) => {

      const {scrollTop , clientHeight , scrollHeight} = e.currentTarget
    
  
      if(clientHeight + scrollTop + 300 >= scrollHeight && bottom_event!=true && loading_event==false)
          {
              
  
                
                      
                      setloading_event(true)
                      setPage_event((prev)=>  prev+1)
              
                  
              return
                
          }
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                
            </Helmet>

            <Header active={stateType==='Event'?"events":"news"}/>
            <div onScroll={stateType=="News" ? handleScroll_news: handleScroll_event} className="category ui container" style={ data_news.length!=0?{ height:'100vh'}:{height:'auto' , marginBottom:"0rem"}}>
    
    <div style={{display:"flex" , marginBottom:"1rem" }}>
    <h1> {category}<br></br><hr style={{marginTop:"1rem" }}></hr></h1>
<div className="category_search">

  <FormControl  variant="outlined" className={classes.formControlType} >
    <InputLabel  className="news_gallery-input-label"  htmlFor="outlined-year-native-simple">Type</InputLabel>
    <Select
      native
      className="input-label-select"
      value={stateType}
      onChange={handleChangeType}
      label="type"
      inputProps={{
        name: 'type',
        id: 'outlined-age-native-simple',
      }}
    >

<option className="input-label-option"   value="Event" >Event</option>
<option className="input-label-option"   value="News" >News</option>
    </Select>
  </FormControl>


    </div>

      </div>

      <br></br>

        {
            stateType==="Event"?<Category_Event data={data_event}/>:<Category_News data={data_news}/>
        }
        {
          
          stateType==="News" && data_news.length==0 && loading_news==false && <div style={{width:'100%', textAlign:"center"}}><h3>Nothing Found...</h3></div>
        }
        {
          stateType==="Event" && data_event.length==0 && loading_event==false && <div style={{width:'100%', textAlign:"center"}}><h3>Nothing Found...</h3></div>
        }
{(stateType==="News" && loading_news && bottom_news!=true) && <div id="loader" style={{width:'100%', textAlign:"center"}}> <CircularProgress/> </div>}
{(stateType==="Event" && loading_event && bottom_event!=true) && <div id="loader" style={{width:'100%', textAlign:"center"}}> <CircularProgress/> </div>}
        </div>
        </>
    );
};

export default Category;