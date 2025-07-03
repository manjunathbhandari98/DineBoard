// components/AddItemModal.tsx
import {
  Button,
  FileInput,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";

interface AddItemModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  itemName: string;
  setItemName: (val: string) => void;
  itemDescription: string;
  setItemDescription: (val: string) => void;
  itemPrice: any;
  setItemPrice: (val: number) => void;
  onFileChange: (file: File | null) => void;
  itemImage: string | any;
}

export default function AddItemModal({
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
  itemImage
}: AddItemModalProps) {

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add Item"
      centered
    >
      <TextInput
        label="Item Name"
        value={itemName}
        onChange={(e) =>
          setItemName(e.currentTarget.value)
        }
      />
      <Textarea
        label="Description"
        value={itemDescription}
        onChange={(e) =>
          setItemDescription(
            e.currentTarget.value
          )
        }
      />
      <TextInput
        label="Price"
        type="number"
        value={itemPrice}
        onChange={(e) =>
          setItemPrice(
            parseFloat(e.currentTarget.value)
          )
        }
      />
      <FileInput
        label="Upload Image"
        onChange={onFileChange}
      />
      {itemImage && (
        <img
          src={itemImage instanceof File ? URL.createObjectURL(itemImage) : itemImage}
          alt="Preview"
          style={{
            marginTop: 10,
            maxHeight: 150,
            borderRadius: 8,
          }}
        />
      )}
      <Button
        mt="md"
        fullWidth
        onClick={onSubmit}
        loading={isSubmitting}
      >
        Add Item
      </Button>
    </Modal>
  );
}
