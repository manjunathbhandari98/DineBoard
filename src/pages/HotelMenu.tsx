import {
  Button,
  Card,
  Group,
  Modal,
  Text,
  TextInput,
  Textarea,
  Title,
  Select,
  Grid,
  Tabs,
} from "@mantine/core";
import {
  IconPlus,
  IconEdit,
  IconEye,
} from "@tabler/icons-react";
import { useState } from "react";
import PreviewMenu from "./PreviewMenu";

const HotelMenu = () => {
  const [modalOpen, setModalOpen] =
    useState(false); // Menu item modal
  const [
    categoryModalOpen,
    setCategoryModalOpen,
  ] = useState(false); // Category modal
  const [newCategory, setNewCategory] =
    useState("");
  const [previewMode, setPreviewMode] =
    useState(false);

  const [categories, setCategories] = useState([
    "Main Course",
    "Biryani",
    "Desserts",
    "Starters",
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Paneer Tikka",
      category: "Starters",
      price: "220",
      description:
        "Creamy tomato-based curry with cottage cheese cubes.",
      image:
        "https://imgs.search.brave.com/FuYPwCqFYn2vkoDs-6kxN7g7B9urpioml8wBoK2fAnw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFuaGVhbHRo/eXJlY2lwZXMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE0/LzExL3BhbmVlci10/aWtrYS53ZWJw",
    },
    {
      id: 2,
      name: "Butter Chicken",
      category: "Main Course",
      price: "290",
      description:
        "Creamy tomato-based curry with cottage cheese cubes.",
      image:
        "https://imgs.search.brave.com/u_8EIbixvlHiPqF9SyvNFqaQdzi_vwVciJDp64WruBo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzYzLzk5Lzg3/LzM2MF9GXzI2Mzk5/ODcwMV9HS2xBTVh2/V1RYbUlUb3NQcXhl/S1dxNTVPU0hoVWds/YS5qcGc",
    },
    {
      id: 3,
      name: "Veg Biryani",
      category: "Biryani",
      price: "240",
      description:
        "Creamy tomato-based curry with cottage cheese cubes.",
      image:
        "https://imgs.search.brave.com/LdJTAmgSUI7TR7Klm1QNHK2BS9r_EO9wgekD--d2KJo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVycmFmb29kLmNv/LmluL2Nkbi9zaG9w/L2ZpbGVzL1ZlZ0Jp/cnlhbmkuanBnP3Y9/MTY4Nzc2NjU5MiZ3/aWR0aD0xOTQ2",
    },
    {
      id: 4,
      name: "Gulab Jamun",
      category: "Desserts",
      price: "120",
      description:
        "Creamy tomato-based curry with cottage cheese cubes.",
      image:
        "https://imgs.search.brave.com/b9F-pkzI1WGsvbU249yQTOXKdN9E5Y-5yS0lk70mb5g/rs:fit:860:0:0:0/g:ce/aHR0cDovL2Zhcm04/LnN0YXRpY2ZsaWNr/ci5jb20vNzIyNy82/OTU0ODY0MTcyX2Yw/OTBkYjZiYjVfei5q/cGc",
    },
    {
      id: 5,
      name: "Chicken Biryani",
      category: "Biryani",
      price: "300",
      description:
        "Creamy tomato-based curry with cottage cheese cubes.",
      image:
        "https://imgs.search.brave.com/P8jeDn_SJRCJvQUTLNQxHC-Ul-mYL_bO1woGjwbX-uI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/NDc2OTIxNy9waG90/by9jaGlja2VuLWR1/bS1iaXJ5YW5pLWlu/LXRvcm9udG8tb250/YXJpby1jYW5hZGEt/b24tbm92ZW1iZXIt/MTItMjAyMi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ZDBr/X0lCXzFKcGE4YVFq/ak5BX2dNbkZQMUZ2/TUhmSHByalRaUVFw/NHplST0",
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleAddItem = () => {
    const newMenuItem = {
      ...newItem,
      id: Date.now(),
    };
    setMenuItems((prev) => [
      ...prev,
      newMenuItem,
    ]);
    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    setModalOpen(false);
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
    }
    setNewCategory("");
    setCategoryModalOpen(false);
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <Group
        justify="space-between"
        className="mb-6"
      >
        <Title order={2}>Manage Menu</Title>
        <Group>
          <Button
            onClick={() =>
              setPreviewMode((prev) => !prev)
            }
            variant="outline"
            leftSection={<IconEye size={18} />}
          >
            {previewMode
              ? "Exit Preview"
              : "Preview Menu"}
          </Button>
          <Button
            onClick={() => setModalOpen(true)}
            leftSection={<IconPlus size={18} />}
          >
            Add Item
          </Button>
          <Button
            onClick={() =>
              setCategoryModalOpen(true)
            }
            leftSection={<IconPlus size={18} />}
          >
            Add Category
          </Button>
        </Group>
      </Group>

      {previewMode ? (
        <PreviewMenu />
      ) : (
        <Tabs defaultValue={categories[0]}>
          <Tabs.List>
            {categories.map((cat) => (
              <Tabs.Tab
                key={cat}
                value={cat}
              >
                {cat}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {categories.map((cat) => (
            <Tabs.Panel
              key={cat}
              value={cat}
              pt="xs"
            >
              <Grid>
                {menuItems
                  .filter(
                    (item) =>
                      item.category === cat
                  )
                  .map((item) => (
                    <Grid.Col
                      key={item.id}
                      span={{
                        base: 12,
                        sm: 6,
                        md: 4,
                      }}
                    >
                      <Card
                        shadow="sm"
                        radius="md"
                        withBorder
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-40 object-cover rounded-t-md mb-3"
                          />
                        )}
                        <Title order={5}>
                          {item.name}
                        </Title>
                        <Text
                          size="sm"
                          color="dimmed"
                          className="mb-2"
                        >
                          {item.description}
                        </Text>
                        <Group justify="apart">
                          <Text fw={500}>
                            ₹{item.price}
                          </Text>
                          <Button
                            variant="light"
                            size="xs"
                            leftSection={
                              <IconEdit
                                size={16}
                              />
                            }
                          >
                            Edit
                          </Button>
                        </Group>
                      </Card>
                    </Grid.Col>
                  ))}
              </Grid>
            </Tabs.Panel>
          ))}
        </Tabs>
      )}

      {/* Modal: Add New Menu Item */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Menu Item"
        centered
      >
        <TextInput
          label="Item Name"
          placeholder="Enter item name"
          value={newItem.name}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              name: e.target.value,
            })
          }
        />
        <Textarea
          label="Description"
          placeholder="Short description"
          className="mt-4"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              description: e.target.value,
            })
          }
        />
        <TextInput
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          className="mt-4"
          value={newItem.image}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              image: e.target.value,
            })
          }
        />

        <TextInput
          label="Price"
          placeholder="e.g. 250"
          type="number"
          className="mt-4"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              price: e.target.value,
            })
          }
        />
        <Select
          label="Category"
          placeholder="Select category"
          data={categories}
          className="mt-4"
          value={newItem.category}
          onChange={(value) =>
            setNewItem({
              ...newItem,
              category: value || "",
            })
          }
        />
        <Button
          fullWidth
          className="mt-6"
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </Modal>

      {/* Modal: Add New Category */}
      <Modal
        opened={categoryModalOpen}
        onClose={() =>
          setCategoryModalOpen(false)
        }
        title="Add New Category"
        centered
      >
        <TextInput
          label="Category Name"
          placeholder="e.g. Appetizers"
          value={newCategory}
          onChange={(e) =>
            setNewCategory(e.target.value)
          }
        />
        <Button
          fullWidth
          className="mt-4"
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </Modal>
    </div>
  );
};

export default HotelMenu;
