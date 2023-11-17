import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBarMenu from "../../components/appBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileMenu } from "../../components/mobileMenu";
import { useEffect, useState } from "react";
import validaToken from "../../functions/validaToken";
import {
    CardActionArea,
    CardMedia,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    tableCellClasses,
} from "@mui/material";
import styled from "styled-components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "white",
        color: "black",
        fontSize: "1.2em",
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#ffa1c4",
        
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    "&:hover": {
        backgroundColor: "#ff7fa2", // Cor quando a linha está sendo hover
        cursor: "pointer", // Altera o cursor para indicar que é clicável
        transition: "background-color 0.1s ease"
    },
    "&:active": {
        backgroundColor: "#ff5173", // Cor quando a linha está sendo clicada
    },
}));

export default function ProductsId() {
    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number
    ) {
        return { name, calories, fat };
    }

    interface IProdutos {
        id_produto: string;
        nome: string;
        valor: string;
        descricao: string;
        url_foto: string;
        categoria: string;
    }

    const rows = [
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Gingerbread", 356, 16.0, 49, 3.9),
    ];

    const [dataProducts, setDataProducts]: any = useState();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken == null) {
            validaToken();
        }
    }, []);

    const categoriaId = localStorage.getItem("categoria");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/productsByCategoria/${categoriaId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                setDataProducts(data);
            } catch (error) {
                console.error("Erro ao obter dados do banco de dados:", error);
            }
        };
        fetchData();
    }, []);

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
                    sx={{ marginBottom: isXsScreen ? 0 : 2, boxShadow: 6, width: "100%" }}
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
                        link1="/home"
                        link2="/hours"
                        link3="/informations"
                        pageAtual="productsId"
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
                    <TableContainer component={Paper}>
                        <Table sx={{ width: "100%" }} aria-label="customized table">
                            <TableHead>
                                <TableRow style={{ height: "2em" }}>
                                    <StyledTableCell>Brigadeiros</StyledTableCell>
                                    <StyledTableCell align="right">Detalhes</StyledTableCell>
                                    <StyledTableCell align="right">Valor</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!dataProducts || dataProducts.result.length == 0 ? <Typography variant="h5" textAlign={'center'}>Sem Estoque</Typography> :false }
                                {dataProducts &&
                                    dataProducts.result &&
                                    dataProducts.result.map((row: IProdutos) => (
                                        <StyledTableRow style={{ height: "6em" }} key={row.nome}>
                                                <StyledTableCell
                                                    component="th"
                                                    style={{ fontSize: "1em", padding: 0 }}
                                                    scope="row"
                                                >
                                                    <Grid container spacing={1} width={"12em"}>
                                                        <Grid item xs={6}>
                                                            <CardMedia
                                                                component="img"
                                                                height="75"
                                                                style={{ marginLeft: 5 }}
                                                                image={row.url_foto}
                                                                alt={row.nome}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={6}
                                                            textAlign={"left"}
                                                            display={"flex"}
                                                            alignItems={"center"}
                                                        >
                                                            {row.nome}
                                                        </Grid>
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell style={{ padding: 8 }} align="left">
                                                    {row.descricao}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="center"
                                                    style={{ fontWeight: "bold", fontSize: "1.2em" }}
                                                >
                                                    {row.valor}
                                                </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* {dataProducts && dataProducts.result && dataProducts.result.map((cat: ICategorias) => (
            <CardCategories key={cat.nome_categoria} image={cat.url_foto} linkCat={cat.id_categoria} title={cat.nome_categoria}/>
          ))} */}
                </Grid>
            </Grid>
        </Box>
    );
}
