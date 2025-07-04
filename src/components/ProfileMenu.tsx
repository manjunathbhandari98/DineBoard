import {
  Avatar,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { forwardRef } from "react";

interface UserButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  image?: string;
  name: string;
  icon?: React.ReactNode;
}

const ProfileMenu = forwardRef<
  HTMLButtonElement,
  UserButtonProps
>(
  (
    {
      image,
      name,
      icon,
      ...others
    }: UserButtonProps,
    ref
  ) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-md)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        {image ? (
          <Avatar
            src={image}
            radius="xl"
          />
        ) : (
          <Avatar
            color="cyan"
            radius="xl"
          >
            {name
              ?.split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </Avatar>
        )}

        <div
          style={{ flex: 1 }}
          className="block md:hidden"
        >
          <Text
            size="sm"
            fw={500}
          >
            {name}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
);

export default ProfileMenu;
