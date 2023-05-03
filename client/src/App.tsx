import React, {useState} from 'react';
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import {MdFace} from "react-icons/md";
import StartPage from "./components/StartPage";
import {platformColors} from "./constants/colors";
import GamePage from "./components/GamePage";
import NotFound from "./components/NotFound";

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
    const [gameAllowed, setGameAllowed] = useState(false)
  return (
      <AppContainer>
          <Header>
              <MyLogo>
                  <MdFace color={platformColors.lightPink} />
                  oritkozolin 2023
              </MyLogo>
          </Header>
          <Routes>
              <Route
                path="/"
                element={<StartPage setGameAllowed={setGameAllowed} />} />
              {gameAllowed && <Route path="/game" element={<GamePage/>}/>}
              <Route path="*" element={<NotFound />} />
          </Routes>
      </AppContainer>
  );
}

export default App;
