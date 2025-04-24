// components/EditMenuItemModal.tsx
import {
  Modal,
  TextInput,
  Button,
  Textarea,
  FileInput,
  Image,
} from "@mantine/core";
import { MenuItem } from "../../interface"; // Adjust the import path as needed
import React, { useState } from "react";

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
  base64Image?: string | null;
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
  base64Image,
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
      {base64Image && (
        <Image
          src={base64Image}
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
          // Wrap onSubmit call in a new function
          if (initialItem) {
            const updatedItem = {
              id: initialItem.id,
              name: itemName,
              description: itemDescription,
              price:
                itemPrice !== null
                  ? Number(itemPrice)
                  : 0,
              menuId: initialItem.menuId, // Keep original
              categoryId: initialItem.categoryId, // Keep original
              itemImage:
                base64Image?.split(",")[1],
            };
            onSubmit(updatedItem);
          }
        }}
        loading={isSubmitting}
      >
        Save Changes
      </Button>
    </Modal>
  );
}
