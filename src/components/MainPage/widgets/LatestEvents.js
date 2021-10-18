import React ,{useEffect , useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    // paddingLeft:"3rem",
    // paddingRight:"3rem"
  },
 

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 320,
    // maxWidth:"400px"
  },
  style_key:
  {
      width:"8rem",
      // padding:"5px",
      border:"0"
  },
  latest_event:
  {
    cursor:'pointer',
    '&:hover':
    {
      color:"rgb(13, 161, 255)",
      cursor:"pointer",
      transition:"color 500ms"
    }
  }
  ,
  non_hoverable:
  { cursor:'pointer',
  }
});

export default function LatestEvents() {
  const [data , setData] = useState([]);
  const history = useHistory()
  const classes = useStyles();

  useEffect(()=>
  {
    axios.get(`https://ibsf.info/api/event/future/`)
    .then((res)=>setData(res.data.data))
    .catch((e)=> console.log(e))
  } , [])

  return (
    <TableContainer style={{borderRadius:"5px"}} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        
        <TableBody>
          {data.map((row ,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell  className={classes.style_key} style = {index%2?{background:"rgb(13, 161, 255 , 0.8)"}:{background:"rgb(13, 161, 255 )"}} align="left">
                {row.tentative}
              </StyledTableCell>
              <StyledTableCell onClick={()=>{if(row.link) return window.open(row.link , '_self')}} className={row.link?classes.latest_event:classes.non_hoverable} align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.location}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.calories}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
