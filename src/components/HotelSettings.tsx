import {
  Avatar,
  Card,
  Divider,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const HotelSettings = () => {
  const hotel = {
    name: "Daniel Hotels",
    email: "daniel@hotels.com",
    image: "", // Optional: hotel logo or profile image URL
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : parts[0][0].toUpperCase() +
          parts[1][0].toUpperCase();
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f0f2f5]">
      {/* Sidebar */}
      <div className="w-full md:w-[320px] bg-white h-full border-r shadow-sm">
        {/* Header Card */}
        <Card
          withBorder
          padding="md"
          className="flex items-center gap-4 border-b"
        >
          <Avatar
            radius="xl"
            size="lg"
            src={hotel.image}
            color="blue"
          >
            {getInitials(hotel.name)}
          </Avatar>
          <div className="space-y-[2px]">
            <Text
              fw={600}
              size="sm"
            >
              {hotel.name}
            </Text>
            <Text
              size="xs"
              c="dimmed"
            >
              {hotel.email}
            </Text>
          </div>
        </Card>

        {/* Menu Items */}
        <ScrollArea className="h-full px-2 pb-6">
          <Stack mt="sm">
            <Link
              to="/hotel-profile"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-100 transition"
            >
              <IconUser size={18} />
              <Text
                size="sm"
                fw={500}
              >
                Profile
              </Text>
            </Link>

            <Link
              to="/hotel-settings"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-100 transition"
            >
              <IconSettings size={18} />
              <Text
                size="sm"
                fw={500}
              >
                General Settings
              </Text>
            </Link>

            <Divider className="my-2" />

            <UnstyledButton
              onClick={handleLogout}
              className="flex ml-5 items-center gap-3 px-4 py-3 rounded hover:bg-gray-100 text-red-600 transition"
            >
              <IconLogout size={18} />
              <Text
                size="sm"
                fw={500}
              >
                Logout
              </Text>
            </UnstyledButton>
          </Stack>
        </ScrollArea>
      </div>

      {/* Right panel - visible only on desktop */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#f0f2f5]">
        {/* Optional preview/content area */}
      </div>
    </div>
  );
};

export default HotelSettings;
