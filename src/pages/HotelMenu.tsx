import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Container,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
  Tooltip, // Use Loader for specific loading states
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconPencil,
  IconPlus,
  IconTrash,
  IconX, // Added for notifications
} from "@tabler/icons-react";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AddItemModal from "../components/hotelMenu/AddItemModal";
import CreateMenuModal from "../components/hotelMenu/CreateMenuModal";
import DeleteCategoryModal from "../components/hotelMenu/DeleteCategoryModal";
import DeleteMenuItemModal from "../components/hotelMenu/DeleteMenuItemModal";
import DeleteMenuModal from "../components/hotelMenu/DeleteMenuModal";
import EditCategoryModal from "../components/hotelMenu/EditCategoryModal";
import EditMenuItemModal from "../components/hotelMenu/EditMenuItemModal";
import EmptyMenuNotice from "../components/hotelMenu/EmptyMenuNotice";
import MenuCard from "../components/hotelMenu/MenuCard";
import MenuHeader from "../components/hotelMenu/MenuHeader";
import MenuItemsGrid from "../components/hotelMenu/MenuItemsGrid";
import {
  Category,
  Hotel,
  Menu,
  MenuCategory,
  MenuItem
} from "../interface";
import { getHotelByUser } from "../service/hotelService";
import {
  addMenuCategory,
  addMenuItem,
  createMenu,
  deleteCategory,
  deleteMenu,
  deleteMenuItemService,
  getCategoryByMenu,
  getMenu,
  getMenuItemsByCategory,
  updateCategory,
  updateMenu,
  updateMenuItemService
} from "../service/menuService"; // Assuming menuService exports getMenuItems
import { getProfileInfo } from "../service/userService";
// Optional: Add notifications for better UX
// import { notifications } from '@mantine/notifications';


