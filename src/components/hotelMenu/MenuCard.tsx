import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconToolsKitchen2,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Menu } from "../../interface"; // Replace with your actual types

interface Props {
  menu: Menu;
  activeMenu: Menu | null;
  setActiveMenu: (menu: Menu) => void;
  onPublish: () => void;
  isSubmitting: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const MenuCard = ({
  menu,
  activeMenu,
  setActiveMenu,
  onPublish,
  isSubmitting,
  onEdit,
  onDelete,
}: Props) => (
  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
  >
    <Group justify="space-between">
      <Stack gap={0}>
        <Text
          fw={600}
          size="lg"
        >
          {menu.title}
        </Text>
        <Text
          size="xs"
          c="dimmed"
        >
          ID: {menu.id}
        </Text>
      </Stack>
      <Group>
        <Badge
          color={
            menu.isPublished ? "teal" : "yellow"
          }
          variant="light"
        >
          {menu.isPublished
            ? "Published"
            : "Draft"}
        </Badge>
        <Button
          size="sm"
          variant={
            activeMenu?.id === menu.id
              ? "light"
              : "subtle"
          }
          onClick={() => setActiveMenu(menu)}
          leftSection={
            <IconToolsKitchen2 size={16} />
          }
        >
          Manage
        </Button>
        {!menu.isPublished ? (
          <Button
            size="sm"
            color="green"
            onClick={onPublish} // Calling the onPublish function
            disabled={isSubmitting}
            loading={
              isSubmitting &&
              activeMenu?.id === menu.id
            }
          >
            Publish
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            component="a"
            href={`/customer-menu/${menu.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview
          </Button>
        )}
        <IconPencil
          color="blue"
          className="cursor-pointer"
          onClick={onEdit}
        />
        <IconTrash
          color="red"
          className="cursor-pointer"
          onClick={onDelete}
        />
      </Group>
    </Group>
  </Card>
);

export default MenuCard;
