
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardContent, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: 'Agbalumo, cursive', // Define a fonte Agbalumo como a fonte padrão para Typography
  },
});




interface ICardCategories{
  title: string,
  image: string,
  linkCat: string
}

export default function CardCategories(props:ICardCategories) {

  



  return (
    <>

        
        <Grid item xs={6} sm={3}>
          <Card sx={{ maxWidth: "43vw", borderRadius: 5}}>
          
            <CardActionArea>
            <Link to={"/productsId"} style={{textDecoration:'none', color: 'inherit'}}>
              <CardMedia
                component="img"
                height="140"
                image={props.image}
                alt={props.title}
              />
              <CardContent style={{backgroundColor:'#ffd0e1', }}>
                <ThemeProvider theme={theme}>
                <Typography gutterBottom variant="h5" component="div" style={{ textAlign:'center'}}>
                  {props.title}
                </Typography>
                </ThemeProvider>
                
                <Typography variant="body2" color="text.secondary"></Typography>
              </CardContent>
              </Link>
            </CardActionArea>
            
          </Card>
        </Grid>
    </>
  );
}
