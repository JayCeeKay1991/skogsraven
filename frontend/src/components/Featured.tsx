import React, { ReactChildren, ReactElement } from "react";
import "./Featured.css";

const Featured = () => {
  return (
    <div id="feature-wrap">
      <FeatureTile gridArea="a" height={600}>
        <img src={"/mock-winter"}></img>
      </FeatureTile>
      <FeatureTile gridArea="b">
        <img src={"/mock-tent"}></img>
      </FeatureTile>
      <FeatureTile gridArea="c">
        <img src={"/mock-sleepingbag"}></img>
      </FeatureTile>
      <FeatureTile gridArea="d">
        <img src={"/mock-vanlife"}></img>
      </FeatureTile>
      <FeatureTile gridArea="e">
        <img src={"/mock-cooking"}></img>
      </FeatureTile>
    </div>
  );
};

export default Featured;

type FeatureTileProps = {
  height?: number;
  width?: number;
  gridArea: string;
  children: ReactElement;
};

const FeatureTile = ({ height, gridArea }: FeatureTileProps) => {
  const tileStyle = {
    gridArea,
    height,
    border: "black solid 1px",
  };

  return (
    <div style={tileStyle}>
      <p>Feature</p>
    </div>
  );
};
