import { useState } from "react";
import {
  Input,
  SegmentedControl,
  Card,
  Image,
  Text,
  Title,
  Container,
  Grid,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import LanguageMenu from "../LanguageMenu";

// Sample categories
const categories = [
  "All",
  "Starters",
  "Main Course",
  "Biryani",
  "Desserts",
];

// Sample menu items
const menuItems = [
  {
    id: 1,
    name: "Paneer Tikka",
    category: "Starters",
    price: "₹220",
    image:
      "https://imgs.search.brave.com/FuYPwCqFYn2vkoDs-6kxN7g7B9urpioml8wBoK2fAnw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFuaGVhbHRo/eXJlY2lwZXMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE0/LzExL3BhbmVlci10/aWtrYS53ZWJw",
  },
  {
    id: 2,
    name: "Butter Chicken",
    category: "Main Course",
    price: "₹290",
    image:
      "https://imgs.search.brave.com/u_8EIbixvlHiPqF9SyvNFqaQdzi_vwVciJDp64WruBo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzYzLzk5Lzg3/LzM2MF9GXzI2Mzk5/ODcwMV9HS2xBTVh2/V1RYbUlUb3NQcXhl/S1dxNTVPU0hoVWds/YS5qcGc",
  },
  {
    id: 3,
    name: "Veg Biryani",
    category: "Biryani",
    price: "₹240",
    image:
      "https://imgs.search.brave.com/LdJTAmgSUI7TR7Klm1QNHK2BS9r_EO9wgekD--d2KJo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVycmFmb29kLmNv/LmluL2Nkbi9zaG9w/L2ZpbGVzL1ZlZ0Jp/cnlhbmkuanBnP3Y9/MTY4Nzc2NjU5MiZ3/aWR0aD0xOTQ2",
  },
  {
    id: 4,
    name: "Gulab Jamun",
    category: "Desserts",
    price: "₹120",
    image:
      "https://imgs.search.brave.com/b9F-pkzI1WGsvbU249yQTOXKdN9E5Y-5yS0lk70mb5g/rs:fit:860:0:0:0/g:ce/aHR0cDovL2Zhcm04/LnN0YXRpY2ZsaWNr/ci5jb20vNzIyNy82/OTU0ODY0MTcyX2Yw/OTBkYjZiYjVfei5q/cGc",
  },
  {
    id: 5,
    name: "Chicken Biryani",
    category: "Biryani",
    price: "₹300",
    image:
      "https://imgs.search.brave.com/P8jeDn_SJRCJvQUTLNQxHC-Ul-mYL_bO1woGjwbX-uI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/NDc2OTIxNy9waG90/by9jaGlja2VuLWR1/bS1iaXJ5YW5pLWlu/LXRvcm9udG8tb250/YXJpby1jYW5hZGEt/b24tbm92ZW1iZXIt/MTItMjAyMi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ZDBr/X0lCXzFKcGE4YVFq/ak5BX2dNbkZQMUZ2/TUhmSHByalRaUVFw/NHplST0",
  },
];

const HotelMenuPreview = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredMenu = menuItems.filter(
    (item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" ||
        item.category === category;
      return matchesSearch && matchesCategory;
    }
  );

  return (
    <Container
      size="md"
      py={40}
    >
      <Title
        order={2}
        className="text-center mb-6 text-3xl font-semibold"
      >
        🍽 Welcome to Spice Villa
      </Title>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-5 items-center w-full">
          <Input
            leftSection={<IconSearch size={16} />}
            placeholder="Search dishes..."
            value={search}
            onChange={(e) =>
              setSearch(e.currentTarget.value)
            }
            className="w-full md:w-1/2"
          />
          <LanguageMenu />
        </div>

        <div className="overflow-x-auto no-scrollbar md:flex-wrap w-full">
          <SegmentedControl
            data={categories}
            value={category}
            onChange={setCategory}
            fullWidth
            className="min-w-max"
          />
        </div>
      </div>

      <Grid gutter="md">
        {filteredMenu.map((item) => (
          <Grid.Col
            key={item.id}
            span={{ base: 12, sm: 6, md: 4 }}
          >
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="h-full flex flex-col"
            >
              <Card.Section>
                <Image
                  src={item.image}
                  height={180}
                  alt={item.name}
                />
              </Card.Section>

              <div className="mt-4">
                <Text
                  size="lg"
                  fw={500}
                >
                  {item.name}
                </Text>
                <Text
                  c="dimmed"
                  size="sm"
                >
                  {item.category}
                </Text>
                <Text
                  size="md"
                  className="mt-2 font-semibold"
                >
                  {item.price}
                </Text>
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <footer className="text-center text-gray-300 py-6">
        Developed by Dineboard
      </footer>
    </Container>
  );
};

export default HotelMenuPreview;
