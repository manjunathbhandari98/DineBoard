import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Button,
  Card,
  Group,
  Text,
  TextInput,
  Title,
  Modal,
  Tabs,
  NumberInput,
  Container,
  Stack,
  Badge,
  Paper,
  SimpleGrid,
  LoadingOverlay,
  Alert,
  Image,
  Textarea,
  Box,
  Loader,
  FileButton,
  FileInput, // Use Loader for specific loading states
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconAlertCircle,
  IconListDetails,
  IconToolsKitchen2,
  IconPhoto,
  IconCheck, // Added for notifications
} from "@tabler/icons-react";
import {
  createMenu,
  addMenuCategory,
  updateMenu,
  getMenu,
  getCategoryByMenu,
  addMenuItem,
  getMenuItems, // Import the service to fetch items
} from "../service/menuService"; // Assuming menuService exports getMenuItems
import { getHotelByUser } from "../service/hotelService";
import { getProfileInfo } from "../service/userService";
import { notifications } from "@mantine/notifications";
import {
  Menu,
  MenuCategory,
  Profile,
  MenuItem,
} from "../interface";
import AddItemModal from "../components/hotelMenu/AddItemModal";
import CreateMenuModal from "../components/hotelMenu/CreateMenuModal";
import MenuCard from "../components/hotelMenu/MenuCard";
import MenuHeader from "../components/hotelMenu/MenuHeader";
import EmptyMenuNotice from "../components/hotelMenu/EmptyMenuNotice";
import MenuItemsGrid from "../components/hotelMenu/MenuItemsGrid";
// Optional: Add notifications for better UX
// import { notifications } from '@mantine/notifications';

