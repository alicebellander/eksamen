import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Nunito: rund, varm og svært lesbar — passer godt til mat/oppskrift-apper
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Oppskrifter",
  description: "Dine oppskrifter samlet på ett sted",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang="nb" er påkrevd av WCAG 3.1.1 (språk på siden)
    <html lang="nb" className={nunito.variable}>
      <body className="min-h-screen flex flex-col">

        {/* Hopp til hovedinnhold — første fokusbare element (WCAG 2.4.1) */}
        <a href="#hovedinnhold" className="skip-link">
          Hopp til hovedinnhold
        </a>

        <header className="site-header" role="banner">
          <div className="site-header-inner">
            <Link href="/" className="site-logo" aria-label="Oppskrifter – gå til forsiden">
              🍴 Oppskrifter
            </Link>
          </div>
        </header>

        {/* id kobles til skip-link sin href="#hovedinnhold" */}
        <main id="hovedinnhold" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>

      </body>
    </html>
  );
}
