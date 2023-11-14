
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';






interface PropsCard{
    id:string,
    perfil: string,
    title?: string,
    summary: string,
    description: string,
    price: string,
    image: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CardProduct(props: PropsCard) {
  
  let description = props.description
  if (description.length > 100) {
    
    description = `${description.substring(0, 100)}...`
  }

  const isXsScreen = useMediaQuery('(max-width:600px)');

  return (
    <Grid item marginBottom={5} xs={6} sm={6} md={3} sx={{display: isXsScreen ? 'flex' : 'flow', justifyContent: isXsScreen? "center" : 'none',  maxHeight: isXsScreen ? '60vh' : '70vh'}}>
      <Card sx={{ width: isXsScreen ? '43vw' : 345, height: isXsScreen ? '28vh' : '100%', borderRadius: 5, boxShadow: 20 }}>
        
        <CardMedia
          component="img"
          height={isXsScreen ? '50%' : 300}
          width={isXsScreen ? 15 : 300}
          image={props.image}
          alt={props.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.summary}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Preço: {props.price}R$
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{padding:0}}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon href={'..../Api/countFav' + props.id} />
          </IconButton>
          <IconButton aria-label="share">
            <ShoppingCartIcon />
          </IconButton>
          
        </CardActions>
       
      </Card>
    </Grid>
  );
}
