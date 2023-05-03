import React from "react";
import styled from "styled-components";
import {platformColors} from "../constants/colors";

type IndicatorProps = {
    position: string;
};

const IndicatorContainer = styled.div<IndicatorProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === "left" ? "left: 10%;" : "right: 10%;")}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${platformColors.orange};
`;

const Indicator: React.FC<IndicatorProps> = ({ position }) => {
    return <IndicatorContainer position={position} />;
};

export default Indicator;
