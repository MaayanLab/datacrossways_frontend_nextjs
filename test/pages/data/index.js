import React from "react";

import Navigation from "../../components/Navigation";
import FeatureTable from "../../components/FeatureTable";

export default function Data() {
  return (
    <>
      <div>
        <Navigation />
        <h1>Data Collections</h1>
        This is where all the different data collections can be viewed,
        depending on visibility of the user.
      </div>

      <FeatureTable />
    </>
  );
}
