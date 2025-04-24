import React from "react";
import {
  Modal,
  Button,
  Text,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { MenuItem } from "../../interface";

interface DeleteMenuItemModalProps {
  opened: boolean;
  onClose: () => void;
  onDelete: (itemId: string | number) => void;
  itemToDelete: MenuItem | null;
  isSubmitting: boolean;
}

const DeleteMenuItemModal: React.FC<
  DeleteMenuItemModalProps
> = ({
  opened,
  onClose,
  onDelete,
  itemToDelete,
  isSubmitting,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete Menu Item"
    >
      <LoadingOverlay visible={isSubmitting} />
      {itemToDelete ? (
        <>
          <Text
            size="sm"
            mb="md"
          >
            Are you sure you want to delete "
            <Text
              fw={500}
              span
            >
              {itemToDelete.name}
            </Text>
            "? This action cannot be undone.
          </Text>
          <Group
            justify="right"
            mt="xl"
          >
            <Button
              variant="outline"
              color="gray"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                onDelete(itemToDelete.id);
              }}
              loading={isSubmitting}
            >
              Delete
            </Button>
          </Group>
        </>
      ) : (
        <Text size="sm">
          No item selected for deletion.
        </Text>
      )}
    </Modal>
  );
};

export default DeleteMenuItemModal;
