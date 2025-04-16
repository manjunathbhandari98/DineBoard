import { useState } from "react";
import {
  Container,
  Title,
  Switch,
  Select,
  Button,
  Paper,
  Divider,
  Group,
  ColorInput,
} from "@mantine/core";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: "light",
    defaultQrBorder: true,
    defaultQrColor: "#000000",
    whiteLabel: false,
    language: "en",
    timezone: "Asia/Kolkata",
  });

  const handleChange = (
    field: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Save to backend or persist in storage
    console.log("Settings saved:", settings);
  };

  const handleCancel = () => {
    // TODO: Reset to previous values if needed
    console.log("Changes canceled.");
  };

  return (
    <Container
      size="sm"
      py="xl"
    >
      <Title
        order={2}
        className="mb-6 text-center font-semibold"
      >
        Settings
      </Title>

      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        withBorder
        className="space-y-6"
      >
        <Switch
          label="Enable Notifications"
          checked={settings.notifications}
          onChange={(e) =>
            handleChange(
              "notifications",
              e.currentTarget.checked
            )
          }
        />

        <Select
          label="Theme"
          data={[
            {
              value: "light",
              label: "Light Mode",
            },
            { value: "dark", label: "Dark Mode" },
          ]}
          value={settings.theme}
          onChange={(val) =>
            handleChange("theme", val)
          }
        />

        <Divider
          label="QR Code Preferences"
          labelPosition="center"
          my="md"
        />

        <Switch
          label="Default Border Around QR Code"
          checked={settings.defaultQrBorder}
          onChange={(e) =>
            handleChange(
              "defaultQrBorder",
              e.currentTarget.checked
            )
          }
        />

        <ColorInput
          label="Default QR Foreground Color"
          value={settings.defaultQrColor}
          onChange={(val) =>
            handleChange("defaultQrColor", val)
          }
        />

        <Divider
          label="App Preferences"
          labelPosition="center"
          my="md"
        />

        <Switch
          label="Enable White-label Branding"
          checked={settings.whiteLabel}
          onChange={(e) =>
            handleChange(
              "whiteLabel",
              e.currentTarget.checked
            )
          }
          description="Removes 'Developed by DineBoard' branding from public menu page"
        />

        <Select
          label="Preferred Language"
          value={settings.language}
          onChange={(val) =>
            handleChange("language", val)
          }
          data={[
            { value: "en", label: "English" },
            { value: "hi", label: "Hindi" },
            { value: "ta", label: "Tamil" },
            { value: "mr", label: "Marathi" },
          ]}
        />

        <Select
          label="Timezone"
          value={settings.timezone}
          onChange={(val) =>
            handleChange("timezone", val)
          }
          data={[
            {
              value: "Asia/Kolkata",
              label: "Asia/Kolkata (IST)",
            },
            {
              value: "Asia/Dubai",
              label: "Asia/Dubai (GST)",
            },
            { value: "UTC", label: "UTC" },
          ]}
        />

        <Group
          justify="center"
          mt="xl"
        >
          <Button
            color="teal"
            onClick={handleSave}
          >
            Save Settings
          </Button>
          <Button
            variant="outline"
            color="gray"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default SettingsPage;
