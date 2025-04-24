// components/AddItemModal.tsx
import {
  Modal,
  TextInput,
  Button,
} from "@mantine/core";

interface EditCategoryModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  categoryName: string;
  setCategoryName: (val: string) => void;
}

const EditCategoryModal = ({
  opened,
  onClose,
  onSubmit,
  isSubmitting,
  categoryName,
  setCategoryName,
}: EditCategoryModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Category"
      centered
    >
      <TextInput
        label="Category Name"
        value={categoryName}
        onChange={(e) =>
          setCategoryName(e.currentTarget.value)
        }
      />

      <Button
        mt="md"
        fullWidth
        onClick={onSubmit}
        loading={isSubmitting}
      >
        Update Category
      </Button>
    </Modal>
  );
};

export default EditCategoryModal;
