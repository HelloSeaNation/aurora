import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import Map from "../components/Map";

export const ContactUs = () => {
  const textStyles = {
    fontFamily: "Koulen",
  };

  const inputStyle = {
    width: "100%",
    height: "35px",
    marginBottom: 0,
    border: "1px solid #D1D1D1",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    verticalAlign: "top",
  };

  const MenuButtonStyle = {
    fontFamily: "Koulen",
    fontSize: "18px",
    border: "1px solid #D1D1D1",
    backgroundColor: "white",
    cursor: "pointer",
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleMenuClick = (value: string) => {
    setSelectedOption(value);
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendClick = async () => {
    // Gather user input data using refs
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const questionType = selectedOption;
    const message = messageRef.current?.value || "";
    // Make a POST request to the backend API
    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, questionType, message }),
      });

      const data = await response.json();

      if (data.success) {
        // Handle success (e.g., show a success message to the user)
        setIsEmailSent(true);
        setIsModalOpen(true);
        console.log("Email sent successfully");
      } else {
        // Handle failure (e.g., show an error message to the user)
        console.error("Failed to send email:", data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleCloseModal = () => {
    // Reset states for the next interaction
    setIsModalOpen(false);
    setIsEmailSent(false);
  };

  return (
    <Box style={textStyles}>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isCentered
        size={{ width: "600px", height: "400px" }}
      >
        <ModalOverlay backgroundColor="rgba(0, 0, 0, 0.5)" />
        <ModalContent
          textAlign="center"
          position={"relative"}
          top={"200px"}
          left={"25%"}
          backgroundColor="white"
          borderRadius="20px"
          width="50%"
          height="230px"
          fontFamily={"Koulen"}
        >
          <ModalHeader fontSize={"25px"} paddingTop={"20px"}>Thank you</ModalHeader>
          <ModalCloseButton
            style={{
              width: "23px",
              height: "23px",
              color: "white",
              backgroundColor: "#E8BCBC",
              border: "none",
              borderRadius: "5px",
              top: "10px",
              right: "15px",
              position: "absolute",
            }}
          />

          <ModalBody fontSize={"20px"} marginTop={"20px"} marginBottom={"20px"}>
            Your question has been sent successfully. We will contacting you
            within 24 hours.
          </ModalBody>
          <Box width={"100%"}>
            <Box
              as="button"
              onClick={handleCloseModal}
              style={{
                backgroundColor: "#E8BCBC",
                color: "white",
                border: "0",
                padding: "10px 30px",
                fontSize: "20px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                fontFamily: "Koulen",
                cursor: "pointer",
              }}
            >
              Close
            </Box>
          </Box>
        </ModalContent>
      </Modal>
      <Box textAlign="center">
        <h1>Contact Us</h1>
      </Box>

      <Box textAlign="center" style={{ width: 500, margin: "0 auto" }}>
        <Box as="h3" style={{ textAlign: "left", marginBottom: 0 }}>
          Name
        </Box>
        <Input ref={nameRef} style={inputStyle}></Input>

        <Box as="h3" style={{ textAlign: "left", marginBottom: 0 }}>
          Email
        </Box>
        <Input ref={emailRef} style={inputStyle}></Input>

        <Box as="h3" style={{ textAlign: "left", marginBottom: 0 }}>
          Question type
        </Box>
        <Menu>
          <MenuButton
            as="button"
            style={{
              ...inputStyle,
              backgroundColor: "white",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <Box>{selectedOption}</Box>
          </MenuButton>

          <MenuList>
            <MenuItem
              style={MenuButtonStyle}
              onClick={() => handleMenuClick("My order never arrived")}
            >
              My order never arrived
            </MenuItem>
            <MenuItem
              style={MenuButtonStyle}
              onClick={() => handleMenuClick("Problem with customer service")}
            >
              Problem with customer service
            </MenuItem>
            <MenuItem
              style={MenuButtonStyle}
              onClick={() => handleMenuClick("Issue with product quality")}
            >
              Issue with product quality
            </MenuItem>
            <MenuItem
              style={MenuButtonStyle}
              onClick={() => handleMenuClick("Request refund/exchange")}
            >
              Request refund/exchange
            </MenuItem>
            <MenuItem
              style={MenuButtonStyle}
              onClick={() => handleMenuClick("Other")}
            >
              Other
            </MenuItem>
          </MenuList>
        </Menu>

        <Box as="h3" style={{ textAlign: "left", marginBottom: 0 }}>
          Write your question
        </Box>
        <Input
          ref={messageRef}
          style={{ ...inputStyle, height: "125px" }}
        ></Input>
        <Box
          as="button"
          onClick={handleSendClick}
          style={{
            backgroundColor: "#E8BCBC",
            color: "white",
            border: "0",
            padding: "10px 30px",
            fontSize: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            fontFamily: "Koulen",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Send
        </Box>
      </Box>

      <Box textAlign="center">
        <h1>Or</h1>
      </Box>

      <Box
        display="flex"
        padding="10px"
        align-items="center"
        justify-content="space-between"
        margin="0 50px"
      >
        <Map width="50%" height="450" />
        <Box display="grid" margin="115px">
          <Box as="h3">Phone: +64 27 783 7824</Box>
          <Box as="h3">E-mail: aurora@gmail.com</Box>
          <Box as="h3">128 Riccarton Road, Riccarton, Christchurch 8041</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
