import { useState } from "react";
import {
  Input,
  Select,
  Card,
  Image,
  Text,
  Title,
  Group,
  Container,
  SimpleGrid,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const mockMenu = [
  {
    id: 1,
    name: "Paneer Tikka",
    category: "Starters",
    price: "₹220",
    description:
      "Creamy tomato-based curry with cottage cheese cubes.",
    image:
      "https://imgs.search.brave.com/FuYPwCqFYn2vkoDs-6kxN7g7B9urpioml8wBoK2fAnw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFuaGVhbHRo/eXJlY2lwZXMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE0/LzExL3BhbmVlci10/aWtrYS53ZWJw",
  },
  {
    id: 2,
    name: "Butter Chicken",
    category: "Main Course",
    price: "₹290",
    description:
      "Creamy tomato-based curry with cottage cheese cubes.",
    image:
      "https://imgs.search.brave.com/u_8EIbixvlHiPqF9SyvNFqaQdzi_vwVciJDp64WruBo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzYzLzk5Lzg3/LzM2MF9GXzI2Mzk5/ODcwMV9HS2xBTVh2/V1RYbUlUb3NQcXhl/S1dxNTVPU0hoVWds/YS5qcGc",
  },
  {
    id: 3,
    name: "Veg Biryani",
    category: "Biryani",
    price: "₹240",
    description:
      "Creamy tomato-based curry with cottage cheese cubes.",
    image:
      "https://imgs.search.brave.com/LdJTAmgSUI7TR7Klm1QNHK2BS9r_EO9wgekD--d2KJo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVycmFmb29kLmNv/LmluL2Nkbi9zaG9w/L2ZpbGVzL1ZlZ0Jp/cnlhbmkuanBnP3Y9/MTY4Nzc2NjU5MiZ3/aWR0aD0xOTQ2",
  },
  {
    id: 4,
    name: "Gulab Jamun",
    category: "Desserts",
    price: "₹120",
    description:
      "Creamy tomato-based curry with cottage cheese cubes.",
    image:
      "https://imgs.search.brave.com/b9F-pkzI1WGsvbU249yQTOXKdN9E5Y-5yS0lk70mb5g/rs:fit:860:0:0:0/g:ce/aHR0cDovL2Zhcm04/LnN0YXRpY2ZsaWNr/ci5jb20vNzIyNy82/OTU0ODY0MTcyX2Yw/OTBkYjZiYjVfei5q/cGc",
  },
  {
    id: 5,
    name: "Chicken Biryani",
    category: "Biryani",
    price: "₹300",
    description:
      "Creamy tomato-based curry with cottage cheese cubes.",
    image:
      "https://imgs.search.brave.com/P8jeDn_SJRCJvQUTLNQxHC-Ul-mYL_bO1woGjwbX-uI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/NDc2OTIxNy9waG90/by9jaGlja2VuLWR1/bS1iaXJ5YW5pLWlu/LXRvcm9udG8tb250/YXJpby1jYW5hZGEt/b24tbm92ZW1iZXIt/MTItMjAyMi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ZDBr/X0lCXzFKcGE4YVFq/ak5BX2dNbkZQMUZ2/TUhmSHByalRaUVFw/NHplST0",
  },
];

const PreviewMenu = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<
    string | null
  >(null);

  const filteredMenu = mockMenu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category
      ? item.category === category
      : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    ...new Set(
      mockMenu.map((item) => item.category)
    ),
  ];

  return (
    <Container py="xl">
      <div className="text-center mb-10">
        <Title
          order={2}
          className="text-3xl md:text-4xl font-bold"
        >
          Explore Our Menu
        </Title>
        <Text
          size="md"
          color="dimmed"
        >
          Find your favorite dishes by name or
          category.
        </Text>
      </div>

      <Group
        className="mb-6"
        grow
      >
        <Input
          leftSection={<IconSearch size={16} />}
          placeholder="Search by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.currentTarget.value)
          }
        />
        <Select
          data={categories}
          placeholder="Filter by category"
          clearable
          value={category}
          onChange={setCategory}
        />
      </Group>

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing="lg"
      >
        {filteredMenu.map((item) => (
          <Card
            key={item.id}
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src={item.image}
                height={160}
                alt={item.name}
              />
            </Card.Section>

            <Title
              order={4}
              className="mt-4"
            >
              {item.name}
            </Title>
            <Text
              size="sm"
              color="dimmed"
              className="my-2"
            >
              {item.description}
            </Text>

            <Text className="text-emerald-600 font-semibold text-lg">
              {item.price}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default PreviewMenu;
