import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { store } from '@/store/store'
import '@/styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <LocaleProvider>
        {getLayout(<Component {...pageProps} />)}
      </LocaleProvider>
    </Provider>
  )
}

export default App
