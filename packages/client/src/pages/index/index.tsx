import React from "react";
import { IndexBanner } from "./components/Banner";
import { FindCoworkingSpace } from "./containers/FindCoworkingSpace";

export const IndexPage = () => {
  return (
    <>
      <div className="mb-4">
        <IndexBanner />
      </div>
      <div className="mx-4">
        <FindCoworkingSpace />
      </div>
    </>
  );
};
