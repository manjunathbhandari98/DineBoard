import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash
} from "@tabler/icons-react";
import { MenuItem } from "../../interface"; // adjust path

interface Props {
  items: MenuItem[];
  isLoading: boolean;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

const MenuItemsGrid = ({
  items,
  isLoading,
  onEdit,
  onDelete,
}: Props) => {
  if (isLoading) {
    return (
      <Group
        justify="center"
        p="lg"
      >
        <Loader size="sm" />
        <Text>Loading items...</Text>
      </Group>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Text
        c="dimmed"
        ta="center"
        mt="md"
      >
        No items in this category yet.
      </Text>
    );
  }

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3 }}
      mt="md"
      spacing="md"
    >
      {items.map((item) => (
        <Card
          key={item.id}
          shadow="md" // Slightly stronger shadow for better definition
          padding="md"
          radius="md"
          withBorder
        >
          <Stack
            justify="space-between"
            h="100%"
          >
            {" "}
            {/* Use Stack for vertical layout */}
            {item.itemImage && (
              <Card.Section>
                <Image
                  src={item.itemImage instanceof File ? URL.createObjectURL(item.itemImage) : item.itemImage}
                  height={120}
                  alt={item.name}
                  fit="cover"
                  radius="sm" // Add some border radius to the image
                />
              </Card.Section>
            )}
            <Stack
              gap="xs"
              mt={item.itemImage ? "md" : 0}
            >
              <Text
                fw={600}
                size="lg"
                lineClamp={1}
              >
                {item.name}
              </Text>
              <Text
                size="sm"
                c="dimmed"
                lineClamp={2}
              >
                {item.description ||
                  "No description."}
              </Text>
              <Text
                fw={700}
                size="md"
              >
                ₹{item.price.toFixed(2)}
              </Text>
            </Stack>
            <Flex
              justify="end"
              mt="md"
            >
              {" "}
              {/* Use Flex for horizontal button alignment */}
              <Tooltip label="Edit">
                <ActionIcon
                  variant="light"
                  color="blue"
                  radius="md" // Slightly smaller radius for a cleaner look
                  size="sm" // Smaller size for action icons
                  onClick={() => onEdit(item)}
                  className="transition-all hover:scale-105" // Subtle hover effect
                >
                  <IconEdit size={16} />{" "}
                  {/* Smaller icons */}
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon
                  variant="light"
                  color="red"
                  radius="md"
                  size="sm"
                  onClick={() => onDelete(item)}
                  className="transition-all hover:scale-105"
                  ml="xs" // Add some spacing between the icons
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            </Flex>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default MenuItemsGrid;
