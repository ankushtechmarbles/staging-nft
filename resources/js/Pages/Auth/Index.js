import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import RpmAvatar from "./Partials/RPMAvatar";
import WelcomePanel from "./Partials/WelcomePanel";

const Index = () => {
    return (
        <Grid templateColumns={"repeat(2, 1fr)"} gap={6}>
            <GridItem>
                <RpmAvatar />
            </GridItem>
            <GridItem zIndex={20}>
                <WelcomePanel />
            </GridItem>
        </Grid>
    );
};

export default Index;
