import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import ibsflogo from '../../assets/Ibsf_logo.png'
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.css'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
  },
  input: {
    // marginLeft: theme.spacing(1),
    // size:"1rem"
    // flex: 1,
    padding:"1rem",

  },
  iconButton: {
    padding: 5,
    fontSize:'1rem',
    border:'none',
    outline:'none'
  },




}));


function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function Header({active}) {
  const history = useHistory();
  const classes = useStyles();
  const [value ,setValue] = useState('');


  const handleSearch = (event) => { // changed the "handleSearch()" function
    event.preventDefault();
    if(value!='')
    history.push(`/query/${value}`)
  }
    return (
      
      <>
      <div className="pre-header">
      <div className="ui container" style={{}}>
        <img
        loading="lazy"
          className="ui_small_image"
          src={ibsflogo}
          onClick={()=>history.push("/")}
          style={{objectFit:"contain" , position:"absolute" }}
          
        />
      </div>
    </div>

      <div className="parent_topnav">
    <div className="topnav" id="myTopnav">
      <div className="ui container" style={{backgroundColor: ""}}>
        <a className="" onClick={()=>history.push("/")} style={active == "home" ? { color: "#0da1ff"}:{}} >Home </a>
        

        <div className="dropdown">
          <button className="dropbtn" style={active == "aboutus" ? { color: "#0da1ff"}:{}}>
            About Us
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <a className="" onClick={()=>history.push("/aboutus")}>The IBSF</a>
            <a className="" onClick={()=>history.push("/executive_member")}>Executives</a>
            <a className=""  onClick={()=>history.push("/member_countries")}>Members</a>
            <a className="" onClick={()=>history.push("/champion")}>Past Champions</a>
          
          </div>
        </div>

        <a className="" onClick={()=>history.push("/news/")} style={active == "news" ? { color: "#0da1ff"}:{}}>Reports</a>
        <a className="" onClick={()=>history.push("/events")}  style={active == "events" ? { color: "#0da1ff"}:{}}>Events</a>
        <a className="" onClick={()=>history.push("/rules")}   style={active == "rules" ? { color: "#0da1ff"}:{}}>Rules</a>
        <a className="" onClick={()=>history.push("/download")}   style={active == "document" ? { color: "#0da1ff"}:{}}>Documents</a>


        <div className="dropdown">
          <button className="dropbtn">
            Gallery's
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
          <a className="" onClick={() => {window.open('https://www.facebook.com/groups/ibsf.media/media','_blank')}}>Photographs</a>
          <a className="" onClick={() => window.open('https://www.facebook.com/groups/ibsf.media/media','_blank')}>Videos</a>
          </div>
          
        </div>
        
        <a className=""  onClick={()=>history.push("/contact")}  style={active == "contactus" ? { color: "#0da1ff"}:{}}>Contact</a>
        
      
        <div  className="search-container">


        <Paper component="form" className={classes.root}>
      
      <InputBase
      
        onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
      

          ev.preventDefault();
          handleSearch(ev);
        }}}
        tabIndex='0'
        className={classes.input}
        className="header_input"
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={event=>{                                 //adding the onChange event
          setValue(event.target.value)
        }}
        
      />
      <IconButton 
      onClick={handleSearch} 
    className={classes.iconButton} aria-label="search">
        <SearchIcon style={{fontSize:"2rem" , outline:"none" , border:"none"}} />
      </IconButton>
      
    </Paper>


        </div>
        <a
          style={{fontSize: "15px"}}
          className="icon"
          onClick={myFunction}
          >&#9776;</a>
      </div>


      
    </div>
    </div>
      </>
      
    );
}

export default Header;