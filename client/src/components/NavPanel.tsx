import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Color, Image } from "../helper";
import { navText } from "../helper/Font";

interface BarStyle {
  prevMenuPosition: number;
  menuPosition: number;
}

interface NavStyle {
  auth: boolean;
}

interface ItemStyle {
  index: number;
}

interface LinkStyle {
  index: number;
  menuposition: number;
}

const rotate = (prevMenu: number, currentMenu: number) => keyframes`
from {
  transform: translateY(${prevMenu * 184.67}px);
}

to {
  transform: translateY(${currentMenu * 184.67}px);
}
`;

const Logo = styled.img`
  margin-top: 32px;
  margin-left: 19%;
`;
const RedBar = styled.div<BarStyle>`
  display: inline-block;
  animation: ${(props) =>
    css`
      ${rotate(props.prevMenuPosition, props.menuPosition)} 0.4s ease-out
    `};
  animation-fill-mode: forwards;
  width: 8px;
  height: 88px;
  background-color: ${Color.red};
  box-shadow: 0px -2.66667px 16px #bd1e00;
  position: absolute;
  right: 0px;
  top: 229px;
`;
const NavWrapper = styled.nav<NavStyle>`
  max-width: 253px;
  width: 25%;
  height: 100vh;
  background: ${Color.navBackground};
  display: block;

  @media (max-width: 768px) {
    display: ${(props) => (props.auth ? "block" : "none")};
  }
`;
const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
  position: relative;
`;
const ListItem = styled.li<ItemStyle>`
  margin-top: ${(props) => (props.index === 0 ? "265px" : "134px")};
`;
const NavLink = styled(Link)<LinkStyle>`
  ${navText}
  color: ${(props) =>
    props.index === props.menuposition ? Color.white : Color.greyNav};
  text-decoration: none;
  text-transform: uppercase;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 48px;
`;

const NavPanel: React.FC<{ auth: boolean }> = (props) => {
  const { auth } = props;
  const [menuPosition, setMenuPosition] = useState(0);
  const [prevMenuPosition, setPrevMenuPosition] = useState(0);

  const listItemHandler = (index: number) => {
    setPrevMenuPosition(menuPosition);
    setMenuPosition(index);
  };

  const navigationTopics = ["home"];

  return (
    <NavWrapper auth={auth}>
      <Logo src={Image.mainLogoSm} alt="Logo" />
      <ListWrapper>
        {navigationTopics.map((topic, index) => {
          return (
            <ListItem key={`key-${topic}`} index={index}>
              <NavLink
                onClick={() => listItemHandler(index)}
                index={index}
                menuposition={menuPosition}
                to={topic === "home" ? "/" : `/${topic}`}
              >
                {topic}
              </NavLink>
            </ListItem>
          );
        })}
        <RedBar
          prevMenuPosition={prevMenuPosition}
          menuPosition={menuPosition}
        />
      </ListWrapper>
    </NavWrapper>
  );
};

export default NavPanel;
