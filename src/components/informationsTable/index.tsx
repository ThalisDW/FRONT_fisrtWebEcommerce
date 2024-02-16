import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/Pix';

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

export default function InformationsTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead >
          <TableRow >
            <StyledTableCell style={{color:'black', fontFamily:'arial',fontWeight:'bold' ,fontSize:'1em', backgroundColor: '#ffd0e1'}}>FORMAS DE PAGAMENTO:</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' ,alignItems:'center'}}>
                <LocalAtmIcon style={{marginRight: '1em'}}/>Dinheiro
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' ,alignItems:'center'}}>
                <CreditCardIcon style={{marginRight: '1em'}}/>Cartão de débito
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' ,alignItems:'center'}}>
                <CreditCardIcon style={{marginRight: '1em'}}/>Cartão de crédito
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{display:'flex', fontSize:'1em',fontFamily:'cursive' ,alignItems:'center'}}>
                <PixIcon style={{marginRight: '1em'}}/>Pix - CNPJ (39319907000143)
              </StyledTableCell>
              
             
            </StyledTableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
  );
}
