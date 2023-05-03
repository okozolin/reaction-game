import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import WaitingState from "./WaitingState";
import Indicator from "./Indicator";
import {updateUser} from "../services/api";
import { useLocation } from "react-router-dom"

import {prompts} from "../constants/prompts";
const GamePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const GamePage: React.FC = () => {
    const [waiting, setWaiting] = useState<boolean>(true);
    const [position, setPosition] = useState<string>("left");
    const [feedback, setFeedback] = useState<string>("");
    const location = useLocation()
    const userData = location.state.userDate
    const feedbackRef = useRef<string>("")

    useEffect(() => {
        if (!waiting) {
            const timeout = setTimeout(() => {
                setFeedback(feedbackRef.current = prompts.game.tooLate);
                restartGame()
            }, 1000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [waiting]);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [waiting, position]);

    const onKeyDown = async (event: KeyboardEvent) => {
        if (waiting) {
            setFeedback(feedbackRef.current = prompts.game.tooSoon);
        } else {
            if ((event.key === "a" && position === prompts.game.left) ||
                (event.key === "l" && position === prompts.game.right)) {
                setFeedback(feedbackRef.current = prompts.game.success);
            } else {
                setFeedback(feedbackRef.current = prompts.game.wrongKey);
            }
            try {
                await restartGame();
            } catch (error) {
                console.error('Error restarting game:', error);
            }
        }
    };

    const restartGame = useCallback(async () => {
        setWaiting(true);
        setPosition(Math.random() < 0.5 ? prompts.game.left : prompts.game.right);
        if (feedbackRef.current === prompts.game.success) {
            try {
                await updateUser(userData.id, 1);
            } catch (error) {
                console.error("Update failed:", error);
            }
        }
    },[feedbackRef])

    const onCountdownComplete = (result : boolean) => {
        setWaiting(result)
    }
    return (
        <GamePageWrapper>
            {!waiting && <Indicator position={position} />}
            {waiting && <WaitingState
                feedback={feedback}
                onCountdownComplete={onCountdownComplete}
            />}
        </GamePageWrapper>
    );
}

export default GamePage;