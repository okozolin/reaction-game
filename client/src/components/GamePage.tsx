import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import WaitingState from "./WaitingState";
import Indicator from "./Indicator";


const GamePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const GamePage: React.FC = () => {
    const [waiting, setWaiting] = useState<boolean>(true);
    const [position, setPosition] = useState<"left" | "right">("left");
    const [feedback, setFeedback] = useState<string>("");

    useEffect(() => {
        if (!waiting) {
            const timeout = setTimeout(() => {
                setFeedback("");
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [waiting]);
    const handleKeyDown = (event: KeyboardEvent) => {
        if (waiting) {
            setFeedback("Too Soon");
        } else {
            if ((event.key === "a" && position === "left") ||
                (event.key === "l" && position === "right")) {
                setFeedback("Success");
            } else {
                setFeedback("Wrong Key");
            }
            // setWaiting(true);
            restartGame();
        }
    };

    const restartGame = () => {
        setWaiting(true);
        setTimeout(() => {
            setPosition(Math.random() < 0.5 ? "left" : "right");
            setWaiting(false);
            setFeedback('');
            setTimeout(() => {
                if (waiting) {
                    setFeedback('Too late!');
                    restartGame();
                }
            }, 1000);
        }, Math.floor(Math.random() * 3000) + 2000);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [waiting, position]);
    return (
        <GamePageWrapper>
            {!waiting && <Indicator position={position} />}
            {/*{feedback && <Feedback success={feedback === "Success"}>{feedback}</Feedback>}*/}
            {waiting && <WaitingState
                feedback={"orit feedback"}
                onCountdownComplete={(result) => setWaiting(result)}
                // waiting={waiting} setWaiting={setWaiting}
            />}
        </GamePageWrapper>
    );
}

export default GamePage;