import React from "react";
import {
  Card,
  Grid,
  Image,
  Tabs,
  Text,
  Title,
} from "@mantine/core";

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

const categories = [
  "Starters",
  "Main Course",
  "Desserts",
  "Beverages",
];

const PreviewMenu: React.FC<PreviewMenuProps> = ({
  menus,
  menuItems,
}) => {
  const publishedMenus = menus.filter(
    (menu) => menu.published
  );

  return (
    <div className="p-6">
      <Title
        order={2}
        className="mb-6"
      >
        Menu Preview
      </Title>

      {publishedMenus.length === 0 ? (
        <Text>
          No published menus to preview.
        </Text>
      ) : (
        publishedMenus.map((menu) => (
          <div
            key={menu.name}
            className="mb-12"
          >
            <Title
              order={3}
              className="mb-4"
            >
              {menu.name}
            </Title>
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
                  pt="sm"
                >
                  <Grid>
                    {menuItems
                      .filter(
                        (item) =>
                          item.menu ===
                            menu.name &&
                          item.category === cat
                      )
                      .map((item) => (
                        <Grid.Col
                          key={item.id}
                          span={4}
                        >
                          <Card
                            withBorder
                            radius="md"
                            p="md"
                          >
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
                            <Text
                              fw={500}
                              size="lg"
                              mt="md"
                            >
                              {item.name}
                            </Text>
                            <Text
                              size="sm"
                              c="dimmed"
                              mt={5}
                            >
                              {item.description}
                            </Text>
                            <Text
                              fw={700}
                              mt="md"
                            >
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
