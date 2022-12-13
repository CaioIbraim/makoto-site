import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import '../styles/globals.css'
import { RecoilRoot } from "recoil"
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import {useState} from 'react'

function MyApp({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
  <SessionContextProvider
  supabaseClient={supabaseClient}
  initialSession={pageProps.initialSession}
  >
  <RecoilRoot>
      <Toaster position='bottom-center' />
      <Component {...pageProps} />
      <Footer/>
    </RecoilRoot>
  </SessionContextProvider>)

}

export default MyApp
