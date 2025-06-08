import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "./LinkButton";

const meta: Meta<typeof LinkButton> = {
  title: "Components/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    primary: {
      control: "boolean",
    },
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

export const Primary: Story = {
  args: {
    primary: true,
    children: "Deploy now",
    href: "#",
    icon: {
      src: "/vercel.svg",
      alt: "Vercel logomark",
    },
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    children: "Read our docs",
    href: "#",
  },
};

export const WithIcon: Story = {
  args: {
    primary: false,
    children: "Go to nextjs.org →",
    href: "#",
    icon: {
      src: "/globe.svg",
      alt: "Globe icon",
    },
  },
};

export const ExternalLink: Story = {
  args: {
    primary: true,
    children: "External Link",
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: {
      src: "/next.svg",
      alt: "External link icon",
    },
  },
};
