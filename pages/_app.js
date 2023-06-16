import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const excludeLayoutPages = ["NewPage"]; // Add the page names where you want to exclude the layout

  // Check if the current page should exclude the layout
  const shouldExcludeLayout = excludeLayoutPages.includes(Component.name);

  return (
    <>
      {shouldExcludeLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}
