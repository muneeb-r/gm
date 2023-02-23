import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return <>
    <NextNProgress
      color="yellow"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
      options={{ showSpinner: false }}
    />
    <Component {...pageProps} />
  </>
}
