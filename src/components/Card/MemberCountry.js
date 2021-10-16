import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { MailOutlined } from '@material-ui/icons';
import {HiOutlineGlobeAlt} from 'react-icons/hi'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin:'1rem' ,
    cursor:"pointer" , 
    width:"50rem",
  },
  key:
  {
    color:'rgba(0 , 0 ,0  , 0.7)',
    fontWeight:'600'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 180,
    backgroundSize:'contain',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MemberCountry(props){

    
  const classes = useStyles();

  props= props.data
  return (
    <Card className={classes.root}>

<CardMedia
        className={classes.cover}
        image={`https://billiardsports.in/${props.logo}`}
        title={props.logo}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          
          <Typography component="h3" variant="h5" style={{fontSize:"1.6rem" , color:"rgba(0 , 0  , 0 , 0.85)" ,fontWeight:"600"}}>
            {props.federation}
          </Typography>
        
          {
            props.president&&
          <Typography variant="h5" >
            <span className={classes.key}>President</span>: {props.president}
          </Typography>
          }
          {
            props.secretary &&
          <Typography variant="h5" >
          <span className={classes.key}>secretary</span>: {props.secretary}
          </Typography>
          }
          {
            
          <Typography variant="h5" >
          {props.email_id && <MailOutlined style={{color:"rgba(255 , 0 , 0 , 0.9)" , marginRight:"0.5rem" , fontSize:"2rem"}} onClick={()=>window.location.href=`mailto: ${props.email_id}`}/>}
          {props.website && <HiOutlineGlobeAlt style={{color:"rgba(0 , 0 , 255 , 0.7)" , fontSize:"2rem"}}  onClick={()=>{window.open(props.website , 'blank')}}/>}

          </Typography>

          }
          

          
          
  
        </CardContent>
    
      </div>
  
    </Card>
  );
}
