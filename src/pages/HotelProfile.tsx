import { useState } from "react";
import {
  Container,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Avatar,
  Group,
  Paper,
} from "@mantine/core";

const HotelProfile = () => {
  const [hasHotel, setHasHotel] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [hotelData, setHotelData] = useState({
    name: "",
    logo: "",
    address: "",
    contact: "",
    email: "",
    website: "",
    description: "",
  });

  const handleChange = (
    field: string,
    value: string
  ) => {
    setHotelData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setHasHotel(true);
    setEditMode(false);
  };

  const handleCancel = () => {
    if (!hasHotel) {
      // If canceling without any hotel, reset to initial state
      setHotelData({
        name: "",
        logo: "",
        address: "",
        contact: "",
        email: "",
        website: "",
        description: "",
      });
    }
    setEditMode(false);
  };

  const handleCreateHotel = () => {
    setEditMode(true);
  };

  return (
    <Container
      size="sm"
      py="xl"
    >
      {!hasHotel && !editMode ? (
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          withBorder
          className="text-center"
        >
          <Title order={3}>No hotel found</Title>
          <Text
            color="dimmed"
            mt="sm"
          >
            You haven't created a hotel yet. Click
            below to get started.
          </Text>
          <Button
            mt="md"
            onClick={handleCreateHotel}
          >
            Create Hotel
          </Button>
        </Paper>
      ) : (
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          withBorder
          className="space-y-6"
        >
          <Group justify="center">
            <Avatar
              src={
                hotelData.logo ||
                "/placeholder-logo.png"
              }
              alt={hotelData.name}
              size={100}
              radius="xl"
            />
          </Group>

          {editMode ? (
            <TextInput
              label="Hotel Name"
              value={hotelData.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.currentTarget.value
                )
              }
              required
            />
          ) : (
            <Title
              order={2}
              className="text-center"
            >
              {hotelData.name}
            </Title>
          )}

          {editMode ? (
            <Textarea
              label="Address"
              value={hotelData.address}
              onChange={(e) =>
                handleChange(
                  "address",
                  e.currentTarget.value
                )
              }
              required
            />
          ) : (
            <Text
              className="text-center"
              color="dimmed"
            >
              {hotelData.address}
            </Text>
          )}

          {editMode ? (
            <TextInput
              label="Contact Number"
              value={hotelData.contact}
              onChange={(e) =>
                handleChange(
                  "contact",
                  e.currentTarget.value
                )
              }
              required
            />
          ) : (
            <Text
              className="text-center"
              size="sm"
            >
              📞 {hotelData.contact}
            </Text>
          )}

          {editMode ? (
            <TextInput
              label="Email"
              value={hotelData.email}
              onChange={(e) =>
                handleChange(
                  "email",
                  e.currentTarget.value
                )
              }
              required
            />
          ) : (
            <Text
              className="text-center"
              size="sm"
            >
              📧 {hotelData.email}
            </Text>
          )}

          {editMode ? (
            <TextInput
              label="Website"
              value={hotelData.website}
              onChange={(e) =>
                handleChange(
                  "website",
                  e.currentTarget.value
                )
              }
            />
          ) : (
            <Text
              className="text-center"
              size="sm"
            >
              📧 {hotelData.website}
            </Text>
          )}

          {editMode ? (
            <Textarea
              label="About Hotel"
              autosize
              minRows={3}
              value={hotelData.description}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.currentTarget.value
                )
              }
            />
          ) : (
            <Text
              className="text-center"
              mt="sm"
            >
              {hotelData.description}
            </Text>
          )}

          <Group
            justify="center"
            mt="md"
          >
            {editMode ? (
              <>
                <Button
                  color="green"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="light"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            )}
          </Group>
        </Paper>
      )}
    </Container>
  );
};

export default HotelProfile;
