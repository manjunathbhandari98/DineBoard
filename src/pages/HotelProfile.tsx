import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  TextInput,
  Textarea,
  Avatar,
  Group,
  Paper,
  ActionIcon,
  FileButton,
} from "@mantine/core";
import Button from "../components/ui/Button";
import { notifications } from "@mantine/notifications";
import {
  createHotel,
  getHotelByUser,
  updateHotel,
} from "../service/hotelService";
import { IconEdit } from "@tabler/icons-react";
import { getProfileInfo } from "../service/userService";

const HotelProfile = () => {
  const [hasHotel, setHasHotel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hotelId, setHotelId] = useState<
    string | null
  >(null);

  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfileInfo();
      setProfile(response);
    };
    fetchProfile();
  }, []);

  const [hotelData, setHotelData] = useState({
    name: "",
    logoUrl: "",
    address: "",
    contactPhone: "",
    contactEmail: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    if (!profile?.id) return; // wait until profile is loaded

    const fetchHotelByUser = async (
      userId: string
    ) => {
      try {
        const response = await getHotelByUser(
          userId
        );
        if (response) {
          setHotelData({
            name: response.name || "",
            logoUrl: response.logoUrl || "",
            address: response.address || "",
            contactPhone:
              response.contactPhone || "",
            contactEmail:
              response.contactEmail || "",
            website: response.website || "",
            description:
              response.description || "",
          });
          setHasHotel(true);
          setHotelId(response.id);
        } else {
          setHasHotel(false);
          setHotelId(null);
        }
      } catch (error) {
        console.error(
          "Error fetching hotel:",
          error
        );
        setHasHotel(false);
      }
    };

    fetchHotelByUser(profile.id);
  }, [profile?.id]);

  const handleChange = (
    field: string,
    value: string
  ) => {
    setHotelData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (hasHotel && hotelId) {
        await updateHotel(hotelId, hotelData);
        notifications.show({
          title: "Hotel Updated",
          message: "Hotel updated successfully",
          color: "green",
        });
      } else {
        await createHotel(hotelData, profile?.id);
        notifications.show({
          title: "Hotel Created",
          message: "Hotel created successfully",
          color: "green",
        });
        setHasHotel(true);
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: hasHotel
          ? "Hotel update failed"
          : "Hotel creation failed",
        color: "red",
      });
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleCreateHotel = () => {
    setEditMode(true);
  };

  const handleFileChange = async (
    file: File | null
  ) => {
    if (!file) return;

    try {
      const img: any = await getBase64(file);
      const base64Data = img.split(",")[1];

      setHotelData((prev) => ({
        ...prev,
        logoUrl: base64Data, // Only update in local state
      }));
    } catch (error) {
      console.error(
        "Failed to preview logo:",
        error
      );
      notifications.show({
        title: "Error",
        message: "Failed to preview logo image",
        color: "red",
      });
    }
  };

  const getBase64 = (
    file: File
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
          <Group
            justify="center"
            className="relative"
          >
            <Avatar
              src={
                hotelData.logoUrl?.startsWith(
                  "data:image"
                )
                  ? hotelData.logoUrl
                  : `data:image/png;base64,${hotelData.logoUrl}`
              }
              alt={hotelData.name}
              size={100}
              radius="xl"
            />

            {editMode && (
              <FileButton
                onChange={handleFileChange}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <ActionIcon
                    {...props}
                    variant="filled"
                    color="blue"
                    radius="xl"
                    size="sm"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: "calc(50% - 50px)",
                      transform:
                        "translateX(50%)",
                    }}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                )}
              </FileButton>
            )}
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
              value={hotelData.contactPhone}
              onChange={(e) =>
                handleChange(
                  "contactPhone",
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
              📞 {hotelData.contactPhone}
            </Text>
          )}

          {editMode ? (
            <TextInput
              label="Email"
              value={hotelData.contactEmail}
              onChange={(e) =>
                handleChange(
                  "contactEmail",
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
              📧 {hotelData.contactEmail}
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
              🌐 {hotelData.website}
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
                  {hasHotel ? "Update" : "Save"}
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
