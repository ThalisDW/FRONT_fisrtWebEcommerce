import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBarMenu from "../../components/appBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MobileMenu} from "../../components/mobileMenu";
import HoursTable from "../../components/hoursTable";

export default function Hours() {
  const isXsScreen = useMediaQuery("(max-width:600px)");

  const estiloDiv = {
    height: isXsScreen ? 200 : 0,
    width: "100%",
    backgroundImage: `url(${"./images/imagemFundoEscura.png"})`,
    backgroundSize: "cover", // Ajusta o tamanho da imagem para cobrir completamente a div
    backgroundRepeat: "no-repeat", // Evita a repetição da imagem
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor:'#ffa1c4', boxShadow: 10, margin:0, border: 0, padding: 0 }}>
      <AppBarMenu
        title="Trufas da Marcy"
        link1="/listProducts"
        campo1="Cardápio"
        link2="/hours"
        campo2="Horários"
        link3="/informations"
        campo3="Informações"
        link4="/"
        campo4="Categorias"
      />
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid item xs={12} sx={{ marginBottom: isXsScreen?0:2, boxShadow: 6 }}>
          <div style={estiloDiv}>
            <img
              src="./images/logoTipoMarcy.jpeg"
              style={{
                height: isXsScreen ? "5em" : 0,
                borderRadius: 50,
                border: 50,
              }}
            ></img>
          </div>
        </Grid>
        {isXsScreen? <MobileMenu link1="/" link2="#" link3="/informations" pageAtual="hours"/>:  ''}
        <Grid container  spacing={2} columnSpacing={isXsScreen ? 1.7 : 0} style={{padding: 0,margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} >
          <HoursTable/>
        </Grid>

        {/* <CardProduct
            id="7777"
            perfil="MarcyTrufas"
            title="TESTE"
            summary="Brigadeiro de Nutella"
            price="30,00"
            description="{item.description}"
            image="./images/trufa.png"
          />
          <CardProduct
            id="7777"
            perfil="MarcyTrufas"
            title="TESTE"
            summary="Brigadeiro de Nutella"
            price="30,00"
            description="{item.description}"
            image="./images/trufa.png"
          /> */}
      </Grid>
    </Box>
  );
}
