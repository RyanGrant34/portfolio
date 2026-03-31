import { Terminal } from "lucide-react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  tagline = "Stop sounding like a robot.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Rewrite Tool", url: "/app" },
        { text: "Pricing", url: "#pricing" },
        { text: "API Access", url: "#" },
        { text: "Chrome Extension", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "AI Writing Patterns", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Documentation", url: "#" },
        { text: "FAQ", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Contact", url: "#" },
        { text: "Affiliate Program", url: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { text: "Twitter / X", url: "#" },
        { text: "GitHub", url: "#" },
        { text: "Discord", url: "#" },
      ],
    },
  ],
  copyright = "© 2026 dontwritelikeai.com",
  bottomLinks = [
    { text: "Terms of Service", url: "#" },
    { text: "Privacy Policy", url: "#" },
    { text: "Refund Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-16 border-t border-[var(--ghost)]/30">
      <div className="max-w-4xl mx-auto px-6">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <div className="w-8 h-8 border border-[var(--accent)]/50 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <p className="text-sm font-mono font-bold text-[var(--accent)] tracking-wider uppercase">
                  DWLAI
                </p>
              </div>
              <p className="mt-4 text-[var(--muted)] text-sm font-mono">
                {tagline}
              </p>
              <p className="mt-2 text-xs text-[var(--ghost)] font-mono">
                Powered by Claude API
              </p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-mono text-[var(--accent)]/70 text-[0.65rem] uppercase tracking-[0.2em]">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-[var(--muted)]">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="text-sm font-mono hover:text-[var(--accent)] transition-colors"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[var(--ghost)]/20 pt-6 text-xs font-mono text-[var(--muted)] md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
