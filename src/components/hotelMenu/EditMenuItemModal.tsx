// components/EditMenuItemModal.tsx
import {
  Button,
  FileInput,
  Image,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { MenuItem } from "../../interface";

interface EditMenuItemModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void; // Changed to match parent's handler signature
  isSubmitting: boolean;
  itemName: string;
  setItemName: (val: string) => void;
  itemDescription: string;
  setItemDescription: (val: string) => void;
  itemPrice: number | null;
  setItemPrice: (val: number | null) => void;
  onFileChange: (file: File | null) => void;
  itemImage?: string | null;
  initialItem?: MenuItem | null;
}

export default function EditMenuItemModal({
  opened,
  onClose,
  onSubmit,
  isSubmitting,
  itemName,
  setItemName,
  itemDescription,
  setItemDescription,
  itemPrice,
  setItemPrice,
  onFileChange,
  itemImage,
  initialItem,
}: EditMenuItemModalProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value === "") {
      setItemPrice(null);
    } else {
      const parsed = parseFloat(value);
      setItemPrice(isNaN(parsed) ? null : parsed);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialItem ? `Edit "${initialItem.name}"` : "Edit Item"}
      centered
      size="md"
    >
      <Stack gap="md">
        <TextInput
          label="Item Name"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.currentTarget.value)}
          required
        />
        <Textarea
          label="Description"
          placeholder="Enter item description (optional)"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.currentTarget.value)}
          minRows={3}
        />
        <TextInput
          label="Price"
          type="number"
          placeholder="0.00"
          value={itemPrice !== null ? itemPrice : ""}
          onChange={handlePriceChange}
          min={0}
          step={0.01}
          required
        />
        <FileInput
          label="Upload New Image (Optional)"
          placeholder="Choose an image file to replace existing"
          onChange={onFileChange}
          accept="image/*"
        />
        {itemImage && (
          <Image
            src={itemImage}
            alt="Item preview"
            style={{
              marginTop: 10,
              maxHeight: 200,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
            }}
            fit="cover"
          />
        )}
        <Button
          mt="md"
          fullWidth
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </Stack>
    </Modal>
  );
}
