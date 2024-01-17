import React, { useState } from "react";
import { Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const categoryStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  justifyItems: "center",
  margin: "1% 15% 1% 15%",
};

const MenuButtonStyle = {
  fontFamily: "Koulen",
  fontSize: "18px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
};

const MenuListStyle = {
  backgroundColor: "#FFFFFF",
  width: "15vh",
  marginTop: "-8px",
  padding: "10px 0 5px 10px",
  fontFamily: "Koulen",
  fontSize: "18px",
  boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.25)",
};

const MenuItemStyle = {
  marginBottom: "10px",
};

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState({
    new: false,
    clothing: false,
    accessories: false,
    swim: false,
    sale: false,
    contact: false,
  });

  const handleMenuOpen = (menu: string) => {
    setIsMenuOpen((prevState) => ({ ...prevState, [menu]: true }));
  };

  const handleMenuClose = (menu: string) => {
    setIsMenuOpen((prevState) => ({ ...prevState, [menu]: false }));
  };

  return (
    <Box style={categoryStyles}>
      <Menu isOpen={isMenuOpen.new} onClose={() => handleMenuClose("new")}>
        <MenuButton style={MenuButtonStyle}>New</MenuButton>
      </Menu>

      <Menu isOpen={isMenuOpen.clothing}>
        <MenuButton
          style={MenuButtonStyle}
          onMouseEnter={() => handleMenuOpen("clothing")}
          onMouseLeave={() => handleMenuClose("clothing")}
        >
          Clothing
        </MenuButton>
        <MenuList
          onMouseEnter={() => handleMenuOpen("clothing")}
          onMouseLeave={() => handleMenuClose("clothing")}
          style={MenuListStyle}
          zIndex={"1"}
        >
          <MenuItem as="a" href="./#/tops" style={MenuItemStyle}>
            Tops
          </MenuItem>
          <MenuItem as="a" href="./#/pants" style={MenuItemStyle}>
            Pants
          </MenuItem>
          <MenuItem as="a" href="./#/dresses" style={MenuItemStyle}>
            Dresses
          </MenuItem>
        </MenuList>
      </Menu>

      <Menu isOpen={isMenuOpen.new} onClose={() => handleMenuClose("new")}>
        <MenuButton style={MenuButtonStyle}>Accessories</MenuButton>
      </Menu>

      <Menu isOpen={isMenuOpen.new} onClose={() => handleMenuClose("new")}>
        <MenuButton style={MenuButtonStyle}>Swim</MenuButton>
      </Menu>

      <Menu isOpen={isMenuOpen.new} onClose={() => handleMenuClose("new")}>
        <MenuButton style={MenuButtonStyle}>Sale</MenuButton>
      </Menu>

      <Menu
        isOpen={isMenuOpen.contact}
        onClose={() => handleMenuClose("contact")}
      >
        <MenuButton
          style={MenuButtonStyle}
          onMouseEnter={() => handleMenuOpen("contact")}
          onMouseLeave={() => handleMenuClose("contact")}
        >
          Contact us
        </MenuButton>
        <MenuList
          onMouseEnter={() => handleMenuOpen("contact")}
          onMouseLeave={() => handleMenuClose("contact")}
          style={MenuListStyle}
          zIndex={"1"}
        >
          <MenuItem as="a" href="./#/faqs" style={MenuItemStyle}>
            FAQs
          </MenuItem>
          <MenuItem as="a" href="./#/contact-us" style={MenuItemStyle}>
            Contact us
          </MenuItem>
          <MenuItem as="a" href="./#/wishlist" style={MenuItemStyle}>
            Wishlist
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default NavigationBar;
