import React from 'react';
import styled from "styled-components";
import {MdFace} from "react-icons/md";
import Start from "./components/start";
import {platformColors} from "./constants/colors";

const MyLogo = styled.div`
  color: ${platformColors.lightPink}
`;
const Header = styled.div`
  text-align: center;
  font-weight: 600;
  line-height: 1.1;
  color: #232333;
  font-size: 30px;
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
function App() {
  return (
    <AppContainer>
        <Header>
            <MyLogo>
                <MdFace color={platformColors.lightPink}/>
                oritkozolin 2023
            </MyLogo>
        </Header>
        <Start />
    </AppContainer>
  );
}

export default App;
