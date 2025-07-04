import { Menu } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";

const LanguageMenu = () => {
  return (
    <Menu
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <IconLanguage className="cursor-pointer" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Select Language</Menu.Label>

        <Menu.Item>English</Menu.Item>
        <Menu.Item>हिन्दी (Hindi)</Menu.Item>
        <Menu.Item>தமிழ் (Tamil)</Menu.Item>
        <Menu.Item>తెలుగు (Telugu)</Menu.Item>
        <Menu.Item>ಕನ್ನಡ (Kannada)</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageMenu;
