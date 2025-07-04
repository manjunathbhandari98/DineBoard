import {
  Card,
  Container,
  Grid,
  Image,
  Input,
  Loader,
  SegmentedControl,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../../service/hotelService";
import {
  getCategoryByMenu,
  getMenuById,
  getMenuItems,
  trackMenuView,
} from "../../service/menuService";
import LanguageMenu from "../LanguageMenu";

const HotelMenuPreview = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [menus, setMenus] = useState<any>(null);
  const [allMenuItems, setAllMenuItems] =
    useState<any[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string }[]
  >([]);
  const [categoryId, setCategoryId] =
    useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState<any>("");
  const isMobile = useMediaQuery(
    "(max-width: 768px)"
  ); // Define mobile breakpoint

  useEffect(() => {
    if (!id) return;
    trackMenuView(id);
    const fetchMenu = async () => {
      try {
        const response = await getMenuById(id);
        setMenus(response);
      } catch (err) {
        console.error(
          "Failed to fetch menu:",
          err
        );
      }
    };

    const fetchAllMenuItems = async () => {
      try {
        setLoading(true);
        const response = await getMenuItems(id);
        setAllMenuItems(response);
      } catch (err) {
        console.error(
          "Failed to fetch menu items:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategoryByMenu(
          id
        );
        const allOption = {
          id: "all",
          name: "All",
        };
        setCategories([allOption, ...response]);
      } catch (err) {
        console.error(
          "Failed to fetch categories:",
          err
        );
      }
    };

    fetchMenu();
    fetchAllMenuItems();
    fetchCategories();
  }, [id]);

  useEffect(() => {
    if (!menus?.hotelId) return;

    const fetchHotel = async () => {
      try {
        const response = await getHotelById(
          menus.hotelId
        );
        setHotel(response);
      } catch (err) {
        console.error(
          "Failed to fetch hotel:",
          err
        );
      }
    };

    fetchHotel();
  }, [menus]);

  const filteredMenu = allMenuItems
    .filter(
      (item) =>
        categoryId === "all" ||
        item.categoryId === categoryId
    )
    .filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader variant="dots" />
      </div>
    );
  }

  return (
    <Container
      size="md"
      py={isMobile ? 20 : 40} // Adjust vertical padding for mobile
    >
      <div className="flex flex-col items-center">
        <img
          src={hotel?.logoUrl}
          alt={hotel?.name}
          className="w-24 h-24 rounded-full mb-4 object-cover shadow-md" // Increased size, added shadow
        />
        <Title
          order={1} // Changed to h1 for better semantics and larger size on mobile
          className="text-center mb-6 text-3xl font-bold text-gray-800" // Improved typography
        >
          {hotel?.name || "Our Restaurant"}
        </Title>
      </div>

      <div
        className={`flex flex-col ${
          isMobile
            ? "gap-4"
            : "md:flex-row md:items-center md:justify-between gap-6"
        } mb-6`} // Responsive layout for search and categories
      >
        <div className="flex gap-3 items-center w-full">
          <Input
            leftSection={
              <IconSearch
                size={18}
                className="text-gray-500"
              />
            } // Increased icon size
            placeholder="Search dishes..."
            value={search}
            onChange={(e) =>
              setSearch(e.currentTarget.value)
            }
            className="w-full" // Input takes full width on mobile
            style={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }} // Added some styling
          />
          <LanguageMenu />
        </div>

        {categories.length > 0 && (
          <div
            className={`overflow-x-auto no-scrollbar w-full ${
              isMobile
                ? "flex flex-nowrap"
                : "md:flex-wrap"
            }`} // Ensure categories wrap on desktop, scroll on mobile
          >
            <SegmentedControl
              data={categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
              value={categoryId}
              onChange={setCategoryId}
              fullWidth
              className="min-w-max"
              style={{
                backgroundColor: "#f0f0f0",
                padding: "4px",
                borderRadius: "8px",
              }} // Added background to the whole control
            >
              {/* Override styles for individual segments */}
              <div
                data-value="all"
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: isMobile
                    ? "0.8rem"
                    : "0.9rem",
                }}
              >
                All
              </div>
              {categories.slice(1).map((cat) => (
                <div
                  key={cat.id}
                  data-value={cat.id}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: isMobile
                      ? "0.8rem"
                      : "0.9rem",
                  }}
                >
                  {cat.name}
                </div>
              ))}
            </SegmentedControl>
          </div>
        )}
      </div>

      <Grid gutter={isMobile ? 16 : "md"}>
        {filteredMenu.map((item) => (
          <Grid.Col
            key={item.id}
            span={{ base: 12, sm: 6, md: 4 }}
          >
            <Card
              shadow="md" // Slightly stronger shadow
              padding={isMobile ? "md" : "lg"} // Adjust padding for mobile
              radius="lg" // More rounded corners
              withBorder
              className="h-full flex flex-col transition-transform transform hover:scale-105" // Added hover effect
              style={{
                backgroundColor: "white", // Explicit white background
                border: "1px solid #e0e0e0",
              }}
            >
              <Card.Section>
                {item.itemImage ? (
                  <Image
                    src={item.itemImage}
                    height={isMobile ? 150 : 180} // Adjusted image height
                    alt={item.name}
                    className="rounded-md object-cover" // Ensure image is rounded
                  />
                ) : (
                  <div className="h-[150px] bg-gray-100 flex items-center justify-center text-gray-400 rounded-md">
                    No Image
                  </div>
                )}
              </Card.Section>

              <div className="mt-4">
                <Text
                  size={isMobile ? "md" : "lg"} // Responsive font size
                  fw={600} // Use semibold
                  className="text-gray-800"
                >
                  {item.name}
                </Text>
                <Text
                  c="dimmed"
                  size={isMobile ? "sm" : "md"} // Responsive font size
                  className="text-gray-600"
                >
                  {item.category}
                </Text>
                <Text
                  size={isMobile ? "md" : "lg"}
                  className="mt-2 font-semibold text-orange-500" // Use a vibrant color
                >
                  ₹{item.price}
                </Text>
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <footer className="text-center text-gray-500 py-8 text-sm">
        Developed by Dineboard
      </footer>
    </Container>
  );
};

export default HotelMenuPreview;
