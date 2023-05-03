import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {InputProps} from "../../types";

interface StateProps {
    feedback: string;
    onCountdownComplete: (result: boolean) => void;
}
interface FeedbackProps {
    feedback: string;
}

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
  color: ${({ feedback }) => (feedback === "Success" ? "green" : "red")};
`;

const WaitingState = ({ feedback, onCountdownComplete }: StateProps) => {
    const [countdown, setCountdown] = useState(5);

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
        <div>
            <CountdownText>{countdown}</CountdownText>
            <FeedbackText feedback={feedback}>{feedback}</FeedbackText>
        </div>
    );
};

export default WaitingState;
