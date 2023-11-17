import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBarMenu from "../../components/appBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import CardCategories from "../../components/cards/cardCategories";
import { MobileMenu } from "../../components/mobileMenu";
import { useEffect, useRef, useState } from "react";
import validaToken from "../../functions/validaToken";

export default function Home() {
  const [dataProducts, setDataProducts] :any = useState()
 
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken == null) {
      validaToken()
      
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/categorias", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        const data = await response.json();
        setDataProducts(data)
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };
    fetchData();
  }, []);
  

  const isXsScreen = useMediaQuery("(max-width:600px)");

  interface ICategorias {
    nome_categoria: string;
    url_foto: string;
    id_categoria: number
  }


  

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
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#ffa1c4",
        boxShadow: 10,
        margin: 0,
        border: 0,
        padding: 0,
      }}
    >
      <AppBarMenu
        title="Trufas da Marcy"
        link1="/listProducts"
        campo1="Cardápio"
        link2="/hours"
        campo2="Horários"
        link3="/informations"
        campo3="Informações"
        link4="/Home"
        campo4="Categorias"
      />
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid
          item
          sx={{ marginBottom: isXsScreen ? 0 : 2, boxShadow: 6, width: '100%' }}
        >
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
        {isXsScreen ? (
          <MobileMenu
            link1="#"
            link2="/hours"
            link3="/informations"
            pageAtual="home"
          />
        ) : (
          ""
        )}
        <Grid
          container
          spacing={2}
          columnSpacing={isXsScreen ? 1.7 : 0}
          style={{
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          {dataProducts && dataProducts.result && dataProducts.result.map((cat: ICategorias) => (
            <CardCategories key={cat.nome_categoria} image={cat.url_foto} linkCat={cat.id_categoria} title={cat.nome_categoria}/>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
