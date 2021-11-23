import styled from "styled-components";
import { Color, Image } from "../helper";
import { navText } from "../helper/Font";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(245, 245, 245);
  display: none;
  z-index: 0;
  padding: 0px 15%;

  @media (max-width: 768px) {
    display: flex;
    z-index: 99;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const Logo = styled.div`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Title = styled.div`
  ${navText}
  font-size: 40px;
  color: ${Color.navBackground};
`;

const SubTitle = styled.div`
  color: ${Color.navBackground};
  text-align: center;
  margin-top: 3%;
`;

export default function MobilePopup() {
  return (
    <Wrapper>
      <Logo>
        <img src={Image.mainLogoSm} alt="Logo" />
      </Logo>

      <Title>Sorry</Title>
      <SubTitle>
        This demo is currently unavailable for mobile and tablet users.
      </SubTitle>
    </Wrapper>
  );
}
