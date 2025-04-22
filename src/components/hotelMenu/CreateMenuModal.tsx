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
}

export default function CreateMenuModal({
  opened,
  onClose,
  newMenuName,
  setNewMenuName,
  onSubmit,
  isSubmitting,
}: CreateMenuModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create New Menu"
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
        Create Menu
      </Button>
    </Modal>
  );
}
