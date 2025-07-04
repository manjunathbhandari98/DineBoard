import {
  Card,
  Grid,
  Image,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import React, {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import {
  getCategoryByMenu,
  getMenuById,
  getMenuItems,
} from "../service/menuService";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  menu: string;
}

interface Menu {
  name: string;
  published: boolean;
}

interface PreviewMenuProps {
  menus: Menu[];
  menuItems: MenuItem[];
}

const PreviewMenu: React.FC<
  PreviewMenuProps
> = () => {
  const { id } = useParams<{ id: string }>();
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState<
    MenuItem[]
  >([]);
  const [categories, setCategories] = useState<
    string[]
  >([]);
  const [categoryId, setCategoryId] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    string | null
  >(null);
  const publishedMenus = menus.filter(
    (menu: any) => menu?.isPublished
  );

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getMenuById(id);
          setMenus(response);
        } else {
          throw new Error("No menu ID provided.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch menu.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id]);
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getMenuItems(id);
          setMenuItems(response);
        } else {
          throw new Error("No menu ID provided.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch menu items.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, [categoryId, id, menus]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategoryByMenu(
        id
      );
      setCategories(response);
    };
    fetchCategories();
  }, [id]);

  return (
    <div className="p-6">
      <Title order={2} className="mb-6">
        Menu Preview
      </Title>
  
      {loading ? (
        <Text>Loading...</Text> // You can use Mantine's Loader here instead
      ) : error ? (
        <Text c="red">{error}</Text>
      ) : publishedMenus.length === 0 ? (
        <Text>No published menus to preview.</Text>
      ) : (
        publishedMenus.map((menu: any) => (
          <div key={menu.name} className="mb-12">
            <Title order={3} className="mb-4">
              {menu.name}
            </Title>
            <Tabs defaultValue={categories[0]}>
              <Tabs.List>
                {categories.map((cat: any) => (
                  <Tabs.Tab
                    key={cat}
                    value={cat}
                    onClick={() => setCategoryId(cat.id)}
                  >
                    {cat}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
  
              {categories.map((cat) => (
                <Tabs.Panel key={cat} value={cat} pt="sm">
                  <Grid>
                    {menuItems
                      .filter(
                        (item) =>
                          item.menu === menu.name && item.category === cat
                      )
                      .map((item) => (
                        <Grid.Col key={item.id} span={4}>
                          <Card withBorder radius="md" p="md">
                            <Card.Section>
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  height={160}
                                  alt={item.name}
                                />
                              ) : (
                                <div className="h-40 bg-gray-100 rounded-t-md flex items-center justify-center text-gray-400">
                                  No Image
                                </div>
                              )}
                            </Card.Section>
                            <Text fw={500} size="lg" mt="md">
                              {item.name}
                            </Text>
                            <Text size="sm" c="dimmed" mt={5}>
                              {item.description}
                            </Text>
                            <Text fw={700} mt="md">
                              ₹{item.price}
                            </Text>
                          </Card>
                        </Grid.Col>
                      ))}
                  </Grid>
                </Tabs.Panel>
              ))}
            </Tabs>
          </div>
        ))
      )}
    </div>
  );
  
};

export default PreviewMenu;
