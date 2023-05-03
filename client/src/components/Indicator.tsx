import React from "react";
import styled from "styled-components";

type IndicatorProps = {
    position: "left" | "right";
};

const IndicatorContainer = styled.div<IndicatorProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === "left" ? "left: 10%;" : "right: 10%;")}
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
`;

const Indicator: React.FC<IndicatorProps> = ({ position }) => {
    return <IndicatorContainer position={position} />;
};

export default Indicator;
