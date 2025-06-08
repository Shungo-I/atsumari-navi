import type { Meta, StoryObj } from "@storybook/react";
import { NavLink } from "./NavLink";

const meta: Meta<typeof NavLink> = {
  title: "Components/NavLink",
  component: NavLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
    },
    target: {
      control: { type: "select" },
      options: ["_self", "_blank"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Learn",
    href: "#",
    icon: {
      src: "/file.svg",
      alt: "File icon",
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    children: "Simple Link",
    href: "#",
  },
};

export const Examples: Story = {
  args: {
    children: "Examples",
    href: "#",
    icon: {
      src: "/window.svg",
      alt: "Window icon",
    },
  },
};

export const ExternalLink: Story = {
  args: {
    children: "Go to nextjs.org →",
    href: "https://nextjs.org",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: {
      src: "/globe.svg",
      alt: "Globe icon",
    },
  },
};
