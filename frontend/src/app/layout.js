import "./globals.css";

import Providers from "../components/Providers";

export const metadata = {
  title: "Food Delivery App",
  description: "Modern Food Ordering Platform",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
