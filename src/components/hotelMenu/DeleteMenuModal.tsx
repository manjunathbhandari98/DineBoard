// components/DeleteMenuModal.tsx
import {
  Modal,
  Button,
  Text,
} from "@mantine/core";

interface DeleteMenuModalProps {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
}

export default function DeleteMenuModal({
  opened,
  onClose,
  onDelete,
  isSubmitting,
}: DeleteMenuModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
        Are you sure you want to delete this menu?
        This action cannot be undone.
      </Text>

      <div className="flex gap-4">
        <Button
          fullWidth
          color="red"
          onClick={onDelete}
          loading={isSubmitting}
        >
          Yes, Delete
        </Button>
        <Button
          fullWidth
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
