import { useState, useRef } from "react";
import {
  Container,
  Title,
  Text,
  Select,
  Input,
  Switch,
  Paper,
  Group,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import {
  QRCodeCanvas,
  QRCodeSVG,
} from "qrcode.react";
import { toPng } from "html-to-image";
import Button from "../components/ui/Button";

const menus = [
  { value: "menu1", label: "Main Course Menu" },
  { value: "menu2", label: "Breakfast Specials" },
  {
    value: "menu3",
    label: "Desserts & Beverages",
  },
];

const QRCodes = () => {
  const [selectedMenu, setSelectedMenu] =
    useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [showBorder, setShowBorder] =
    useState(true);
  const [foregroundColor, setForegroundColor] =
    useState("#000000");
  const qrRef = useRef<HTMLDivElement>(null);

  const qrValue = `https://www.google.com`; //url
  const hotelName = "Daniel Hotels";
  const hotelLogo = "/logo.png";

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      // --- Wait for images inside the QR container to load ---
      const images =
        qrRef.current.getElementsByTagName("img");
      const promises = Array.from(images).map(
        (img) => {
          if (
            img.complete &&
            img.naturalHeight !== 0
          )
            return Promise.resolve();
          return new Promise<void>((resolve) => {
            img.onload = () => resolve();
            // Also resolve on error to not block the process indefinitely
            img.onerror = () => {
              console.warn(
                `Image failed to load: ${img.src}`
              );
              resolve();
            };
          });
        }
      );

      await Promise.all(promises);

      // --- Add a slightly longer delay to allow canvas/DOM updates ---
      // Increased from 100ms to 300ms - adjust as needed
      await new Promise((res) =>
        setTimeout(res, 300)
      );

      console.log(
        "Attempting to generate PNG..."
      ); // Debug log

      // --- Generate PNG using html-to-image with options ---
      const dataUrl = await toPng(
        qrRef.current as HTMLElement,
        {
          quality: 1,
          cacheBust: true,
          pixelRatio:
            window.devicePixelRatio || 1,
          backgroundColor: "#ffffff", // <- add this
        }
      );

      console.log("PNG data URL generated."); // Debug log

      // --- Trigger download ---
      const link = document.createElement("a");
      link.download = `qr-${
        selectedMenu || "menu"
      }-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      console.log("Download triggered."); // Debug log
    } catch (error) {
      console.error(
        "Failed to generate or download QR image:",
        error
      ); // Log the specific error
      alert(
        "Download failed. Check the console for details."
      );
    }
  };

  return (
    <Container
      size="md"
      py="xl"
    >
      <div className="text-center mb-10">
        <Title
          order={2}
          className="text-3xl font-bold"
        >
          Generate QR Code
        </Title>
        <Text color="dimmed">
          Select a menu and generate a stylish QR
          code for customers to scan.
        </Text>
      </div>

      <Paper
        shadow="md"
        radius="md"
        p="lg"
        withBorder
      >
        <div className="space-y-6">
          <Select
            label="Select Menu"
            placeholder="Choose one"
            data={menus}
            value={selectedMenu}
            onChange={setSelectedMenu}
            required
          />
          <Input.Wrapper label="Label / Note">
            <Input
              required
              placeholder="Ex: Table 4 - Outdoor"
              value={label}
              onChange={(e) =>
                setLabel(e.currentTarget.value)
              }
            />
          </Input.Wrapper>

          <Group
            justify="space-between"
            align="flex-end"
          >
            <Input.Wrapper label="Foreground Color">
              <input
                type="color"
                value={foregroundColor}
                onChange={(e) =>
                  setForegroundColor(
                    e.target.value
                  )
                }
                className="rounded w-10 h-10 border cursor-pointer p-0"
                style={{
                  appearance: "none",
                  border: "1px solid #ccc",
                }}
              />
            </Input.Wrapper>

            <Switch
              label="Show Border around QR"
              checked={showBorder}
              onChange={(e) =>
                setShowBorder(
                  e.currentTarget.checked
                )
              }
            />
          </Group>
        </div>
      </Paper>

      {selectedMenu && (
        <div className="mt-10 flex flex-col items-center justify-center space-y-6">
          <Text
            size="sm"
            color="dimmed"
          >
            Preview
          </Text>

          <div
            ref={qrRef}
            style={{
              width: "360px",
              background:
                "linear-gradient(to bottom, #f9fafb, #ffffff)",
              padding: "24px",
              borderRadius: "24px",
              boxShadow:
                "0 8px 30px rgba(0, 0, 0, 0.12)",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header Ribbon */}
            <div
              style={{
                backgroundColor: "#4F46E5", // Indigo
                color: "white",
                padding: "12px 20px",
                width: "100%",
                textAlign: "center",
                borderRadius: "16px 16px 0 0",
                fontWeight: 700,
                fontSize: "18px",
                letterSpacing: "0.5px",
              }}
            >
              Scan to View Menu
            </div>

            {/* Hotel Logo + Name */}
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                src={hotelLogo}
                crossOrigin="anonymous"
                width={72}
                height={72}
                alt="logo"
                style={{
                  borderRadius: "50%",
                  border: "2px solid #e0e0e0",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  padding: "4px",
                }}
              />
              <Text
                size="lg"
                fw={700}
                style={{ fontSize: "20px" }}
              >
                {hotelName}
              </Text>
            </div>

            {/* QR Code */}
            <div
              className="bg-white p-4 mt-4 rounded-xl border border-green-700"
              style={{
                boxShadow:
                  "inset 0 0 4px rgba(0,0,0,0.06)",
              }}
            >
              <QRCodeSVG
                value={qrValue}
                size={200}
                fgColor={foregroundColor}
                level="H"
                includeMargin={true}
              />
            </div>

            {/* Label */}
            {label && (
              <Text
                size="sm"
                mt="xs"
                style={{
                  fontWeight: 500,
                  color: "#4B5563", // gray-700
                }}
              >
                {label}
              </Text>
            )}

            {/* Footer */}
            <div
              style={{
                marginTop: "auto",
                borderTop: "1px dashed #d1d5db",
                width: "100%",
                paddingTop: "12px",
                textAlign: "center",
              }}
            >
              <Text
                size="xs"
                color="dimmed"
              >
                Powered by{" "}
                <span className="text-indigo-600 font-semibold">
                  DineBoard
                </span>
              </Text>
            </div>
          </div>

          {/* Download Button */}
          <Button
            leftSection={
              <IconDownload size={18} />
            }
            variant="filled"
            color="indigo"
            radius="xl"
            size="md"
            className="transition-transform hover:scale-105"
            onClick={handleDownload}
          >
            Download QR Code
          </Button>
        </div>
      )}
    </Container>
  );
};

export default QRCodes;
