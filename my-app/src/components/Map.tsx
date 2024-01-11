import React from "react"
import {Box} from "@chakra-ui/react"

interface MapProps {
    width: string;
    height: string;
}

const Map: React.FC<MapProps> = ({width, height}) => {
    return(
        <Box style={{ width }} maxWidth={"100vh"}>
            <Box 
            as="iframe"
            width="100%"
            height={height}
            src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=128%20Riccarton%20Road+(Aurora%20Clothing)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">

            </Box>

        </Box>
        
    )
}

export default Map;