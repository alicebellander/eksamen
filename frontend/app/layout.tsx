import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import "./globals.css";

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const user = session?.user;

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

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {user.image && (
                    <Image
                      src={user.image}
                      alt={user.name ?? "Bruker"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {user.name}
                  </span>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/login" });
                    }}
                  >
                    <button type="submit" className="btn btn-ghost-blue text-sm">
                      Logg ut
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="btn btn-primary text-sm">
                  Logg inn
                </Link>
              )}
            </div>
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
