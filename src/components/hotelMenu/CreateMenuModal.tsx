// components/CreateMenuModal.tsx
import {
  Modal,
  TextInput,
  Button,
} from "@mantine/core";

interface CreateMenuModalProps {
  opened: boolean;
  onClose: () => void;
  newMenuName: string;
  setNewMenuName: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isEditMode?: boolean;
}

export default function CreateMenuModal({
  opened,
  onClose,
  newMenuName,
  setNewMenuName,
  onSubmit,
  isSubmitting,
  isEditMode,
}: CreateMenuModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        isEditMode
          ? "Update Menu"
          : "Create New Menu"
      }
      centered
    >
      <TextInput
        label="Menu Name"
        value={newMenuName}
        onChange={(e) =>
          setNewMenuName(e.currentTarget.value)
        }
      />
      <Button
        mt="md"
        fullWidth
        onClick={onSubmit}
        loading={isSubmitting}
      >
        {isEditMode
          ? "Update Menu"
          : "Create Menu"}
      </Button>
    </Modal>
  );
}
