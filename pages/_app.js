import { Provider } from 'react-redux';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import {useState} from 'react'
import store from '../redux/store';


function MyApp({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
  <SessionContextProvider
  supabaseClient={supabaseClient}
  initialSession={pageProps.initialSession}
  >
    <Provider store={store}>
    <Toaster position='bottom-center' />
      <Component {...pageProps} />
      <Footer/>
    </Provider>
  </SessionContextProvider>)

}

export default MyApp
