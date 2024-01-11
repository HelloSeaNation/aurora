import {
    Box,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import React, {useState} from 'react'
import Map from '../components/Map'

export const ContactUs = () =>{

    const textStyles = {
        fontFamily: "Koulen"
    }

    const inputStyle = {
        width: '100%',
        height: '35px',
        marginBottom: 0,
        border:"1px solid #D1D1D1",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        verticalAlign: "top"
    };

    const [selectedOption, setSelectedOption] = useState('');
    const handleMenuClick = (value: string) => {
        setSelectedOption(value);
    }

    const MenuButtonStyle = {
        fontFamily: "Koulen",
        fontSize: "18px",
        border:"1px solid #D1D1D1",
        backgroundColor: "white",
        cursor: "pointer",
      };

    return(
        <Box style={textStyles}>
            <Box textAlign="center">
                <h1>Contact Us</h1>
            </Box>

            <Box textAlign="center" style={{ width: 500, margin: '0 auto' }}>
                <Box as="h3" style={{ textAlign: 'left', marginBottom: 0 }}>Name</Box>
                <Input style={inputStyle}></Input>

                <Box as="h3" style={{ textAlign: 'left', marginBottom: 0 }}>Email</Box>
                <Input style={inputStyle}></Input>

                <Box as="h3" style={{ textAlign: 'left', marginBottom: 0 }}>Question type</Box>
                <Menu>
                    <MenuButton as="button" style={{...inputStyle, backgroundColor: "white", textAlign: 'left', cursor: "pointer"}}>
                        <Box>{selectedOption}</Box>
                    </MenuButton>
                    
                    <MenuList>
                        <MenuItem style={MenuButtonStyle} onClick={() => handleMenuClick('My order never arrived')}>My order never arrived</MenuItem>
                        <MenuItem style={MenuButtonStyle} onClick={() => handleMenuClick('Problem with customer service')}>Problem with customer service</MenuItem>
                        <MenuItem style={MenuButtonStyle} onClick={() => handleMenuClick('Issue with product quality')}>Issue with product quality</MenuItem>
                        <MenuItem style={MenuButtonStyle} onClick={() => handleMenuClick('Request refund/exchange')}>Request refund/exchange</MenuItem>
                        <MenuItem style={MenuButtonStyle} onClick={() => handleMenuClick('Other')}>Other</MenuItem>
                    </MenuList>
                    
                </Menu>

                <Box as="h3" style={{ textAlign: 'left', marginBottom: 0 }}>Write your question</Box>
                <Input style={{...inputStyle, height: "125px"}}></Input>

                <Box 
                as="button" 
                style={{backgroundColor: "#E8BCBC", 
                color: "white", 
                border: "0", 
                padding: "10px 30px", 
                fontSize: "20px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                fontFamily: "Koulen",
                marginTop: "20px",
                cursor: "pointer"}}>Send</Box>
            </Box>

            <Box textAlign="center">
                <h1>Or</h1>
            </Box>

            <Box display="flex" padding="10px" align-items="center" justify-content="space-between" margin="0 50px">
                <Map width="50%" height="450"/>
                <Box display="grid" margin="115px">
                    <Box as="h3">Phone: +64 27 783 7824</Box>
                    <Box as="h3">E-mail: aurora@gmail.com</Box>
                    <Box as="h3">128 Riccarton Road, Riccarton, Christchurch 8041</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ContactUs;
