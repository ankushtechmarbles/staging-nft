import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import RpmAvatar from "./Partials/RPMAvatar";
import WelcomePanel from "./Partials/WelcomePanel";

const Index = () => {
    return (
        <Grid
            templateColumns={"repeat(2, 1fr)"}
            gap={6}
            backgroundImage={"/image/auth_background.png"}
        >
            <GridItem>{/*<RpmAvatar />*/}</GridItem>
            <GridItem>
                <WelcomePanel />
            </GridItem>
        </Grid>
    );
};

export default Index;
