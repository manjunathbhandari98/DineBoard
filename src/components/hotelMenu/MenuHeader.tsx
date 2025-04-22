import {
  Button,
  Group,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface Props {
  hotelId: string | null;
  isLoading: boolean;
  onClick: () => void;
}

const MenuHeader = ({
  hotelId,
  isLoading,
  onClick,
}: Props) => (
  <Group justify="space-between">
    <Title order={2}>Manage Menus</Title>
    <Button
      leftSection={<IconPlus size={18} />}
      onClick={onClick}
      disabled={!hotelId || isLoading}
    >
      Add New Menu
    </Button>
  </Group>
);

export default MenuHeader;
