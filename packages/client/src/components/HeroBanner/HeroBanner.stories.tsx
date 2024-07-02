import React from "react";
import HighContrastText from "../HighContrastText/HighContrastText";
import HeroBanner from "./HeroBanner";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Example/HeroBanner",
  component: HeroBanner,
  render: ({ ...args }) => (
    <HeroBanner
      backgroundImage={args.backgroundImage}
      Header={<HighContrastText text="AYAYAY" classNames="mt-32 ml-32" />}
      Subheader={<HighContrastText text="world" classNames="mt-4 ml-36" />}
      {...args}
    />
  ),
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    backgroundImage: "./src/assets/coworking_banner.png",
  },
};
