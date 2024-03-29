// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from "react";
import CardProduct from "../../components/cards/cardProduct";
import AppBarMenu from "../../components/appBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MobileMenu } from "../../components/mobileMenu";
import validaToken from "../../functions/validaToken";

export const ListProducts = () => {    

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken == null) {
          validaToken()
          
        }
      }, []);

    return (
        <>
            <Box sx={{ width: "100%", backgroundColor: "rgb(255, 219, 239)" }}>
                <AppBarMenu
                    title="Trufas da Marcy"
                    link1="#"
                    campo1="Cardápio"
                    link2="/hours"
                    campo2="Horários"
                    link3="/informations"
                    campo3="Informações"
                    link4="/Home"
                    campo4="Categorias"
                />

                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                    sx={{ marginTop: 0, marginBottom: "4em" }}
                >
                    <Grid
                        container
                        xs={12}
                        style={{height:'auto'}}
                    >
                        <Grid xs={12} style={{
                            backgroundColor: "#ffa1c4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0
                        }}>
                            <Typography
                                variant="h5"
                                color="initial"
                                fontWeight="bold"
                                textAlign="center"
                                fontFamily="revert"
                            >
                                CARDÁPIO COMPLETO
                            </Typography>
                        </Grid>
                        

                    </Grid>
                    {/* <CarroselCard /> */}
                    <CardProduct
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
                    />
                    <CardProduct
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
                    />
                    <CardProduct
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
                    />
                    <CardProduct
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
                    />
                </Grid>
                <Grid xs={12}  width={'100vw'} position={"fixed"} bottom={0}>
                            <MobileMenu link1="/Home" link2="/hours" link3="/informations" pageAtual="cardapios" />

                        </Grid>
            </Box>
        </>
    );
};