const MenuManager: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [activeMenu, setActiveMenu] =
    useState<Menu | null>(null);
  const [categories, setCategories] = useState<
    MenuCategory[]
  >([]);
  const [profile, setProfile] =
    useState<Profile | null>(null);
  const [hotelId, setHotelId] = useState<
    string | null
  >(null); // Or number

  // Loading states
  const [isInitialLoading, setIsInitialLoading] =
    useState(true); // Overall initial load
  const [
    isCategoryLoading,
    setIsCategoryLoading,
  ] = useState(false); // Loading categories for active menu
  const [isItemLoading, setIsItemLoading] =
    useState(false); // Loading items for active tab
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // State for items of the currently selected category tab
  const [
    activeCategoryItems,
    setActiveCategoryItems,
  ] = useState<MenuItem[]>([]);
  const [
    activeTabCategoryId,
    setActiveTabCategoryId,
  ] = useState<string | null>(null); // Track the active tab value (category ID)

  // Modal states
  const [
    menuModalOpened,
    {
      open: openMenuModal,
      close: closeMenuModal,
    },
  ] = useDisclosure(false);
  const [
    itemModalOpened,
    {
      open: openItemModal,
      close: closeItemModal,
    },
  ] = useDisclosure(false);

  // Form states
  const [newMenuName, setNewMenuName] =
    useState("");
  const [categoryName, setCategoryName] =
    useState("");
  const [
    selectedCategoryIdForItem,
    setSelectedCategoryIdForItem,
  ] = useState<string | null>(null); // Category ID for the "Add Item" modal

  // New item form states
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] =
    useState("");
  const [itemPrice, setItemPrice] = useState<
    number | null
  >(null);
  const [itemImage, setItemImage] =
    useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<
    string | null
  >(null);

  // --- Data Fetching ---

  // Fetch Profile and Hotel ID (runs once)
  const fetchProfileAndHotel =
    useCallback(async () => {
      setIsInitialLoading(true);
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
      } finally {
        // Loading finished after menus are fetched
        setIsInitialLoading(false);
      }
    }, []);

  // Fetch Menus list (runs when hotelId changes)
  const fetchMenus = useCallback(async () => {
    if (!hotelId) return;
    setIsInitialLoading(true); // Still part of initial load sequence
    try {
      const data = await getMenu(hotelId);
      setMenus(data);

      // If there's an active menu, refresh its data too
      if (activeMenu) {
        const refreshedActiveMenu = data.find(
          (m: Menu) => m.id === activeMenu.id
        );
        if (!refreshedActiveMenu) {
          setActiveMenu(null); // Clear active menu if it was deleted
          setCategories([]);
          setActiveCategoryItems([]);
          setActiveTabCategoryId(null);
        } else {
          setActiveMenu(refreshedActiveMenu);
          // Categories will be refetched by the other effect if activeMenu.id is stable
        }
      }
    } catch (error) {
      console.error(
        "Error fetching menus:",
        error
      );
      // Show error notification
    } finally {
      setIsInitialLoading(false); // Initial load ends here
    }
  }, [hotelId, activeMenu?.id]); // Include activeMenu.id to potentially refresh

  // Fetch Categories for the Active Menu (runs when activeMenu changes)
  const fetchCategoriesForActiveMenu =
    useCallback(async () => {
      if (!activeMenu?.id) {
        setCategories([]);
        setActiveCategoryItems([]);
        setActiveTabCategoryId(null);
        return;
      }
      setIsCategoryLoading(true);
      setActiveCategoryItems([]); // Clear items when menu changes
      setActiveTabCategoryId(null); // Clear active tab
      try {
        // This service ONLY returns categories, NOT items
        const fetchedCategories =
          await getCategoryByMenu(activeMenu.id);
        setCategories(fetchedCategories);

        // *** Automatically set the first category tab as active ***
        if (fetchedCategories.length > 0) {
          setActiveTabCategoryId(
            String(fetchedCategories[0].id)
          );
          // Items for this first tab will be fetched by the fetchItemsForActiveTab effect
        } else {
          setActiveTabCategoryId(null); // No categories, no active tab
        }
      } catch (error) {
        console.error(
          `Error fetching categories for menu ${activeMenu.id}:`,
          error
        );
        setCategories([]); // Clear on error
        // Show error notification
      } finally {
        setIsCategoryLoading(false);
      }
    }, [activeMenu?.id]);

  // *** Fetch Menu Items for the Active Category Tab ***
  const fetchItemsForActiveTab =
    useCallback(async () => {
      // Only fetch if we have an active menu and an active category tab ID
      if (
        !activeMenu?.id ||
        !activeTabCategoryId
      ) {
        setActiveCategoryItems([]); // Clear items if no active tab/menu
        return;
      }
      setIsItemLoading(true);
      try {
        // Call the specific service to get items for the active category
        const items = await getMenuItems(
          activeMenu.id,
          activeTabCategoryId
        );
        setActiveCategoryItems(items || []); // Ensure it's an array
      } catch (error) {
        console.error(
          `Error fetching items for category ${activeTabCategoryId}:`,
          error
        );
        setActiveCategoryItems([]); // Clear items on error
        // Show error notification
      } finally {
        setIsItemLoading(false);
      }
    }, [activeMenu?.id, activeTabCategoryId]); // Dependencies: menu ID and active tab ID

  // --- Triggering Effects ---
  useEffect(() => {
    fetchProfileAndHotel();
  }, [fetchProfileAndHotel]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  useEffect(() => {
    fetchCategoriesForActiveMenu();
  }, [fetchCategoriesForActiveMenu]);

  // *** New Effect to fetch items when the active tab changes ***
  useEffect(() => {
    fetchItemsForActiveTab();
  }, [fetchItemsForActiveTab]); // Runs when fetchItemsForActiveTab function identity changes (due to dependencies)

  // --- Action Handlers (Mostly unchanged, ensure IDs are passed correctly) ---

  const handleAddMenu = async () => {
    if (!newMenuName.trim() || !hotelId) return;
    setIsSubmitting(true);
    try {
      const newMenuPayload = {
        title: newMenuName,
        isPublished: false,
        hotelId: hotelId,
      };
      await createMenu(newMenuPayload);
      console.log(newMenuPayload);

      setNewMenuName("");
      closeMenuModal();
      await fetchMenus(); // Refetch menus list
      // Show success notification
    } catch (error) {
      console.error(
        "Error creating menu:",
        error
      );
      // Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim() || !activeMenu?.id)
      return;
    setIsSubmitting(true);
    try {
      const newCategoryPayload = {
        name: categoryName,
        menuId: activeMenu.id,
      };
      await addMenuCategory(newCategoryPayload);
      setCategoryName("");
      await fetchCategoriesForActiveMenu(); // Refetch categories, which will trigger item fetch for the (newly set) first tab
      // Show success notification
    } catch (error) {
      console.error(
        "Error adding category:",
        error
      );
      // Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async (menu: Menu) => {
    if (!menu?.id) return; // Now we use the passed menu instead of activeMenu
    setIsSubmitting(true);
    try {
      const updatedData = {
        ...menu,
        isPublished: true,
      };
      console.log(updatedData);

      await updateMenu(menu.id, updatedData); // Update the correct menu

      notifications.show({
        title: "Menu Published",
        message: "Menu isPublished Successfully",
        color: "green",
      });

      await fetchMenus(); // Refetch menu list
      // Show success notification
    } catch (error) {
      console.error(
        "Error publishing menu:",
        error
      );
      // Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenAddItemModal = (
    categoryId: string
  ) => {
    setSelectedCategoryIdForItem(categoryId); // Set the category ID for the item modal
    setItemName("");
    setItemDescription("");
    setItemPrice(0);
    setItemImage(null);
    setBase64Image(null);
    openItemModal();
  };

  const getBase64 = (
    file: File | null
  ): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (
    file: File | null
  ) => {
    setItemImage(file);
    getBase64(file).then(setBase64Image);
  };

  const handleItemSubmit = async () => {
    if (
      !selectedCategoryIdForItem || // Use the specific state for the modal
      !activeMenu?.id ||
      !itemName.trim() ||
      itemPrice === null ||
      itemPrice < 0
    ) {
      console.error(
        "Missing required item fields, invalid price, or no image selected."
      );
      // Show error notification
      return;
    }
    setIsSubmitting(true);
    try {
      const base64Data =
        base64Image?.split(",")[1];
      const newItemPayload: Omit<MenuItem, "id"> =
        {
          name: itemName,
          description: itemDescription,
          price: Number(itemPrice),
          menuId: activeMenu.id,
          categoryId: selectedCategoryIdForItem, // Use the correct category ID
          itemImage: base64Data,
        };
      await addMenuItem(newItemPayload);

      // *** Refetch items ONLY for the category we just added to ***
      // Check if the added item's category is the currently active tab
      if (
        selectedCategoryIdForItem ===
        activeTabCategoryId
      ) {
        await fetchItemsForActiveTab(); // Refetch items for the current tab
      }
      // No need to refetch all categories unless the count badge needs update immediately

      closeItemModal();
      setItemImage(null);
      setBase64Image(null);
      // Show success notification
    } catch (error) {
      console.error("Error adding item:", error);
      // Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render Logic ---

  // Render function remains the same, takes items array
  const renderMenuItems = (items: MenuItem[]) => {
    <MenuItemsGrid
      items={items}
      isLoading={isItemLoading}
    />;
  };

  return (
    <Container
      size="lg"
      py="xl"
    >
      <Stack gap="xl">
        {/* Header and Add Menu Button */}
        <MenuHeader
          hotelId={hotelId}
          isLoading={isInitialLoading}
          onClick={openMenuModal}
        />

        {/* Loading/Empty States */}
        <LoadingOverlay
          visible={isInitialLoading}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        {!isInitialLoading && !hotelId && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Hotel Not Found"
            color="orange"
          >
            Could not find an associated hotel.
            Please ensure your profile is linked.
          </Alert>
        )}

        {!isInitialLoading &&
          hotelId &&
          menus.length === 0 && (
            <EmptyMenuNotice
              onClick={openMenuModal}
            />
          )}

        {/* Menu List */}
        {!isInitialLoading &&
          hotelId &&
          menus.length > 0 && (
            <Stack gap="md">
              {menus.map((menu) => (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  onPublish={() =>
                    handlePublish(menu)
                  }
                  isSubmitting={isSubmitting}
                />
              ))}
            </Stack>
          )}

        {/* --- Active Menu Management Section --- */}
        {activeMenu && (
          <Paper
            shadow="md"
            p="xl"
            mt="xl"
            radius="md"
            withBorder
            pos="relative"
          >
            {/* Overlay for category loading */}
            <LoadingOverlay
              visible={isCategoryLoading}
              overlayProps={{
                radius: "sm",
                blur: 1,
              }}
            />
            <Stack gap="lg">
              <Title order={3}>
                Manage: {activeMenu.title}
              </Title>

              {/* Add Category Form */}
              <Paper
                withBorder
                p="md"
                radius="sm"
              >
                <Group align="flex-end">
                  <TextInput
                    label="New Category Name"
                    placeholder="e.g., Appetizers, Main Course"
                    value={categoryName}
                    onChange={(e) =>
                      setCategoryName(
                        e.currentTarget.value
                      )
                    }
                    style={{ flexGrow: 1 }}
                    disabled={
                      isSubmitting ||
                      isCategoryLoading
                    }
                  />
                  <Button
                    onClick={handleAddCategory}
                    disabled={
                      !categoryName.trim() ||
                      isSubmitting ||
                      isCategoryLoading
                    }
                    loading={
                      isSubmitting &&
                      categoryName.trim() !== ""
                    }
                  >
                    Add Category
                  </Button>
                </Group>
              </Paper>

              {/* Categories and Items Tabs */}
              <Box mt="lg">
                {isCategoryLoading ? (
                  <Group
                    justify="center"
                    p="lg"
                  >
                    <Loader size="sm" />
                    <Text>
                      Loading categories...
                    </Text>
                  </Group>
                ) : categories.length === 0 ? (
                  <Text
                    c="dimmed"
                    ta="center"
                    mt="md"
                  >
                    No categories added yet for "
                    {activeMenu.title}". Use the
                    form above.
                  </Text>
                ) : (
                  <Tabs
                    // Controlled component: value is state, onChange updates state
                    value={activeTabCategoryId} // Controlled by state
                    onChange={
                      setActiveTabCategoryId
                    } // Update state on tab change -> triggers item fetch effect
                    keepMounted={false}
                  >
                    <Tabs.List>
                      {categories.map((cat) => (
                        <Tabs.Tab
                          key={cat.id}
                          value={String(cat.id)} // Value must be string
                          // Optional: Show loading indicator on the specific tab being loaded
                          // rightSection={isItemLoading && activeTabCategoryId === String(cat.id) ? <Loader size="xs" /> : null}
                        >
                          {cat.name}
                          {/* Item count badge is tricky now as items load separately.
                                                    Could show count once loaded, or remove it. */}
                          {/* <Badge size="xs" circle ml="xs">{activeTabCategoryId === String(cat.id) ? activeCategoryItems.length : '?'}</Badge> */}
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>

                    {/* Render only ONE panel's content: the active one */}
                    {/* We find the active category and render its items */}
                    {categories.map((cat) => (
                      <Tabs.Panel
                        key={cat.id}
                        value={String(cat.id)} // Value must be string
                        pt="lg"
                      >
                        <Stack gap="md">
                          <Group justify="flex-end">
                            {" "}
                            {/* Button now just on the right */}
                            <Button
                              leftSection={
                                <IconPlus
                                  size={16}
                                />
                              }
                              size="xs"
                              variant="light"
                              // Pass the actual category ID of this panel
                              onClick={() =>
                                handleOpenAddItemModal(
                                  String(cat.id)
                                )
                              }
                            >
                              Add Item to{" "}
                              {cat.name}
                            </Button>
                          </Group>

                          <MenuItemsGrid
                            items={
                              activeCategoryItems ||
                              []
                            }
                            isLoading={
                              isItemLoading
                            }
                          />
                        </Stack>
                      </Tabs.Panel>
                    ))}
                  </Tabs>
                )}
              </Box>
            </Stack>
          </Paper>
        )}
      </Stack>

      {/* --- Modals (Unchanged, ensure IDs are handled correctly) --- */}

      <CreateMenuModal
        opened={menuModalOpened}
        onClose={closeMenuModal}
        newMenuName={newMenuName}
        setNewMenuName={setNewMenuName}
        onSubmit={handleAddMenu}
        isSubmitting={isSubmitting}
      />

      <AddItemModal
        opened={itemModalOpened}
        onClose={closeItemModal}
        onSubmit={handleItemSubmit}
        isSubmitting={isSubmitting}
        itemName={itemName}
        setItemName={setItemName}
        setItemDescription={setItemDescription}
        itemDescription={itemDescription}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
        onFileChange={handleFileChange}
        base64Image={base64Image}
      />
    </Container>
  );
};

export default MenuManager;
