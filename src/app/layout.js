import "./globals.css";

export const metadata = {
  title: "WL Society — Not A Project. It's A Society.",
  description:
    "WL Society is a growing digital society built by builders, visionaries and explorers. Built on Trust. Driven by Purpose. United as One.",
  keywords: ["WL Society", "NFT", "community", "legends", "web3"],
  openGraph: {
    title: "WL Society",
    description: "Not A Project. It's A Society.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
