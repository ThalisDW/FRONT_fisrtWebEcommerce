import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";
// import { useMediaQuery } from "@mui/material";



interface IMobileMenu {
  link1: string;
  link2: string;
  link3: string;
  pageAtual: string;
}

export const MobileMenu = (props: IMobileMenu) => {
  // const isXsScreen = useMediaQuery("(max-width:600px)");
  const isPage = props.pageAtual
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} style={{ backgroundColor: "#d81b60" }}>
          <Grid item xs={1.5}></Grid>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "4em",
              borderRadius: 50,
              backgroundColor: isPage === 'home'? 'rgba(0, 0, 0, 0.15)': ''
            }}
            xs={3}
          >
            <Link
              to={props.link1}
              style={{ textDecoration: "none", color: "inherit" }}
            >
               <CardActionArea style={{ height: "100%", width: "100%" }}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "4em",
                    borderRadius: 10,
                  }}
                  xs={12}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: 0,
                      height: "0.5em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ContentPasteIcon style={{ margin: 0 }} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      height: "0.1em",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle2">Categorias</Typography>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Link>
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "4em",
              borderRadius: 50,
              backgroundColor: isPage === 'hours'? 'rgba(0, 0, 0, 0.15)': ''
            }}
            xs={3}
          >
            <Link
              to={props.link2}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardActionArea style={{ height: "100%", width: "100%" }}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "4em",
                    borderRadius: 10,
                  }}
                  xs={12}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: 0,
                      height: "0.5em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <HistoryToggleOffIcon style={{ margin: 0 }} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      height: "0.1em",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle2">Horários</Typography>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Link>
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "4em",
              borderRadius: 50,
              backgroundColor: isPage === 'informations'? 'rgba(0, 0, 0, 0.15)': ''
            }}
            xs={3}
          >
            <Link
              to={props.link3}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardActionArea style={{ height: "100%", width: "100%" }}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "4em",
                    borderRadius: 10,
                  }}
                  xs={12}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: 0,
                      height: "0.5em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <InfoIcon style={{ margin: 0 }} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      height: "0.1em",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle2">Informações</Typography>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Link>
          </Grid>

          <Grid item xs={1.5}></Grid>
        </Grid>
      </Box>
    </>
  );
};
