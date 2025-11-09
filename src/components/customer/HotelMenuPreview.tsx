import {
  Button,
  Container,
  Divider,
  Group,
  Image,
  Input,
  Loader,
  Modal,
  SegmentedControl,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPhoto, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCategoryByMenu,
  getMenuById,
  getMenuItems,
  trackMenuView,
} from "../../service/menuService";
import LanguageMenu from "../LanguageMenu";

const HotelMenuPreview = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        trackMenuView(id);

        const [menu, menuItems, cats] = await Promise.all([
          getMenuById(id),
          getMenuItems(id),
          getCategoryByMenu(id),
        ]);
        setHotel(menu.hotel);
        setItems(menuItems);

        // Align category field names correctly
        const formattedCategories = cats.map((c: any) => ({
          categoryId: c.categoryId,
          categoryName: c.categoryName,
        }));

        // Ensure "All" matches the same structure
        setCategories([
          { categoryId: "all", categoryName: "All" },
          ...formattedCategories,
        ]);
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Proper filter using nested categoryId or direct match
  const filteredItems = items
    .filter((item) => {
      if (selectedCategory === "all") return true;

      // Match if item.category exists
      const itemCatId =
        item.categoryId || item.category?.categoryId || item.category_id;

      return itemCatId === selectedCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    );

  // Group items under category name
  const groupedByCategory = filteredItems.reduce((acc: any, item) => {
    const categoryName =
      item.category?.categoryName || item.categoryName || "Uncategorized";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader color="orange" size={32} variant="dots" />
      </div>
    );
  }

  return (
    <Container size="md" py={isMobile ? 20 : 40}>
      {/* Header */}
      <div className="text-center mb-8">
        {hotel?.logoUrl && (
          <img
            src={hotel.logoUrl}
            alt={hotel.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
          />
        )}
        <Title order={1} className="text-3xl font-extrabold mb-2">
          {hotel?.name || "Restaurant Menu"}
        </Title>
        <Text color="dimmed">{hotel?.address}</Text>
      </div>

      {/* Search + Filter */}
      <Group
        align="center"
        justify="space-between"
        mb={isMobile ? "md" : "xl"}
        gap="md"
      >
        <Input
          placeholder="Search for dishes..."
          leftSection={<IconSearch size={18} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          className="w-full md:w-1/2"
          radius="md"
        />
        <LanguageMenu />
      </Group>

      {/* Category Tabs */}
      {categories.length > 1 && (
        <div className="mb-8 overflow-x-auto no-scrollbar">
          <SegmentedControl
            data={categories.map((cat) => ({
              label: cat.categoryName,
              value: cat.categoryId,
            }))}
            value={selectedCategory}
            onChange={setSelectedCategory}
            color="orange"
            radius="xl"
            fullWidth={isMobile}
          />
        </div>
      )}

      {/* Menu Sections */}
      {Object.keys(groupedByCategory).length > 0 ? (
        <div className="space-y-10">
          {Object.entries(groupedByCategory).map(
            ([categoryName, categoryItems]) => (
              <div key={categoryName}>
                <Title
                  order={3}
                  className="text-xl font-semibold mb-3 border-l-4 border-orange-500 pl-3"
                >
                  {categoryName}
                </Title>
                <Divider mb="sm" />
                <div className="space-y-4">
                  {(categoryItems as any[]).map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start p-3 hover:bg-gray-50 rounded-lg transition"
                    >
                      <div className="flex flex-col w-full pr-4">
                        <Text fw={600} size={isMobile ? "md" : "lg"}>
                          {item.name}
                        </Text>
                        {item.description && (
                          <Text size="sm" color="dimmed" mt={2}>
                            {item.description}
                          </Text>
                        )}
                      </div>

                      <div className="flex flex-col items-end text-right">
                        <Text
                          fw={600}
                          size={isMobile ? "md" : "lg"}
                          color="orange"
                        >
                          ₹{item.price}
                        </Text>
                        {item.itemImage && (
                          <Button
                            variant="subtle"
                            leftSection={<IconPhoto size={16} />}
                            color="gray"
                            mt={2}
                            onClick={() => setSelectedImage(item.itemImage)}
                          >
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <Text size="lg" fw={600}>
            No items found
          </Text>
          <Text size="sm" color="dimmed">
            Try changing the category or search term.
          </Text>
        </div>
      )}

      {/* Image Modal */}
      <Modal
        opened={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        centered
        size="md"
        title="Dish Image"
      >
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Menu Item"
            radius="md"
            className="shadow-md"
          />
        )}
      </Modal>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-10 text-sm mt-16">
        <Text>
          Powered by{" "}
          <span className="font-semibold text-orange-500">DineBoard</span>
        </Text>
      </footer>
    </Container>
  );
};

export default HotelMenuPreview;
