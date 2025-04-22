import {
  Card,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { MenuItem } from "../../interface"; // adjust path

interface Props {
  items: MenuItem[];
  isLoading: boolean;
}

const MenuItemsGrid = ({
  items,
  isLoading,
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
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
        >
          {item.itemImage && (
            <Card.Section>
              <Image
                src={item.itemImage}
                height={120}
                alt={item.name}
                fit="cover"
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
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default MenuItemsGrid;
