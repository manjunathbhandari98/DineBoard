// QRCodes.tsx
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Image,
  Input,
  Loader,
  Modal,
  Select,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconDownload,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { toPng } from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getHotelByUser } from "../service/hotelService";
import { getMenu } from "../service/menuService";
import {
  deleteQRCode,
  getQRCodes,
  saveQRCode,
  updateQRCodeLabel,
} from "../service/qrService";
import { getSettings } from "../service/settingService";
import { getProfileInfo } from "../service/userService";

interface QRCodeItem {
  id: string;
  hotelId?: string;
  menuId?: string;
  url: string;
  label: string;
}

const QRCodes = () => {
  const [qrCodes, setQRCodes] = useState<
    QRCodeItem[]
  >([]);
  const [selectedQRCode, setSelectedQRCode] =
    useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [showPreview, setShowPreview] =
    useState(false);
  const [isLoading, setIsLoading] =
    useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const [hotelId, setHotelId] = useState<
    string | undefined
  >();
  const [hotelName, setHotelName] = useState("");
  const [hotelLogo, setHotelLogo] = useState("");
  const [menus, setMenus] = useState<
    { value: string; label: string }[]
  >([]);
  const [menuMap, setMenuMap] = useState<{
    [key: string]: string;
  }>({});
  const [hasBorder, setHasBorder] =
    useState(false);
  const [loading, setLoading] = useState(true);

  const [editModalOpen, setEditModalOpen] =
    useState(false);
  const [editingQRCode, setEditingQRCode] =
    useState<QRCodeItem | null>(null);
  const [editedLabel, setEditedLabel] =
    useState("");

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const qrValue = selectedQRCode
    ? `http://192.168.1.10:5173/customer-menu/${
        selectedQRCode.startsWith("temp")
          ? selectedQRCode.replace("temp-", "")
          : qrCodes.find(
              (qr) => qr.id === selectedQRCode
            )?.menuId
      }`
    : "";

  const fetchProfileAndHotel =
    useCallback(async () => {
      try {
        const profile = await getProfileInfo();
        if (profile?.id) {
          const hotel = await getHotelByUser(
            profile.id
          );
          setHotelId(hotel.id);
          setHotelName(hotel.name || "");
          setHotelLogo(hotel.logoUrl || "");
        }
      } catch (error) {
        console.error(
          "Error fetching hotel/profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    }, []);

  const fetchQRCodesAndMenus =
    useCallback(async () => {
      if (!hotelId) return;
      try {
        const [qrData, allMenus] =
          await Promise.all([
            getQRCodes(),
            getMenu(hotelId),
          ]);
        setQRCodes(qrData);

        const usedMenuIds = new Set(
          qrData.map((qr: any) => qr.menuId)
        );
        const menuMapTemp: {
          [key: string]: string;
        } = {};

        const availableMenus = allMenus.filter(
          (menu: any) => {
            menuMapTemp[menu.id] = menu.title;
            return !usedMenuIds.has(menu.id);
          }
        );

        setMenuMap(menuMapTemp);
        const formattedMenus = availableMenus.map(
          (menu: any) => ({
            value: menu.id,
            label: menu.title,
          })
        );
        setMenus(formattedMenus);
      } catch (error) {
        console.error(
          "Error loading QR codes or menus:",
          error
        );
      } finally {
        setLoading(false);
      }
    }, [hotelId]);

  useEffect(() => {
    fetchProfileAndHotel();
  }, [fetchProfileAndHotel]);

  useEffect(() => {
    if (hotelId) {
      fetchQRCodesAndMenus();
    }
  }, [hotelId, fetchQRCodesAndMenus]);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSettings(
        hotelId || ""
      );
      setHasBorder(settings.borderAroundQR);
    };
    fetchSettings();
  }, [hotelId]);

  const handleGenerateQR = () => {
    setShowPreview(true);
  };

  const handleDownloadPreview = async () => {
    if (!qrRef.current) return;
    try {
      const imgDataUrl = await toPng(
        qrRef.current,
        {
          cacheBust: true,
          pixelRatio: 4,
        }
      );

      const link = document.createElement("a");
      link.href = imgDataUrl;
      link.download = `qr-${label.replace(
        /[^a-zA-Z0-9]/g,
        "-"
      )}-${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error(
        "Failed to download QR:",
        err
      );
    }
  };

  const handleSaveQRCode = async () => {
    setIsLoading(true);
    if (
      !selectedQRCode ||
      !selectedQRCode.startsWith("temp") ||
      !label ||
      !qrRef.current ||
      !hotelId
    )
      return;

    try {
      const imgDataUrl = await toPng(
        qrRef.current,
        {
          cacheBust: true,
          pixelRatio: 4,
        }
      );

      await saveQRCode({
        menuId: selectedQRCode.replace(
          "temp-",
          ""
        ),
        label,
        url: imgDataUrl,
        hotelId,
      });
      setIsLoading(false);
      setLabel("");
      setSelectedQRCode(null);
      setShowPreview(false);
      await fetchQRCodesAndMenus();
    } catch (err) {
      console.error("Failed to save QR:", err);
      setIsLoading(false);
    }
  };

  const handleIndividualDownload = async (
    qrCode: QRCodeItem
  ) => {
    if (!qrCode.url) return;

    const link = document.createElement("a");
    link.href = qrCode.url;
    link.download = `qr-${qrCode.label.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )}-${Date.now()}.png`;
    link.click();
  };

  const handleEditQRCode = async () => {
    if (!editingQRCode || !editedLabel) return;
    try {
      const updatedData = {
        ...editingQRCode,
        label: editedLabel,
      };
      await updateQRCodeLabel(
        editingQRCode.id,
        updatedData
      );
      setEditModalOpen(false);
      setEditingQRCode(null);
      await fetchQRCodesAndMenus();
    } catch (err) {
      console.error("Failed to edit QR:", err);
    }
  };

  const handleDeleteQRCode = async () => {
    if (!editingQRCode) return;
    setIsSubmitting(true);
    try {
      await deleteQRCode(editingQRCode.id);
      setDeleteModalOpen(false);
      setEditingQRCode(null);
      await fetchQRCodesAndMenus();
    } catch (err) {
      console.error("Failed to delete QR:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container
        size="sm"
        py="xl"
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader size={32} />
        </div>
      </Container>
    );
  }

  return (
    <Container
      size="md"
      py="xl"
    >
      <div className="text-center mb-8">
        <Title order={2}>
          Manage Menu QR Codes
        </Title>
        <Text color="dimmed">
          View, generate, download and manage QR
          codes for your menus.
        </Text>
      </div>

      <Flex
        justify="end"
        mb="md"
      >
        <Button
          leftSection={<IconDownload size={18} />}
          onClick={() =>
            alert("Bulk download not implemented")
          }
        >
          Download All QRs
        </Button>
      </Flex>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {qrCodes.map((qr) => (
          <Card
            key={qr.id}
            withBorder
            radius="md"
            shadow="sm"
          >
            <Flex
              direction="column"
              align="center"
              mb="sm"
            >
              <Text
                size="sm"
                color="dimmed"
              >
                {menuMap[qr.menuId || ""] ||
                  "Menu"}
              </Text>
              <Text fw={600}>{qr.label}</Text>
            </Flex>
            <Card.Section className="flex justify-center mb-2">
              {qr.url ? (
                <Image
                  src={qr.url}
                  alt="QR"
                  height={120}
                  fit="contain"
                />
              ) : (
                <Text
                  size="sm"
                  color="gray"
                >
                  No QR available
                </Text>
              )}
            </Card.Section>
            <Group
              justify="center"
              mt="xs"
            >
              <Tooltip label="Download">
                <ActionIcon
                  color="teal"
                  onClick={() =>
                    handleIndividualDownload(qr)
                  }
                >
                  <IconDownload size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Edit Label">
                <ActionIcon
                  color="blue"
                  onClick={() => {
                    setEditingQRCode(qr);
                    setEditedLabel(qr.label);
                    setEditModalOpen(true);
                  }}
                >
                  <IconEdit size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon
                  color="red"
                  onClick={() => {
                    setEditingQRCode(qr);
                    setDeleteModalOpen(true);
                  }}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Card>
        ))}
      </div>

      {menus.length > 0 && (
        <Card
          mt="xl"
          withBorder
          radius="md"
          shadow="sm"
          padding="lg"
        >
          <Text
            fw={600}
            mb="sm"
          >
            Generate New QR Code
          </Text>
          <Select
            label="Select Menu"
            placeholder="Pick one"
            data={menus}
            value={
              selectedQRCode?.startsWith("temp")
                ? selectedQRCode.replace(
                    "temp-",
                    ""
                  )
                : ""
            }
            onChange={(value) => {
              setSelectedQRCode(
                value ? `temp-${value}` : null
              );
              setLabel("");
              setShowPreview(false);
            }}
          />
          {selectedQRCode?.startsWith("temp") && (
            <>
              <Input.Wrapper label="Label / Note">
                <Input
                  required
                  placeholder="e.g. Table 3, Garden Area"
                  value={label}
                  onChange={(e) =>
                    setLabel(
                      e.currentTarget.value
                    )
                  }
                />
              </Input.Wrapper>
              <Button
                mt="md"
                fullWidth
                onClick={handleGenerateQR}
                disabled={!label}
              >
                Generate QR Preview
              </Button>
            </>
          )}
        </Card>
      )}

      {showPreview &&
        selectedQRCode?.startsWith("temp") && (
          <div className="mt-10 flex flex-col items-center justify-center space-y-6">
            <Text
              size="sm"
              color="dimmed"
            >
              QR Code Preview for{" "}
              {
                menus.find(
                  (m) =>
                    m.value ===
                    selectedQRCode.replace(
                      "temp-",
                      ""
                    )
                )?.label
              }
            </Text>

            <div
              ref={qrRef}
              style={{
                width: 320,
                background:
                  "linear-gradient(to bottom, #f9fafb, #fff)",
                padding: 20,
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#4F46E5",
                  color: "#fff",
                  padding: "10px",
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "12px 12px 0 0",
                  fontWeight: "bold",
                }}
              >
                Scan to View Menu
              </div>
              <img
                src={hotelLogo}
                alt="logo"
                width={60}
                height={60}
                style={{
                  borderRadius: "50%",
                  marginTop: 10,
                }}
              />
              <Text
                fw={600}
                mt="xs"
              >
                {hotelName}
              </Text>
              <div
                className={`bg-white ${
                  hasBorder &&
                  "border-2 border-gray-300"
                }  p-3 mt-3 rounded-md`}
              >
                <QRCodeSVG
                  value={qrValue}
                  size={160}
                  level="H"
                  includeMargin
                />
              </div>
              {label && (
                <Text
                  size="xs"
                  mt="xs"
                  color="gray"
                >
                  {label}
                </Text>
              )}
              <Text
                size="xs"
                mt="sm"
                color="dimmed"
              >
                Powered by{" "}
                <span
                  style={{
                    color: "#4F46E5",
                    fontWeight: 600,
                  }}
                >
                  DineBoard
                </span>
              </Text>
            </div>

            <Group
              justify="center"
              mt="md"
            >
              <Button
                leftSection={
                  <IconDownload size={18} />
                }
                onClick={handleDownloadPreview}
              >
                Download QR
              </Button>
              <Button
                color="green"
                onClick={handleSaveQRCode}
              >
                {isLoading ? (
                  <Loader size="xs" />
                ) : (
                  "Save QR Code"
                )}
              </Button>
            </Group>
          </div>
        )}
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit QR Code Label"
        centered
      >
        <Input
          value={editedLabel}
          onChange={(e) =>
            setEditedLabel(e.currentTarget.value)
          }
          placeholder="Enter new label"
        />
        <Button
          fullWidth
          mt="md"
          onClick={handleEditQRCode}
        >
          Save
        </Button>
      </Modal>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={
          <Text
            fw={600}
            size="lg"
            c="red"
          >
            ⚠️ Confirm Menu Deletion
          </Text>
        }
        centered
      >
        <Text
          mb="md"
          c="dimmed"
          size="sm"
        >
          Are you sure you want to delete this
          QRCode? This action cannot be undone.
        </Text>

        <div className="flex gap-4">
          <Button
            fullWidth
            color="red"
            onClick={handleDeleteQRCode}
            loading={isSubmitting}
          >
            Yes, Delete
          </Button>
          <Button
            fullWidth
            variant="outline"
            onClick={() =>
              setDeleteModalOpen(false)
            }
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default QRCodes;
