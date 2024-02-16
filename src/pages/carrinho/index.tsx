import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBarMenu from "../../components/appBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileMenu } from "../../components/mobileMenu";
import { useEffect, useRef, useState } from "react";
import validaToken from "../../functions/validaToken";
import {
    Autocomplete,
    Button,
    CardMedia,
    FormControlLabel,
    FormLabel,
    Modal,
    Paper,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
    tableCellClasses,
} from "@mui/material";
import styled from "styled-components";
import LoadingOverlay from "../../components/loadingOverlay";
import { Link } from "react-router-dom";

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

const StyledTableCellFunc = styled(TableCell)(({ theme }) => ({
    "&:active": {
        backgroundColor: "grey", // Cor quando a linha está sendo clicada
    },
}));

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function Carrinho() {

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

    const [dataProducts, setDataProducts]: any = useState();
    const [reloadKey, setReloadKey] = useState(0);
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState(0)
    const [infoUser, setInfoUser]:any = useState([])
    const userName = useRef('');
    const userCpf = useRef('');
    const [numTelefone, setNumTelefone] = useState('')
    const [teleEntre,setTeleEntre] = useState(2);
    const [formaPag, setFormaPag] = useState('Dinheiro');
    const [endereco, setEndereco] = useState('');
    const [loadingOverlay, setLoadingOverlay] = useState(false)

    const handleOpen = () => {
        const infoUserLocal = JSON.parse(localStorage.getItem("infoUser") || "[]");

        if (infoUserLocal.length === 0) {
            loadInfoUser();
            setInfoUser(JSON.parse(localStorage.getItem("infoUser") || "[]"))
        } else {
            setInfoUser(infoUserLocal)
        }
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };


    interface IProdutos {
        id_produto: string;
        nome: string;
        valor: string;
        url_foto: string;
        categoria: string;
        quantidade: string;
    }

    function setQuantidade(id_produto: any, operacao: string) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]')
        carrinho.forEach(e => {
            if (e.id_produto === id_produto) {
                if (operacao === '+') {
                    e.quantidade += 1;
                    localStorage.setItem('carrinho', JSON.stringify(carrinho))
                } else {
                    e.quantidade -= 1;

                    if (e.quantidade === 0) {
                        const semProduto = carrinho.filter(e => e.id_produto !== id_produto)
                        localStorage.setItem('carrinho', JSON.stringify(semProduto))
                    } else {
                        localStorage.setItem('carrinho', JSON.stringify(carrinho))
                    }
                }
                setReloadKey(prevKey => prevKey + 1);
            }
        });
    }

    function funcSetFormaPag(event: any, value: any){
        setFormaPag(value)
    }

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]')

        let newTotal = 0
        carrinho.forEach(e => {


            if (e.quantidade > 1) {
                newTotal += Number(e.quantidade) * Number(e.valor); // Multiplique o valor pelo quantidade e adicione ao novo total
            } else {
                newTotal += Number(e.valor); // Adicione simplesmente o valor ao novo total
            }
        });
        setTotal(Number(newTotal.toFixed(2)));
    }, [reloadKey])

    const loadInfoUser = async () => {
        const id_user = localStorage.getItem('user_id')
        try {
            const response = await fetch(
                `http://localhost:8080/getInfoUser/${id_user}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const infoUserResponse = await response.json();

            localStorage.setItem('infoUser', JSON.stringify(infoUserResponse.result))
            return true
        } catch (e) {
            return false
        }
    }

    const fazerPedido = async () => {
        setLoadingOverlay(true) 
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]')
        const id_user = JSON.parse(localStorage.getItem('user_id') || '[]')

        try {
            const response = await fetch("http://localhost:8080/insertPedido", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idUser: id_user,
                    nomeUser: userName.current,
                    cpfUser: userCpf.current,
                    numTelefoneUser: numTelefone,
                    valorTotal: total,
                    metodoPag: formaPag,
                    teleEntrega: teleEntre,
                    enderecoTele: endereco,
                    items: dataProducts
                }),
            });

            const data = await response.json();

            // return data
            if (data.message) {
                alert('Pedido de número: '+ data.idPdd +', criado com sucesso!');
                localStorage.setItem('carrinho', '[]')
                handleClose()
                setReloadKey(1)
                setLoadingOverlay(false)
            } else {
                alert( 'ERRO:' + data.result )
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken == null) {
            validaToken();
        }
    }, [0]);



    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

        setDataProducts(carrinho);
    }, [reloadKey]);


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
            <LoadingOverlay bool={loadingOverlay}/>
            <AppBarMenu key={reloadKey}
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
                        pageAtual="carrinhos"
                    />
                ) : (
                    ""
                )}
                <Grid
                    container
                    columnSpacing={isXsScreen ? 1.7 : 0}
                    style={{
                        padding: 0,
                        margin: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Grid style={{ textAlign: 'right', width: '100vw', padding: 5 }}>
                        {!dataProducts || dataProducts.length == 0 ? (
                            <Button component={Link} to="/Home"  variant="contained" color="success" >Produtos</Button>
                        ) : (
                            <Button onClick={handleOpen} variant="contained" color="success" >Finalizar</Button>
                        )}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...style, width: '77vw', borderRadius:'15px'}}>
                                {infoUser.map(e => {
                                    userName.current = e.user_nome_cliente
                                    userCpf.current = e.user_cpf
                                    return (
                                        <>
                                            <Grid container spacing={4} textAlign={'center'}>
                                                <Grid item xs={12}>
                                                    <h2 id="child-modal-title">Dados para o pedido:</h2>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField id="outlined-basic" label="Nome" variant="outlined" disabled value={e.user_nome_cliente} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField id="outlined-basic" label="CPF" variant="outlined" disabled value={e.user_cpf} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" 
                                                        label="Número de telefone" 
                                                        variant="outlined" 
                                                        value={numTelefone} 
                                                        onChange={(e) => {
                                                            const inputValue = e.target.value;
                                                            // Remove tudo que não for número
                                                            const onlyNums = inputValue.replace(/[^0-9]/g, '');
                                                            // Atualiza o estado com apenas números
                                                            setNumTelefone(onlyNums);
                                                          }}
                                                    />
                                                </Grid>
                                                <Grid item xs={5} md={6}>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormLabel id="demo-row-radio-buttons-group-label">Tele-Entrega?</FormLabel>
                                                    <FormControlLabel checked={teleEntre === 1} onChange={()=>setTeleEntre(1)} control={<Radio />} label="Sim" />
                                                    <FormControlLabel checked={teleEntre === 2} onChange={()=>setTeleEntre(2)} control={<Radio />} label="Não" />
                                                </RadioGroup>
                                                </Grid>
                                                <Grid item xs={7}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={['Dinheiro', 'Pix', 'Débito', 'Crédito']}
                                                    defaultValue={formaPag}
                                                    renderInput={(params) => <TextField {...params} label="Forma de pagamento" />}
                                                    onChange={(event, value)=> funcSetFormaPag(event, value)}
                                                />
                                                </Grid>
                                                { teleEntre === 2 ? null : 
                                                    <>
                                                        <Grid item xs={12}>
                                                            <TextField id="outlined-basic" label="Endereço" variant="outlined" value={endereco} onChange={(e:any)=> setEndereco(e.target.value)}/>
                                                        </Grid>
                                                    </>
                                                }
                                                <Grid item xs={12} md={6}>
                                                    <h3>Valor total: {total} R$</h3><span>(Sem eventual valor da tele-entrega)</span>
                                                </Grid>
                                                <Grid item xs={6} md={6}>
                                                    <Button onClick={handleClose} variant="contained" color="error">Cancelar</Button>
                                                </Grid>
                                                <Grid item xs={6} md={6}>
                                                    <Button onClick={fazerPedido} variant="contained" color="success">Confirmar</Button>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <span>* Revise os dados antes de confirmar o pedido.</span>
                                                </Grid>
                                            </Grid>
                                            



                                        </>
                                    )
                                })}


                                
                            </Box>
                        </Modal>
                    </Grid>
                    <TableContainer component={Paper} style={{marginBottom: '5vh'}}>
                        <Table sx={{ width: "100%" }} aria-label="customized table" >

                            <TableBody >
                                {!dataProducts || dataProducts.length == 0 ? (
                                    <Typography variant="h5" textAlign={"center"} style={{ width: '100vw' }}>
                                        Sem produtos no carrinho
                                    </Typography>
                                ) : (
                                    <TableRow style={{ height: "2em", backgroundColor: "grey" }}>
                                        <StyledTableCell
                                            style={{ fontSize: "1em", fontWeight: "bold" }}
                                            align="center"
                                        >
                                            Produto
                                        </StyledTableCell>
                                        <StyledTableCell
                                            style={{ fontSize: "1em", fontWeight: "bold" }}
                                            align="center"
                                        >
                                            Valor
                                        </StyledTableCell>
                                        <StyledTableCell
                                            style={{ fontSize: "1em", fontWeight: "bold" }}
                                            align="center"
                                        >
                                            Quantidade
                                        </StyledTableCell>
                                    </TableRow>
                                )}
                                {dataProducts &&
                                    dataProducts &&
                                    dataProducts.map((row: IProdutos) => (

                                        <TableRow style={{ height: "6em" }} key={row.nome} >
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
                                            <StyledTableCell
                                                align="center"
                                                style={{ fontWeight: "bold", fontSize: "1.2em" }}
                                            >
                                                {row.valor}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                style={{ fontWeight: "bold", fontSize: "1.2em", display: 'flex', alignItems: "center", justifyContent: "center", paddingLeft: 0, paddingRight: 0 }}
                                            >
                                                <StyledTableCellFunc
                                                    align="center"
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "1.4em",
                                                        padding: 'auto',
                                                        color: 'red'
                                                    }}
                                                    onClick={() => setQuantidade(row.id_produto, '-')}
                                                >
                                                    -
                                                </StyledTableCellFunc>
                                                <StyledTableCell
                                                    align="center"
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "1.2em",
                                                        padding: 0,
                                                    }}
                                                >
                                                    {row.quantidade}
                                                </StyledTableCell>
                                                <StyledTableCellFunc
                                                    align="center"
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "1.4em",
                                                        padding: 'auto',
                                                        color: 'green'
                                                    }}
                                                    onClick={() => setQuantidade(row.id_produto, '+')}
                                                >
                                                    +
                                                </StyledTableCellFunc>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container style={{ position: 'fixed', bottom: 0, backgroundColor: '#ff6acd', height: '5vh'}}>
                        <Grid item xs={12} style={{backgroundColor: '#ff6acd',padding: 5}}>
                            <Typography variant="h5">Total do pedido: {total} R$</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
