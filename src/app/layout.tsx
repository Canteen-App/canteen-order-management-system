import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
