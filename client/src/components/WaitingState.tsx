import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {FeedbackProps, StateProps} from "../../types";
import {prompts} from "../constants/prompts";


const CountdownText = styled.h2`
  margin-top: 0;
  font-size: 5rem;
`;
const FeedbackText = styled.h3.attrs<FeedbackProps>((props) => ({
    feedback: props.feedback,
}))<FeedbackProps>`
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: ${({ feedback }) => (feedback === prompts.game.success ? "green" : "red")};
`;
const WaitingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const WaitingState = ({ feedback, onCountdownComplete }: StateProps) => {
    const [countdown, setCountdown] = useState(Math.floor(Math.random() * (3+1)) + 2);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            onCountdownComplete(false);
        }
    }, [countdown, onCountdownComplete]);

    return (
        <WaitingWrapper>
            <CountdownText>{countdown}</CountdownText>
            <FeedbackText feedback={feedback}>{feedback}</FeedbackText>
        </WaitingWrapper>
    );
};

export default WaitingState;
