import { AuthProvider } from "@/context/authcontext/AuthContext";
import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color="orange"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <AuthProvider>
        <div className="p-0 md:p-2">
          <Component {...pageProps} />
          <div className="fixed bottom-3 right-3 backdrop-blur-sm rounded-lg">
            <p className="px-4 mt-2 text-xs text-gray-600">
              Powered by <b className="text-orange-500">CodeCrafters Inc.</b>
            </p>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
