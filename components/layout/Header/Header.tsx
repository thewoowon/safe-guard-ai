import { MenuIcon } from "@/components/svg";
import Logo from "@/components/svg/Logo";
import styled from "@emotion/styled";

const Header = () => {
  return (
    <Container>
      <Logo fontColor="white" />
      <MenuIcon />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding-right: 16px;
  padding-left: 16px;
  height: 57px;
  background-color: transparent;
`;
