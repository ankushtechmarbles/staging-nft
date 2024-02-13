import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";

const CreationLayout = ({ children }) => {
    return (
        <Grid
            userSelect={"none"}
            overflow={"hidden"}
            templateAreas={`
            "header"
            "main"
            "footer"
            `}
            h={"100vh"}
            gridTemplateRows={"0.25fr 1.5fr 0.25fr"}
            backgroundImage={"/image/hdr/background-image.jpg"}
        >
            <GridItem area={"header"} zIndex={20}>
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
