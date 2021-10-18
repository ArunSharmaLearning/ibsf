import React ,{useState , useEffect} from 'react';
import Header from '../header/Header';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import './EventPage.css'
import '../NewsGallery/NewsGallery.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    
    minWidth:150,
    // marginLeft:"2rem"
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  table: {
    // maxWidth:"400px"
    fontSize:"1.2rem",
    fontFamily:'Poppins',
    width:'860px'

  },
  style_key:{
    border:0
}
  
}));


const EventPage = (props) => {
    const [state, setState] = useState('')
    const [data , setdata] = useState([]);
    const history = useHistory()
    const classes = useStyles();
    const [loading , setloading] = useState(true)
    const handleChange = (event) => {
        setState(event.target.value);
      };

      const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          // paddingLeft:"3rem",
          // paddingRight:"3rem"
        },
        body: {
          fontSize: "1.2rem",
          fontWeight:"600"
          // paddingLeft:"3rem",
          // paddingRight:"3rem"
        }
        
      
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      
      
      useEffect(() => {

        var currentyear = new Date().getFullYear();
        setState(currentyear.toString())
        

        var select = document.getElementById('outlined-age-native-simple')
    
            while(select.firstChild)
        {
            select.removeChild(select.lastChild);
        }
        
        for(let i = currentyear; i>=2010;i--)
        {
    
        
        let option = document.createElement("option");
        option.text = i.toString();
        option.value = i;
        select.appendChild(option)
        }
        } ,[]);

        useEffect(() => {
            setdata([])
            setloading(true)
            axios.get(`https://ibsf.info/api/event/year/?year=${state}`)
            .then((res)=> 
            {setdata(res.data.data)
            setloading(false)})
            .catch((e)=> console.log(e))

        },[state])


    return (
        <>
            {/* <h1>Event Page</h1> */}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Events</title>
                
            </Helmet>


            <Header active="events"/>
            <div className="news-gallery ui container" style={{maxWidth:"900px" , padding:"2rem"   ,marginLeft:"auto" , marginRight:"auto"}}>
            <div style={{display:'flex'}}>
    <h1> Events<br></br><hr style={{marginTop:"1rem" }}></hr></h1>
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
      <br></br>
  </div>
  </div>
  <br></br>

  {
  data.length!=0 ?
  <div style={{height:"auto",display:"flex", flexWrap:"wrap" ,justifyContent:"start" }}>
  <TableContainer className="table_event" style={{borderRadius:"0" }} component={Paper}>
      <Table className={classes.table}  stickyHeader aria-label="sticky table">
        <TableHead>
            <TableRow>
            <StyledTableCell align="center" style={{fontSize:"1.2rem"  ,width:"2rem"}}>S.No</StyledTableCell>
            <StyledTableCell align="center" style={{fontSize:"1.2rem" , width:"15rem"}}>Start Date</StyledTableCell>
            <StyledTableCell align="center"  style={{fontSize:"1.2rem" , width:"15rem"}} >End Date</StyledTableCell>
            <StyledTableCell align="left"  style={{fontSize:"1.2rem" , minWidth:"20rem"}} >Event</StyledTableCell>
            <StyledTableCell align="left"  style={{fontSize:"1.2rem" , width:"20rem"}} >Location</StyledTableCell>
            
            </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row , index) => (
            <StyledTableRow key={row.name}>
                <StyledTableCell align="center" className={classes.style_key} style = {index%2?{background:"rgb(13, 161, 255 , 0.8)" , color:"white"}:{background:"rgb(13, 161, 255 )" , color:"white"}}>
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.start_date}
              </StyledTableCell>

              <StyledTableCell align="center">
                {row.end_date}
              </StyledTableCell>

              <StyledTableCell className="hoverable_title" align="left" onClick={()=>history.push(`/events/${row.id}/${row.slug}`)}>{row.name}</StyledTableCell>
              <StyledTableCell className="hoverable_title" align="left" onClick={()=>history.push(`/events/${row.id}/${row.slug}`)}>{row.location}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.calories}</StyledTableCell> */}
  

            
              {/* <StyledTableCell align="right">{row.calories}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    :<>
    {
      loading?<div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <p><CircularProgress/></p> </div>:
      <div id="loader" style={{width:"100%" ,  textAlign:"center" }}> <h3>Nothing Found...</h3> </div>
    }
    </>
          }

</div>
        </>

          
    );
    
};



export default EventPage;