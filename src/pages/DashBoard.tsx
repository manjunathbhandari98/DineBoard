import {
  Card,
  Title,
  Text,
  Table,
  Group,
} from "@mantine/core";
import {
  IconMenu2,
  IconCategory,
  IconEye,
  IconDeviceMobile,
} from "@tabler/icons-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { getHotelByUser } from "../service/hotelService";
import { getProfileInfo } from "../service/userService";
import { setProfile } from "../slice/userSlice";
import { Menu } from "../interface";
import {
  getCategoryByMenu,
  getMenu,
  getMenuItems,
} from "../service/menuService";

const Dashboard = () => {
  const [hotelId, setHotelId] = useState();
  const [menu, setMenu] = useState<any>(null);
  const [category, setCategory] =
    useState<any>(null);
  const [totalViews, setTotalViews] = useState(0);
  const [menuItems, setMenuItems] =
    useState<any>(null);

  const fetchProfileAndHotel =
    useCallback(async () => {
      try {
        const profileData =
          await getProfileInfo();
        setProfile(profileData);
        if (profileData?.id) {
          const hotelData = await getHotelByUser(
            profileData.id
          );
          setHotelId(hotelData.id);
        } else {
          console.error("Profile ID not found.");
        }
      } catch (error) {
        console.error(
          "Error fetching profile or hotel:",
          error
        );
        // Show error notification
      }
    }, []);

  const fetchMenus = useCallback(async () => {
    if (!hotelId) return;
    try {
      const data = await getMenu(hotelId);
      setMenu(data);
      const total = data.reduce(
        (acc: any, menu: any) =>
          acc + (menu.viewCount || 0),
        0
      );
      setTotalViews(total);
    } catch (error) {
      console.error(
        "Error fetching menus:",
        error
      );
    }
  }, [hotelId]);

  const fetchCategories =
    useCallback(async () => {
      if (!menu || !Array.isArray(menu)) return;

      try {
        const categoryPromises = menu.map(
          (m: any) => getCategoryByMenu(m.id)
        );
        const allCategories = await Promise.all(
          categoryPromises
        );

        // Flatten the array of arrays
        const combined = allCategories.flat();
        setCategory(combined);
      } catch (error) {
        console.error(
          "Error fetching Categories:",
          error
        );
      }
    }, [menu]);

  const fetchMenuItems = useCallback(async () => {
    if (!menu || !Array.isArray(menu)) return;

    try {
      const itemPromises = menu.map((m: any) =>
        getMenuItems(m.id)
      );
      const allItems = await Promise.all(
        itemPromises
      );

      const combinedItems = allItems.flat();
      setMenuItems(combinedItems);
    } catch (error) {
      console.error(
        "Error fetching Menu Items:",
        error
      );
    }
  }, [menu]);

  useEffect(() => {
    fetchProfileAndHotel();
  }, [fetchProfileAndHotel]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  return (
    <div className="p-6 space-y-8 min-h-screen">
      <Title order={2}>Dashboard</Title>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          shadow="md"
          padding="lg"
          radius="md"
          withBorder
        >
          <div className="flex items-center justify-between">
            <div>
              <Text
                size="sm"
                color="dimmed"
              >
                Total Menus
              </Text>
              <Title order={3}>
                {menu?.length}
              </Title>
            </div>
            <IconMenu2
              size={32}
              className="text-teal-500"
            />
          </div>
        </Card>

        <Card
          shadow="md"
          padding="lg"
          radius="md"
          withBorder
        >
          <div className="flex items-center justify-between">
            <div>
              <Text
                size="sm"
                color="dimmed"
              >
                Total Categories
              </Text>
              <Title order={3}>
                {category?.length}
              </Title>
            </div>
            <IconCategory
              size={32}
              className="text-indigo-500"
            />
          </div>
        </Card>

        <Card
          shadow="md"
          padding="lg"
          radius="md"
          withBorder
        >
          <div className="flex items-center justify-between">
            <div>
              <Text
                size="sm"
                color="dimmed"
              >
                Views Today
              </Text>
              <Title order={3}>
                {totalViews}
              </Title>
            </div>
            <IconEye
              size={32}
              className="text-blue-500"
            />
          </div>
        </Card>

        <Card
          shadow="md"
          padding="lg"
          radius="md"
          withBorder
        >
          <div className="flex items-center justify-between">
            <div>
              <Text
                size="sm"
                color="dimmed"
              >
                Total Items
              </Text>
              <Title order={3}>
                {menuItems?.length}
              </Title>
            </div>
            <IconDeviceMobile
              size={32}
              className="text-orange-500"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
