import React, {useState} from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {platformColors} from "../constants/colors";
import {isNameFieldInvalid} from "../utils/gameUtils";
import {InputProps} from "../../types";
import {createUser} from "../services/api";

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 500px;
  line-height: 24px;
`
const Intro = styled.div`
    align-items: center;
`
const Input = styled.input.attrs<InputProps>((props) => ({
    $error: props.$error ?? false,
}))<InputProps>`
  border: 1px solid ${props => (props.$error ? platformColors.error : platformColors.lightGrey)};
  border-radius: 3px;
  height: 2.8rem;
  padding-left: 16px;
  outline: none;
  width: 500px;
`;

const Instructions = styled.div`
  margin: 30px 0 16px 0;
`
const ErrorMessage = styled.div`
  color: ${platformColors.error};
  font-size: 12px;
  padding: 10px 0;
`;

const StartButton = styled.button`
  background-color: ${props => (props.disabled ? platformColors.lightGrey : platformColors.mint)};
  cursor: ${props => (!props.disabled && 'pointer')};
  border: 1px solid ${platformColors.mint};
  border-radius: 6px;
  padding: 30px;
  margin-top: 40px;
  font-size: 2rem;
  color: ${platformColors.darkGrey};
  width: 520px;
`
interface StartPageProps {
    setGameAllowed: (result: boolean) => void;
}
const StartPage: React.FC<StartPageProps> = ({setGameAllowed}) => {
    const [userName, setUserName] = useState<string>("")
    const navigate = useNavigate();
    const onInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        console.log("typing name==", e.target.value)
        setUserName(e.target.value)
    }

    const onGameStart = async () => {
        console.log("clicked start game")
        try {
            const response = await createUser(userName?.trim());
            console.log("Create successful:", response);
            setGameAllowed(true)
            navigate("/game", {state: {userDate: response}});
        } catch (error) {
            console.error("Create failed:", error);
        }
    };


    const isNameInvalid = isNameFieldInvalid(userName)
    return (
        <StartContainer>
            <Intro>
                <h2 style = {{color: platformColors.darkGrey}}> Game Intro</h2>
                In the game, a shape will be shown to you in a random location on the screen (left/right),
                you will have 1 second to react and enter on which side of the screen the shape was displayed.
                Press:
                <p>● 'a' key if the indicator is on the left side</p>
                <p>● 'l' key if the indicator is on the right side</p>
            </Intro>
            <Instructions>
                <p>Enter your name, to start the game.</p>
                <p>Then press the start button.</p>
            </Instructions>
            <Input
                $error={isNameInvalid}
                type="text"
                value={userName}
                onChange={onInputChange}
                placeholder={'Your user name here'}
            />
            {isNameInvalid && (
                <ErrorMessage>
                    Valid name may contain lower and upper cases letters, numbers and dash (-) and underscore (_), no spaces and is not longer then 60 characters.
                </ErrorMessage>)
            }
            <StartButton onClick={onGameStart} disabled={isNameInvalid}>
                START GAME
            </StartButton>
        </StartContainer>
    );
}

export default StartPage;