import {
  Button,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import {
  IconListDetails,
  IconPlus,
} from "@tabler/icons-react";

interface Props {
  onClick: () => void;
}

const EmptyMenuNotice = ({ onClick }: Props) => (
  <Paper
    withBorder
    p="xl"
    radius="md"
    style={{ textAlign: "center" }}
  >
    <IconListDetails
      size={48}
      stroke={1.5}
      style={{ opacity: 0.6, marginBottom: 16 }}
    />
    <Title
      order={3}
      mb="sm"
    >
      No menus created yet
    </Title>
    <Text
      c="dimmed"
      mb="lg"
    >
      Get started by adding your first menu.
    </Text>
    <Button
      leftSection={<IconPlus size={18} />}
      onClick={onClick}
    >
      Add Your First Menu
    </Button>
  </Paper>
);

export default EmptyMenuNotice;
