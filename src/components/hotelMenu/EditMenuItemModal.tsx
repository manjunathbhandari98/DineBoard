// components/EditMenuItemModal.tsx
import {
  Button,
  FileInput,
  Image,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { MenuItem } from "../../interface"; // Adjust the import path as needed

interface EditMenuItemModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (
    updatedItem: Omit<MenuItem, "id"> & {
      id: string | number;
    }
  ) => void;
  isSubmitting: boolean;
  itemName: string;
  setItemName: (val: string) => void;
  itemDescription: string;
  setItemDescription: (val: string) => void;
  itemPrice: number | null;
  setItemPrice: (val: number | null) => void;
  onFileChange: (file: File | null) => void;
  itemImage?: string | null;
  initialItem?: MenuItem | null; // Optional: to prefill data
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


  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        initialItem
          ? `Edit "${initialItem.name}"`
          : "Edit Item"
      }
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
        value={
          itemPrice !== null ? itemPrice : ""
        }
        onChange={(e) =>
          setItemPrice(
            parseFloat(e.currentTarget.value)
          )
        }
      />
      <FileInput
        label="Upload New Image (Optional)"
        onChange={onFileChange}
        accept="image/*"
      />
      {itemImage && (
        <Image
          src={itemImage}
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
  onClick={() => {
    console.log("Save button clicked!"); // Check if this logs
  console.log("initialItem in modal:")
    
    if (initialItem) {
      const updatedItem = {
        id: initialItem.id,
        name: itemName,
        description: itemDescription,
        price: itemPrice !== null ? Number(itemPrice) : 0,
        menuId: initialItem.menuId,
        categoryId: initialItem.categoryId,
        itemImage: itemImage,
      };
      onSubmit(updatedItem); 
    }else {
      console.warn("initialItem is null or undefined. Cannot submit.");
    }
  }}
  loading={isSubmitting}
>
  {isSubmitting ? "Saving..." : "Save Changes"}
</Button>

    </Modal>
  );
}
