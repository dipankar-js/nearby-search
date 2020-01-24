import React from "react";
import { css } from "@emotion/core";

import DotLoader from "react-spinners/DotLoader";

export default function Loader() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="Glimm-Loader">
      <DotLoader
        css={override}
        size={80}
        //size={"150px"} this also works
        color={"#e92d6c"}
        loading={true}
      />
    </div>
  );
}
