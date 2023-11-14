import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(
//   name: string,
// ) {
//   return { name};
// }

export default function HoursTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead >
          <TableRow >
            <StyledTableCell style={{color:'black', fontFamily:'arial',fontWeight:'bold',textAlign:'center' ,fontSize:'1em', backgroundColor: '#ffd0e1'}}>HORÁRIOS DE ATENDIMENTO:</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody >
          
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' , justifyContent:'center',alignItems:'center'}}>
                Terça: 13:00 - 20:00 
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' , justifyContent:'center',alignItems:'center'}}>
                Quarta: 13:00 - 20:00 
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' , justifyContent:'center',alignItems:'center'}}>
                Quinta: 13:00 - 20:00 
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' , justifyContent:'center',alignItems:'center'}}>
                Sexta: 13:00 - 20:00 
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' , justifyContent:'center',alignItems:'center'}}>
                Sábado: 13:00 - 20:00 
              </StyledTableCell>
              
              
             
            </StyledTableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
  );
}
