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

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
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
              <Title order={3}>24</Title>
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
              <Title order={3}>8</Title>
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
              <Title order={3}>142</Title>
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
                Device Views
              </Text>
              <Title order={3}>
                89 Mobile / 53 Desktop
              </Title>
            </div>
            <IconDeviceMobile
              size={32}
              className="text-orange-500"
            />
          </div>
        </Card>
      </div>

      {/* Menu Views Table */}
      <Card
        shadow="md"
        padding="lg"
        radius="md"
        withBorder
      >
        <Title
          order={4}
          className="mb-4"
        >
          Recent Menu Views
        </Title>
        <Table
          verticalSpacing="sm"
          highlightOnHover
        >
          <thead>
            <tr>
              <th>Menu</th>
              <th>Time</th>
              <th>Date</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                menu: "Breakfast Specials",
                time: "10:15 AM",
                date: "Apr 12, 2025",
                device: "Mobile",
              },
              {
                menu: "Dinner Combos",
                time: "8:42 PM",
                date: "Apr 11, 2025",
                device: "Desktop",
              },
              {
                menu: "Desserts",
                time: "3:09 PM",
                date: "Apr 11, 2025",
                device: "Mobile",
              },
            ].map((v, i) => (
              <tr key={i}>
                <td>{v.menu}</td>
                <td>{v.time}</td>
                <td>{v.date}</td>
                <td>{v.device}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
