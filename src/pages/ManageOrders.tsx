import {
  Title,
  Card,
  Text,
  Grid,
  Select,
  Group,
  Table,
  ScrollArea,
} from "@mantine/core";
import { IconQrcode } from "@tabler/icons-react";
import { AreaChart } from "@mantine/charts";
import dayjs from "dayjs";

const scanData = [
  { date: "2025-04-06", scans: 120 },
  { date: "2025-04-07", scans: 95 },
  { date: "2025-04-08", scans: 130 },
  { date: "2025-04-09", scans: 142 },
  { date: "2025-04-10", scans: 165 },
  { date: "2025-04-11", scans: 178 },
  { date: "2025-04-12", scans: 195 },
];

const recentScans = Array.from(
  { length: 8 },
  (_, i) => ({
    id: i + 1,
    menu: `Menu ${i + 1}`,
    scannedAt: dayjs()
      .subtract(i, "hour")
      .format("YYYY-MM-DD HH:mm"),
    location: `Table ${Math.ceil(
      Math.random() * 10
    )}`,
  })
);

const ManageOrders = () => {
  const today = scanData[scanData.length - 1];

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Title order={2}>QR Code Orders</Title>
        <Select
          placeholder="Filter by menu"
          data={[
            "All Menus",
            "Breakfast",
            "Lunch",
            "Dinner",
          ]}
          className="w-48"
        />
      </div>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            className="bg-white"
          >
            <Group>
              <IconQrcode
                size={36}
                className="text-blue-500"
              />
              <div>
                <Text
                  size="xs"
                  c="dimmed"
                >
                  Total Scans Today
                </Text>
                <Text
                  size="xl"
                  fw={600}
                >
                  {today.scans}
                </Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
          >
            <Text
              size="md"
              className="mb-4 font-semibold"
            >
              Scans Over Time
            </Text>
            <AreaChart
              h={220}
              data={scanData}
              dataKey="date"
              series={[
                {
                  name: "scans",
                  color: "teal.6",
                },
              ]}
              curveType="monotone"
              withDots
            />
          </Card>
        </Grid.Col>
      </Grid>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
      >
        <Text
          size="md"
          className="mb-4 font-semibold"
        >
          Recent Scans
        </Text>
        <ScrollArea h={300}>
          <Table
            striped
            highlightOnHover
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Menu</Table.Th>
                <Table.Th>Scanned At</Table.Th>
                <Table.Th>Location</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recentScans.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td>{row.id}</Table.Td>
                  <Table.Td>{row.menu}</Table.Td>
                  <Table.Td>
                    {row.scannedAt}
                  </Table.Td>
                  <Table.Td>
                    {row.location}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default ManageOrders;