const MenuManager: React.FC = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [activeMenu, setActiveMenu] = useState<Menu | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [hotelId, setHotelId] = useState<string | null>(null);

  // Loading states
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for items of the currently selected category tab
  const [activeCategoryItems, setActiveCategoryItems] = useState<MenuItem[]>([]);
  const [activeTabCategoryId, setActiveTabCategoryId] = useState<string | null>(null);

  // Modal states
  const [menuModalOpened, { open: openMenuModal, close: closeMenuModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [deleteCategoryModalOpened, { open: openCategoryDeleteModal, close: closeCategoryDeleteModal }] = useDisclosure(false);
  const [itemModalOpened, { open: openItemModal, close: closeItemModal }] = useDisclosure(false);
  const [categoryModalOpened, { open: openCategoryModal, close: closeCategoryModal }] = useDisclosure(false);
  const [deleteItemModalOpened, { open: openDeleteItemModal, close: closeDeleteItemModal }] = useDisclosure(false);
  const [editItemModalOpened, { open: openEditItemModal, close: closeEditItemModal }] = useDisclosure(false);

  // Form states
  const [newMenuName, setNewMenuName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategoryIdForItem, setSelectedCategoryIdForItem] = useState<string | null>(null);

  // New item form states
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState<number | null>(null);
  const [itemImageFile, setItemImageFile] = useState<File | null>(null); // State for the actual File object
  const [itemImageUrl, setItemImageUrl] = useState<string | null>(null); // State for the image URL (preview or existing)

  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [deletingMenu, setDeletingMenu] = useState<Menu | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const [itemToEdit, setItemToEdit] = useState<MenuItem | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>();

  // Effect to create/revoke object URL for image preview
  useEffect(() => {
    if (itemImageFile) {
      const url = URL.createObjectURL(itemImageFile);
      setItemImageUrl(url);
      return () => URL.revokeObjectURL(url); // Clean up on unmount or file change
    } else if (itemToEdit?.itemImage) {
      setItemImageUrl(itemToEdit.itemImage); // If editing, use existing URL
    } else {
      setItemImageUrl(null); // Clear image URL if no file and not editing
    }
  }, [itemImageFile, itemToEdit?.itemImage]);

  // --- Data Fetching ---

  const fetchProfileAndHotel = useCallback(async () => {
    setIsInitialLoading(true);
    try {
      const profileData = await getProfileInfo();
    
      if (profileData?.id) {
        const hotelData = await getHotelByUser(profileData.id);
        setHotel(hotelData);
        setHotelId(hotelData.id);
      } else {
        console.error("Profile ID not found.");
      }
    } catch (error) {
      console.error("Error fetching profile or hotel:", error);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

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

        const refreshedActiveMenu = data.find((m: Menu) => m.id === prevActiveMenu.id);

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
      console.error("Error fetching menus:", error);
    } finally {
      setIsInitialLoading(false);
    }
  }, [hotelId]);

  const fetchCategoriesForActiveMenu = useCallback(async () => {
    if (!activeMenu?.id) {
      setCategories([]);
      setActiveCategoryItems([]);
      setActiveTabCategoryId(null);
      return;
    }
    setIsCategoryLoading(true);
    setActiveCategoryItems([]);
    setActiveTabCategoryId(null);
    try {
      const fetchedCategories = await getCategoryByMenu(activeMenu.id);
      setCategories(fetchedCategories);

      if (fetchedCategories.length > 0) {
        setActiveTabCategoryId(String(fetchedCategories[0].id));
      } else {
        setActiveTabCategoryId(null);
      }
    } catch (error) {
      console.error(`Error fetching categories for menu ${activeMenu.id}:`, error);
      setCategories([]);
    } finally {
      setIsCategoryLoading(false);
    }
  }, [activeMenu?.id]);

  const fetchItemsForActiveTab = useCallback(async () => {
    if (!activeMenu?.id || !activeTabCategoryId) {
      setActiveCategoryItems([]);
      return;
    }
    setIsItemLoading(true);
    try {
      const items = await getMenuItemsByCategory(activeMenu.id, activeTabCategoryId);
      setActiveCategoryItems(items || []);
    } catch (error) {
      console.error(`Error fetching items for category ${activeTabCategoryId}:`, error);
      setActiveCategoryItems([]);
    } finally {
      setIsItemLoading(false);
    }
  }, [activeMenu?.id, activeTabCategoryId]);

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

  useEffect(() => {
    fetchItemsForActiveTab();
  }, [fetchItemsForActiveTab]);

  // --- Action Handlers ---

  const handleAddOrUpdateMenu = async () => {
    if (!newMenuName.trim() || !hotelId) return;
    setIsSubmitting(true);

    try {
      if (editingMenu) {
        const updatedMenu = {
          ...editingMenu,
          title: newMenuName,
        };
        await updateMenu(editingMenu.id, updatedMenu);
        notifications.show({
          title: "Menu Updated",
          message: "Menu updated successfully.",
          color: "green",
        });
      } else {
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

      setNewMenuName("");
      setEditingMenu(null);
      closeMenuModal();
      await fetchMenus();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.errorMessage || "Failed to save menu.",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim() || !activeMenu?.id) return;
    setIsSubmitting(true);
    try {
      const newCategoryPayload = {
        name: categoryName,
        menuId: activeMenu.id,
      };
      await addMenuCategory(newCategoryPayload);
      setCategoryName("");
      await fetchCategoriesForActiveMenu();
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async (menu: Menu) => {
    if (!menu?.id) return;
    setIsSubmitting(true);
    try {
      const updatedData = {
        ...menu,
        isPublished: true,
      };
      console.log(updatedData);

      await updateMenu(menu.id, updatedData);

      notifications.show({
        title: "Menu Published",
        message: "Menu isPublished Successfully",
        color: "green",
      });

      await fetchMenus();
    } catch (error) {
      console.error("Error publishing menu:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenAddItemModal = (categoryId: string) => {
    setSelectedCategoryIdForItem(categoryId);
    setItemName("");
    setItemDescription("");
    setItemPrice(0);
    setItemImageFile(null); // Clear previous image file
    setItemImageUrl(null); // Clear previous image URL
    openItemModal();
  };

  const handleItemFileChange = (file: File | null) => {
    setItemImageFile(file);
  };

  const handleItemSubmit = async () => {
    if (
      !selectedCategoryIdForItem ||
      !activeMenu?.id ||
      !itemName.trim() ||
      itemPrice === null ||
      itemPrice < 0
    ) {
      notifications.show({
        title: "Error",
        message: "Please fill all required fields (Name, Price) and select a category. Price must be a non-negative number.",
        color: "red",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // 👇 Build JS object first
      const menuItemObj = {
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        menuId: activeMenu.id,
        categoryId: selectedCategoryIdForItem,
      };
  
      // 👇 Now convert to FormData and send
      const formData = new FormData();
      formData.append("menuItem", JSON.stringify(menuItemObj));
  
      if (itemImageFile) {
        formData.append("image", itemImageFile);
      }
  
      await addMenuItem(formData); // Should send multipart/form-data
  
      if (selectedCategoryIdForItem === activeTabCategoryId) {
        await fetchItemsForActiveTab();
      }
  
      closeItemModal();
      setItemImageFile(null);
      setItemImageUrl(null);
  
      notifications.show({
        title: "Item Added",
        message: "Menu item added successfully.",
        color: "green",
      });
    } catch (error: any) {
      console.error("Error adding item:", error);
      notifications.show({
        title: "Error",
        message: error?.errorMessage || "Failed to add menu item.",
        color: "red",
      });
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
    setNewMenuName(menu.title);
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
        message: `Category ${deletingCategory?.name} Deleted Successfully`,
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

  const handleDeleteCateogry = (category: Category) => {
    setDeletingCategory(category);
    openCategoryDeleteModal();
  };

  const handleOnCategoryEdit = async () => {
    try {
      const updatedCategory = {
        ...editingCategory,
        name: newCategoryName,
      };
      await updateCategory(editingCategory?.id, updatedCategory);
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

  const handleDeleteMenuItem = (item: MenuItem) => {
    setItemToDelete(item);
    openDeleteItemModal();
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setItemToEdit(item);
    setItemName(item.name);
    setItemDescription(item.description || "");
    setItemPrice(item.price);
    setSelectedCategoryIdForItem(item.categoryId);
    setItemImageUrl(item.itemImage || null); // Set existing image URL for preview
    setItemImageFile(null); // Clear any potentially pending new file when opening edit
    openEditItemModal();
  };

  const handleOnDeleteItem = async (itemId: string | number) => {
    setIsSubmitting(true);
    try {
      await deleteMenuItemService(itemId);
      notifications.show({
        title: "Item Deleted",
        message: "Menu item deleted successfully.",
        color: "green",
      });
      await fetchItemsForActiveTab();
    } catch (error) {
      console.error("Error deleting menu item:", error);
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
    if (
      !itemToEdit?.id ||
      !selectedCategoryIdForItem ||
      !activeMenu?.id ||
      !itemName.trim() ||
      itemPrice === null ||
      itemPrice < 0
    ) {
      notifications.show({
        title: "Error",
        message:
          "Please fill all required fields (Name, Price) and select a category. Price must be a non-negative number.",
        color: "red",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      //  Build the updated object
      const updatedItem = {
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        menuId: activeMenu.id,
        categoryId: selectedCategoryIdForItem,
      };
  
      // Prepare form data for multipart request
      const formData = new FormData();
      formData.append("menuItem", JSON.stringify(updatedItem));
  
      //  Attach new image only if changed
      if (itemImageFile) {
        formData.append("image", itemImageFile);
      }
  
      // Call update API
      await updateMenuItemService(itemToEdit.id, formData);
  
      //  Refetch updated items
      // if (selectedCategoryIdForItem === activeTabCategoryId) {
      //   await fetchItemsForActiveTab();
      // }
      fetchItemsForActiveTab();
  
      // Reset form and close modal
      closeEditItemModal();
      setItemToEdit(null);
      setItemImageFile(null);
      setItemImageUrl(null);
  
      notifications.show({
        title: "Item Updated",
        message: "Menu item updated successfully.",
        color: "green",
      });
    } catch (error: any) {
      console.error("Error updating item:", error);
      notifications.show({
        title: "Error",
        message: error?.errorMessage || "Failed to update menu item.",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header and Add Menu Button */}
        <MenuHeader
          hotelId={hotelId}
          isLoading={isInitialLoading}
          onClick={() => {
            if (hotel?.planId === null) {
              navigate('/pricing')
            } else {
              openMenuModal()
            }
          }}
        />

        {/* Loading/Empty States */}
        <LoadingOverlay visible={isInitialLoading} overlayProps={{ radius: "sm", blur: 2 }} />

        {!isInitialLoading && !hotelId && (
          <Alert icon={<IconAlertCircle size="1rem" />} title="Hotel Not Found" color="orange">
            Could not find an associated hotel.
            Please ensure your profile is linked.
          </Alert>
        )}

        {!isInitialLoading &&
          hotelId &&
          menus.length === 0 && (
            <EmptyMenuNotice
              onClick={() => {
                if (hotel?.planId === null) {
                  navigate('/pricing')
                } else {
                  openMenuModal()
                }
              }}
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
                    value={activeTabCategoryId}
                    onChange={
                      setActiveTabCategoryId
                    }
                    keepMounted={false}
                  >
                    <Tabs.List>
                      {categories.map((cat) => (
                        <Tabs.Tab
                          key={cat.id}
                          value={String(cat.id)}
                        >
                          {cat.name}
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>

                    {categories.map((cat) => (
                      <Tabs.Panel
                        key={cat.id}
                        value={String(cat.id)}
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

      {/* --- Modals --- */}

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
          setItemName("");
          setItemDescription("");
          setItemPrice(null);
          setItemImageFile(null); // Clear file input
          setItemImageUrl(null); // Clear preview
        }}
        onSubmit={handleOnEditItemSubmit}
        isSubmitting={isSubmitting}
        itemName={itemName}
        setItemName={setItemName}
        itemDescription={itemDescription}
        setItemDescription={setItemDescription}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
        onFileChange={handleItemFileChange} // Pass the handler for file input
        itemImage={itemImageUrl} // Pass the URL for preview
        initialItem={itemToEdit}
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
        onFileChange={handleItemFileChange} // Pass the handler for file input
        itemImage={itemImageUrl} // Pass the URL for preview
      />
    </Container>
  );
};

export default MenuManager;