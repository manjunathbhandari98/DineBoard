import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Button,
  Group,
  Text,
  TextInput,
  Title,
  Tabs,
  Container,
  Stack,
  Paper,
  LoadingOverlay,
  Alert,
  Box,
  Loader,
  ActionIcon,
  Tooltip, // Use Loader for specific loading states
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconAlertCircle,
  IconPencil,
  IconTrash,
  IconX, // Added for notifications
} from "@tabler/icons-react";
import {
  createMenu,
  addMenuCategory,
  updateMenu,
  getMenu,
  getCategoryByMenu,
  addMenuItem,
  getMenuItems,
  deleteMenu,
  updateCategory,
  deleteCategory,
  deleteMenuItemService,
  updateMenuItemService,
  getMenuItemsByCategory, // Import the service to fetch items
} from "../service/menuService"; // Assuming menuService exports getMenuItems
import { getHotelByUser } from "../service/hotelService";
import { getProfileInfo } from "../service/userService";
import { notifications } from "@mantine/notifications";
import {
  Menu,
  MenuCategory,
  Profile,
  MenuItem,
  Category,
} from "../interface";
import AddItemModal from "../components/hotelMenu/AddItemModal";
import CreateMenuModal from "../components/hotelMenu/CreateMenuModal";
import MenuCard from "../components/hotelMenu/MenuCard";
import MenuHeader from "../components/hotelMenu/MenuHeader";
import EmptyMenuNotice from "../components/hotelMenu/EmptyMenuNotice";
import MenuItemsGrid from "../components/hotelMenu/MenuItemsGrid";
import DeleteMenuModal from "../components/hotelMenu/DeleteMenuModal";
import EditCategoryModal from "../components/hotelMenu/EditCategoryModal";
import DeleteCategoryModal from "../components/hotelMenu/DeleteCategoryModal";
import DeleteMenuItemModal from "../components/hotelMenu/DeleteMenuItemModal";
import EditMenuItemModal from "../components/hotelMenu/EditMenuItemModal";
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
    deleteModalOpened,
    {
      open: openDeleteModal,
      close: closeDeleteModal,
    },
  ] = useDisclosure(false);

  const [
    deleteCategoryModalOpened,
    {
      open: openCategoryDeleteModal,
      close: closeCategoryDeleteModal,
    },
  ] = useDisclosure(false);

  const [
    itemModalOpened,
    {
      open: openItemModal,
      close: closeItemModal,
    },
  ] = useDisclosure(false);

  const [
    categoryModalOpened,
    {
      open: openCategoryModal,
      close: closeCategoryModal,
    },
  ] = useDisclosure(false);

  const [
    deleteItemModalOpened,
    {
      open: openDeleteItemModal,
      close: closeDeleteItemModal,
    },
  ] = useDisclosure(false);
  const [
    editItemModalOpened,
    {
      open: openEditItemModal,
      close: closeEditItemModal,
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
  const [editingMenu, setEditingMenu] =
    useState<Menu | null>(null);
  const [deletingMenu, setDeletingMenu] =
    useState<Menu | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] =
    useState("");
  const [deletingCategory, setDeletingCategory] =
    useState<Category | null>(null);
  const [itemEditMode, setItemEditMode] =
    useState(false);

  const [itemToDelete, setItemToDelete] =
    useState<MenuItem | null>(null);
  const [itemToEdit, setItemToEdit] =
    useState<MenuItem | null>(null);
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
    setIsInitialLoading(true);
    try {
      const data = await getMenu(hotelId);
      setMenus(data);

      setActiveMenu((prevActiveMenu) => {
        if (!prevActiveMenu) {
          return null;
        }

        const refreshedActiveMenu = data.find(
          (m: Menu) => m.id === prevActiveMenu.id
        );

        if (!refreshedActiveMenu) {
          setCategories([]);
          setActiveCategoryItems([]);
          setActiveTabCategoryId(null);
          return null;
        } else {
          return refreshedActiveMenu;
        }
      });
    } catch (error) {
      console.error(
        "Error fetching menus:",
        error
      );
    } finally {
      setIsInitialLoading(false);
    }
  }, [hotelId]); // ✅ Only depends on hotelId now

  // Include activeMenu.id to potentially refresh

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
        const items =
          await getMenuItemsByCategory(
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

  const handleAddOrUpdateMenu = async () => {
    if (!newMenuName.trim() || !hotelId) return;
    setIsSubmitting(true);

    try {
      if (editingMenu) {
        // Edit existing menu
        const updatedMenu = {
          ...editingMenu,
          title: newMenuName,
        };
        await updateMenu(
          editingMenu.id,
          updatedMenu
        );
        notifications.show({
          title: "Menu Updated",
          message: "Menu updated successfully.",
          color: "green",
        });
      } else {
        // Create new menu
        const newMenuPayload = {
          title: newMenuName,
          isPublished: false,
          hotelId: hotelId,
        };
        await createMenu(newMenuPayload);
        notifications.show({
          title: "Menu Created",
          message: "Menu created successfully.",
          color: "green",
        });
      }

      // Clear state and refresh
      setNewMenuName("");
      setEditingMenu(null);
      closeMenuModal();
      await fetchMenus();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error.errorMessage ||
          "Failed to save menu.",
        color: "red",
      });
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

  const handleOnDelete = async () => {
    try {
      await deleteMenu(deletingMenu?.id);
      notifications.show({
        title: "Menu Deleted",
        message: "Menu deleted successfully.",
        color: "green",
      });
    } catch (error) {
      console.error("Error saving menu:", error);
      notifications.show({
        title: "Error",
        message: "Failed to delete menu.",
        color: "red",
      });
    }
    setDeletingMenu(null);
    closeDeleteModal();
    await fetchMenus();
  };

  const handleEditMenu = (menu: Menu) => {
    setEditingMenu(menu);
    setNewMenuName(menu.title); // Prefill the modal input
    openMenuModal();
  };

  const handleDeleteMenu = (menu: Menu) => {
    setDeletingMenu(menu);
    openDeleteModal();
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    openCategoryModal();
  };

  const handleOnDeleteCategory = async () => {
    try {
      await deleteCategory(deletingCategory?.id);
      notifications.show({
        title: "Deleted",
        message: `Category ${deleteCategory.name} Deleted Successfully`,
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to delete Category",
        color: "red",
      });
    }
    setDeletingCategory(null);
    closeCategoryDeleteModal();
    await fetchCategoriesForActiveMenu();
  };

  const handleDeleteCateogry = (
    category: Category
  ) => {
    setDeletingCategory(category);
    openCategoryDeleteModal();
  };

  const handleOnCategoryEdit = async () => {
    try {
      const updatedCategory = {
        ...editingCategory,
        name: newCategoryName,
      };
      await updateCategory(
        editingCategory?.id,
        updatedCategory
      );
      notifications.show({
        title: "Category Updated",
        message: "Category updated successfully.",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to change Category Name",
        color: "red",
      });
    }
    setNewCategoryName("");
    setEditingCategory(null);
    closeCategoryModal();
    await fetchCategoriesForActiveMenu();
  };

  const handleDeleteMenuItem = (
    item: MenuItem
  ) => {
    setItemToDelete(item);
    openDeleteItemModal();
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setItemToEdit(item);
    setItemName(item.name);
    setItemDescription(item.description || "");
    setItemPrice(item.price);
    setBase64Image(item.itemImage || null);
    openEditItemModal();
  };

  const handleOnDeleteItem = async (
    itemId: string | number
  ) => {
    setIsSubmitting(true);
    try {
      await deleteMenuItemService(itemId); // Assuming you have a deleteMenuItem service
      notifications.show({
        title: "Item Deleted",
        message:
          "Menu item deleted successfully.",
        color: "green",
      });
      await fetchItemsForActiveTab(); // Refresh items in the current tab
    } catch (error) {
      console.error(
        "Error deleting menu item:",
        error
      );
      notifications.show({
        title: "Error",
        message: "Failed to delete menu item.",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
      closeDeleteItemModal();
      setItemToDelete(null);
    }
  };

  const handleOnEditItemSubmit = async () => {
    if (!itemToEdit) return; // Ensure we have an item to edit

    setIsSubmitting(true);
    try {
      const base64Data =
        base64Image?.split(",")[1];
      const updatedItem: Omit<MenuItem, "id"> & {
        id: string | number;
      } = {
        id: itemToEdit.id,
        name: itemName,
        description: itemDescription,
        price:
          itemPrice !== null
            ? Number(itemPrice)
            : 0,
        menuId: itemToEdit.menuId, // Keep original
        categoryId: itemToEdit.categoryId, // Keep original
        itemImage: base64Data,
        // You might need to handle itemImageBytes if you're storing both
      };
      await updateMenuItemService(
        updatedItem.id,
        updatedItem
      );
      notifications.show({
        title: "Item Updated",
        message:
          "Menu item updated successfully.",
        color: "green",
      });
      await fetchItemsForActiveTab();
    } catch (error) {
      console.error(
        "Error updating menu item:",
        error
      );
      notifications.show({
        title: "Error",
        message: "Failed to update menu item.",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
      closeEditItemModal();
      setItemToEdit(null);
      setBase64Image(null);
    }
  };

  // --- Render Logic ---

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
                  onDelete={() => {
                    handleDeleteMenu(menu);
                  }}
                  onEdit={() =>
                    handleEditMenu(menu)
                  }
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
            <div className="flex justify-end">
              <ActionIcon
                variant="light"
                color="red"
                radius="xl"
                size="lg"
                onClick={() =>
                  setActiveMenu(null)
                }
                className="transition-all hover:scale-110"
              >
                <Tooltip
                  label="Close"
                  withArrow
                >
                  <IconX size={20} />
                </Tooltip>
              </ActionIcon>
            </div>
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
                          <Group
                            justify="flex-end"
                            className="w-full"
                          >
                            <div className="flex gap-5">
                              <Button
                                leftSection={
                                  <IconPlus
                                    size={16}
                                  />
                                }
                                size="xs"
                                variant="light"
                                onClick={() =>
                                  handleOpenAddItemModal(
                                    String(cat.id)
                                  )
                                }
                                className="w-full sm:w-auto"
                              >
                                <span className="hidden sm:inline">
                                  Add Item to{" "}
                                  {cat.name}
                                </span>
                              </Button>

                              <Button
                                size="xs"
                                variant="light"
                                leftSection={
                                  <IconPencil
                                    size={16}
                                  />
                                }
                                onClick={() =>
                                  handleEditCategory(
                                    cat
                                  )
                                }
                                className="w-full sm:w-auto"
                              >
                                <span className="hidden sm:inline">
                                  Edit {cat.name}
                                </span>
                              </Button>

                              <Button
                                size="xs"
                                variant="filled"
                                color="red"
                                leftSection={
                                  <IconTrash
                                    size={16}
                                  />
                                }
                                onClick={() =>
                                  handleDeleteCateogry(
                                    cat
                                  )
                                }
                                className="w-full sm:w-auto"
                              >
                                <span className="hidden sm:inline">
                                  Delete{" "}
                                  {cat.name}
                                </span>
                              </Button>
                            </div>
                          </Group>

                          <MenuItemsGrid
                            items={
                              activeCategoryItems ||
                              []
                            }
                            isLoading={
                              isItemLoading
                            }
                            onDelete={
                              handleDeleteMenuItem
                            }
                            onEdit={
                              handleEditMenuItem
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

      <EditCategoryModal
        opened={categoryModalOpened}
        onClose={() => {
          closeCategoryModal();
          setEditingCategory(null);
          setNewCategoryName("");
        }}
        categoryName={newCategoryName}
        setCategoryName={setNewCategoryName}
        onSubmit={handleOnCategoryEdit}
        isSubmitting={isSubmitting}
      />

      <CreateMenuModal
        opened={menuModalOpened}
        onClose={() => {
          closeMenuModal();
          setEditingMenu(null);
          setNewMenuName("");
        }}
        newMenuName={newMenuName}
        setNewMenuName={setNewMenuName}
        onSubmit={handleAddOrUpdateMenu}
        isSubmitting={isSubmitting}
        isEditMode={!!editingMenu}
      />

      <DeleteMenuModal
        opened={deleteModalOpened}
        onClose={() => {
          closeDeleteModal();
          setDeletingMenu(null);
        }}
        onDelete={handleOnDelete}
        isSubmitting={isSubmitting}
      />

      <DeleteCategoryModal
        opened={deleteCategoryModalOpened}
        onClose={() => {
          closeCategoryDeleteModal();
          setDeletingCategory(null);
        }}
        onDelete={handleOnDeleteCategory}
        isSubmitting={isSubmitting}
      />

      <DeleteMenuItemModal
        opened={deleteItemModalOpened}
        onClose={closeDeleteItemModal}
        onDelete={handleOnDeleteItem}
        itemToDelete={itemToDelete}
        isSubmitting={isSubmitting}
      />

      <EditMenuItemModal
        opened={editItemModalOpened}
        onClose={() => {
          closeEditItemModal();
          setItemToEdit(null);
          setBase64Image(null);
          setItemName("");
          setItemDescription("");
          setItemPrice(null);
        }}
        onSubmit={handleOnEditItemSubmit}
        isSubmitting={isSubmitting}
        itemName={itemName}
        setItemName={setItemName}
        itemDescription={itemDescription}
        setItemDescription={setItemDescription}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
        onFileChange={handleFileChange}
        base64Image={base64Image}
        initialItem={itemToEdit} // Pass the item being edited
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
