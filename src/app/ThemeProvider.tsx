import {
  createTheme,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const customTheme = createTheme({
    primaryColor: "redTheme",
    primaryShade: 5,
    colors: {
      redTheme: [
        "#fff1f2", // very light rose
        "#ffe4e6", // blush pink
        "#fecdd3", // soft pink
        "#fda4af", // rose
        "#fb7185", // light red
        "#f43f5e", // red
        "#e11d48", // medium red
        "#be123c", // deep rose
        "#9f1239", // crimson
        "#881337", // dark red
      ] as [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ],
    },
    fontFamily: "Poppins, sans-serif",
    defaultRadius: "md",
    white: "#ffffff",
    black: "#1f1f1f",
    headings: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: "600",
    },
  });

  return (
    <MantineProvider theme={customTheme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
