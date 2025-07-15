import React from "react";
import "./Featured.css";
import { BiBorderRadius } from "react-icons/bi";

const Featured = () => {
  return (
    <div id="feature-wrap">
      <FeatureTile gridArea="a">
        <img className="image-cover" src={"/mock_winter.png"}></img>
        <div className="overlay">
          <h1>Winter is coming</h1>
          <p>
            Gear up in time with our season opening offers and book your skiing
            vacation right here.
          </p>
        </div>
      </FeatureTile>
      <FeatureTile gridArea="b">
        <img className="image-cover" src={"/mock_tent.png"}></img>
        <div className="ad-banner1">
          <h1>Flash-Sale</h1>
          <p>Camping season is over! Save up to 60% on tents this fall.</p>
          <small>Offers valid until 31st of october.</small>
        </div>
      </FeatureTile>
      <FeatureTile gridArea="c">
        <img className="image-cover" src={"/mock_vanlife.png"}></img>
      </FeatureTile>
      <FeatureTile gridArea="d">
        <img className="image-cover" src={"/mock_cooking.png"} />
      </FeatureTile>
      <FeatureTile gridArea="e">
        <img src={"/logo-brown.png"}></img>
        <div className="ad-banner2">
          <h1>SKOGSRÄVEN SALE</h1>
          <small>Look out for special offers on our house brands.</small>
        </div>
      </FeatureTile>
    </div>
  );
};

export default Featured;

type FeatureTileProps = {
  height?: number;
  width?: number;
  gridArea: string;
  children: any;
};

const FeatureTile = ({
  height,
  width,
  gridArea,
  children,
}: FeatureTileProps) => {
  const tileStyle = {
    gridArea,
    border: "lightgrey solid 1px",
    borderRadius: "8px",
    display: "flex",
    overflow: "hidden",
    position: "relative",
  };

  return <div style={tileStyle}>{children}</div>;
};
