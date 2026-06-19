import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  argTypes: { tone: { control: "inline-radio", options: ["default", "primary", "accent"] } },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = { args: { children: "бар / клуб", tone: "primary" } };
export const Accent: Story = { args: { children: "рассрочка 0-0-12", tone: "accent" } };
export const Default: Story = { args: { children: "в наличии", tone: "default" } };
