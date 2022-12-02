import '../styles/globals.css'
import { RecoilRoot } from "recoil"
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'


function MyApp({ Component, pageProps }) {
  return <RecoilRoot>
    <Toaster position='bottom-center' />
    <Component {...pageProps} />
    <Footer/>
  </RecoilRoot>
}

export default MyApp
