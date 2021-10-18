import React , {useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Header from "../header/Header"
import Card from '../Card/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Helmet} from 'react-helmet'
import "./NewsGallery.css"

const useStyles = makeStyles((theme) => ({
  formControl: {
    
    minWidth:150,
    // marginLeft:"2rem"
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));


function NewsGallery() {

const [state, setState] = useState('all')
const [data , setdata] = useState([]);
const classes = useStyles();
const [page, setpage]= useState(1)
const [loading, setloading]=useState(true)
const [bottom, setBottom] = useState(false)

useEffect(() => {
  var currentyear = new Date().getFullYear();
  

    var select = document.getElementById('outlined-age-native-simple')

    while(select.firstChild)
    {
      select.removeChild(select.lastChild);
    }
    let Alloption = document.createElement('option');
    Alloption.text = "All";
    Alloption.value="all";
    select.appendChild(Alloption)
    for(let i = currentyear; i>=2010;i--)
    {

    
  let option = document.createElement("option");
option.text = i.toString();
option.value = i;
  select.appendChild(option)
    }
  } ,[]);

  useEffect(()=>
  {

    if(state==='all')
    {
      if(page===1){
      setdata([])
      setBottom(false);

      }
      setloading(true)
    axios.get(`https://ibsf.info/api/news/${state}/?num=${page}`).
    then((res)=>setdata((prev)=> {
      if(res.data.data.length===0)
      setBottom(true)

      setloading(false)
      return (prev.concat(res.data.data))}))
    .catch((e)=> console.log(e));
    }
    else
    {
      setdata([]);
      setpage(1)
      setBottom(false)
      setloading(true)
    axios.get(`https://ibsf.info/api/news/year/?year=${state}`).
    then((res)=>
    {setdata(res.data.data)
      setloading(false)
      setBottom(true)
    })
    .catch((e)=> console.log(e));
    }




  } , [state , page])

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const handleScroll = (e) => {
    if(state!='all')
    return
    const {scrollTop , clientHeight , scrollHeight} = e.currentTarget

  
    if(clientHeight + scrollTop + 300 >= scrollHeight && bottom!=true && loading==false)
        {
            

              
                    
                    setloading(true)
                    setpage((prev)=>  prev+1)
                
            return
              
        }



  }
    return (
      <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Reports</title>
                
            </Helmet>

      <Header active="news"/>
      <div  onScroll={handleScroll} style={data.length!=0 && state=='all' ? {height:"100vh" ,marginBottom:"-5rem" ,overflow:"scroll"}:{height:"auto"}}className="news-gallery">
        
        

        <div className="ui container" style={{maxWidth:"1130px" , padding:"2rem"   ,marginLeft:"auto" , marginRight:"auto"}}>
    
      <div style={{display:'flex'}}>

        <h1> Reports<br></br><hr style={{marginTop:"1rem" }}></hr></h1>
<div className="news-gallery-search_bar">
<FormControl className="news_gallery" variant="outlined" className={classes.formControl} >
        <InputLabel  className="news_gallery-input-label"  htmlFor="outlined-year-native-simple">Year</InputLabel>
        <Select
          native
          className="input-label-select"
          value={state}
          onChange={handleChange}
          label="Year"
          inputProps={{
            name: 'year',
            id: 'outlined-age-native-simple',
          }}
        >

<option className="input-label-option"   value="all" >All</option>
        </Select>
      </FormControl>

    



</div>
</div>
<br></br>
          <div style={{height:"auto",display:"flex", flexWrap:"wrap" ,justifyContent:"flex-start",marginTop:"2rem" }}>

        
          

        {
          data && data.map((val , index)=>
          (
            <>
              <Card key={index} data={val}/>
              </>
          ))

          
        }

        {
          data.length==0 && loading==false && <div style={{margin:"auto"}}><h3>Nothing Found...</h3></div>
        }
        </div>

{(loading && bottom!=true) && <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <CircularProgress/> </div>}


        
            </div>

        </div>
        </>
    );
}

export default NewsGallery;