import React from "react";
import { IndexBanner } from "./components/Banner";
import { FindCoworkingSpace } from "./containers/FindCoworkingSpace";

const IndexPage = (): React.JSX.Element => {
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

export default IndexPage;
