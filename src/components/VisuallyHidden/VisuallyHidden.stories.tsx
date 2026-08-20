import type { ComponentProps } from "react";
import VisuallyHidden from "./VisuallyHidden";

const meta = {
  component: VisuallyHidden,
  argTypes: {
  },
};

export default meta;

export const Normal = {
  render: (args: ComponentProps<typeof VisuallyHidden>) => (
    <VisuallyHidden {...args}></VisuallyHidden>
  ),
};
