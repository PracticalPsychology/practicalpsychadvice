import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Practical Psychology Advice | Andy Horowitz",
  description:
    "Official 10-book Practical Psychology series. Explore focused guides on charisma, motivation, self-awareness, social skills, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/tailwind.min.css" />
        <meta name="robots" content="noindex" />
      </head>
      <body>
        {children}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "zge9e76u35");`}
        </Script>
      </body>
    </html>
  );
}
