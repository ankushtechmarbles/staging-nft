import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";

const CreationLayout = ({ children }) => {
    return (
        <Grid
            templateAreas={`
            "header"
            "main"
            "footer"
            `}
            h={"100vh"}
            w={"100vw"}
            gridTemplateRows={"0.25fr 1.5fr 0.25fr"}
            backgroundImage={"/image/auth_background.png"}
        >
            <GridItem area={"header"}>
                <Header />
            </GridItem>
            <GridItem
                area={"main"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {children}
            </GridItem>
            <GridItem area={"footer"}>
                <Footer />
            </GridItem>
        </Grid>
    );
};

export default CreationLayout;
