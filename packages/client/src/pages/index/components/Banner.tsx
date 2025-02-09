import React from "react";
import { HeroBanner, HighContrastText } from "../../../components";

export const IndexBanner = () => (
  <HeroBanner
    Header={
      <HighContrastText
        classNames="mt-16 ml-8 md:mt-16 md:ml-32 mr-8 text-xl"
        text="Don't disrupt your flow."
      />
    }
    Subheader={
      <HighContrastText
        classNames="mt-2 ml-8 md:mt-2 md:ml-32 mr-8 text-lg"
        text="Join thousands of other remote workers, and find the top coworking spots near you."
      />
    }
  />
);
