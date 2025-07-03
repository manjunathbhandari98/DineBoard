import {
  Container,
  Group,
  Paper,
  Text,
  Textarea,
  Title
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import { useHotel } from "../context/HotelContext";
import {
  createHotel,
  getHotelByUser,
  updateHotel
} from "../service/hotelService";
import { getProfileInfo } from "../service/userService";
import { assets } from "./../assets/assets";

interface HotelData {
  name: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  website: string;
  description: string;
}

const HotelProfile = () => {
  const [hasHotel, setHasHotel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hotelId, setHotelId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>();
  const [image, setImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const {setLogoUrl} = useHotel();

  const [hotelData, setHotelData] = useState<HotelData>({
    name: "",
    address: "",
    contactPhone: "",
    contactEmail: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfileInfo();
      setProfile(response);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!profile?.id) return;

    const fetchHotelByUser = async (userId: string) => {
      try {
        const response = await getHotelByUser(userId);
        if (response) {
          console.log('response: ',response);
          
          setHotelData({
            name: response.name || "",
            address: response.address || "",
            
            contactPhone: response.contactPhone || "",
            contactEmail: response.contactEmail || "",
            website: response.website || "",
            description: response.description || "",
          });
          setImage(response.logoUrl)
          setHasHotel(true);
          setHotelId(response.id);
        } else {
          setHasHotel(false);
          setHotelId(null);
        }
      } catch (error) {
        console.error("Error fetching hotel:", error);
        setHasHotel(false);
      }
    };

    fetchHotelByUser(profile.id);
  }, [profile]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);
  

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!profile?.id) {
      notifications.show({
        title: "Error",
        message: "User not identified.",
        color: "red",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("hotel", JSON.stringify(hotelData));
  
    // ✅ Only append image if it's a new file
    if (image instanceof File) {
      formData.append("image", image);
    }

    
  
    try {
      if (hasHotel && hotelId) {
        setLoading(true);
        await updateHotel(hotelId, formData);
        setLoading(false);
        if (image instanceof File) {
          const previewUrl = URL.createObjectURL(image);
          setLogoUrl(previewUrl);
        } else {
          setLogoUrl(image); // If already a URL
        }
        notifications.show({
          title: "Hotel Updated",
          message: "Hotel updated successfully",
          color: "green",
        });
      } else {
        await createHotel(formData, profile.id);
        setLoading(false);
        if (image instanceof File) {
          const previewUrl = URL.createObjectURL(image);
          setLogoUrl(previewUrl);
        } else {
          setLogoUrl(image); // If already a URL
        }
        notifications.show({
          title: "Hotel Created",
          message: "Hotel created successfully",
          color: "green",
        });
        setHasHotel(true);
      }
    } catch (error: any) {
      console.error("❌ Hotel save error: ", error?.response || error);
      setLoading(false);
      notifications.show({
        title: "Error",
        message: hasHotel ? "Hotel update failed" : "Hotel creation failed",
        color: "red",
      });
    } finally{
      setLoading(false);
    }
  
    setEditMode(false);
  };
  
  
  
  const handleCancel = () => {
    setEditMode(false);
    // Re-fetch existing image
    if (hotelId && profile?.id) {
      getHotelByUser(profile.id).then((res) => {
        setImage(res.logoUrl);
      });
    }
  };
  
  const handleCreateHotel = () => {
    setEditMode(true);
  };

  return (
    <Container size="sm" py="xl">
      {!hasHotel && !editMode ? (
        <Paper shadow="md" radius="lg" p="xl" withBorder className="text-center">
          <Title order={3}>No hotel found</Title>
          <Text color="dimmed" mt="sm">
            You haven't created a hotel yet. Click below to get started.
          </Text>
          <Button mt="md" onClick={handleCreateHotel}>
            Create Hotel
          </Button>
        </Paper>
      ) : (
        <Paper shadow="md" radius="lg" p="xl" withBorder className="space-y-6">
          <form onSubmit={handleSave} className="space-y-4">

            {/* 📷 Upload Image */}
            
            <div className="mb-3 text-center">
  <div className="mb-4 flex justify-center">
    {/* Only allow clicking image to upload in edit mode */}
    {editMode ? (
      <label htmlFor="image" style={{ cursor: "pointer" }}>
        <img
          src={image instanceof File ? URL.createObjectURL(image) : image || assets.upload}
          alt="Hotel Logo"
          className="rounded-full shadow-md"
          width={64}
          height={64}
        />
      </label>
    ) : (
      <img
        src={image instanceof File ? URL.createObjectURL(image) : image || assets.upload}
        alt="Hotel Logo"
        className="rounded-full shadow-md"
        width={64}
        height={64}
      />
    )}
  </div>

  {/* File input should only show in edit mode */}
  {editMode && (
    <input
      type="file"
      id="image"
      name="image"
      accept="image/*"
      hidden
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setImage(selectedFile);
      }}
    />
  )}
</div>


            {/* 🏨 Name */}
            {editMode ? (
              <TextInput
              name="name"
              label="Hotel Name"
              value={hotelData.name}
              onChange={onChange }
              required
            />
            ) : (
              <Title order={2} className="text-center">{hotelData.name}</Title>
            )}

            {/* 📍 Address */}
            {editMode ? (
               <Textarea
               name="address"
               label="Address"
               value={hotelData.address}
               onChange={onChange
               }
               required
             />
            ) : (
              <Text className="text-center" color="dimmed">{hotelData.address}</Text>
            )}

            {/* 📞 Phone */}
            {editMode ? (
              <TextInput
              name="contactPhone"
              label="Contact Number"
              value={hotelData.contactPhone}
              onChange={onChange }
              required
            />
            ) : (
              <Text className="text-center" size="sm">📞 {hotelData.contactPhone}</Text>
            )}

            {/* 📧 Email */}
            {editMode ? (
               <TextInput
               name="contactEmail"
               label="Email"
               value={hotelData.contactEmail}
               onChange={onChange }
               required
             />
            ) : (
              <Text className="text-center" size="sm">📧 {hotelData.contactEmail}</Text>
            )}

            {/* 🌐 Website */}
            {editMode ? (
               <TextInput
               name='website'
               label="Website"
               value={hotelData.website}
               onChange={onChange }
               required
             />
            ) : (
              <Text className="text-center" size="sm">🌐 {hotelData.website}</Text>
            )}

            {/* 📝 Description */}
            {editMode ? (
               <Textarea
               label="About"
               name='description'
               value={hotelData.description}
               onChange={onChange }
               required
             />
            ) : (
              <Text className="text-center" mt="sm">{hotelData.description}</Text>
            )}

            {/* ✅ Action Buttons */}
            <Group justify="center" mt="md">
              {editMode ? (
                <>
                  <Button type="submit" color="green">{loading? 'Saving...':'Save'}</Button>
                  <Button variant="outline" color="gray" onClick={handleCancel}>Cancel</Button>
                </>
              ) : (
                <Button variant="light" onClick={() => setEditMode(true)}>Edit Profile</Button>
              )}
            </Group>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default HotelProfile;
