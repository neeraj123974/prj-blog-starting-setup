import Head from 'next/head';

import '../styles/globals.css'
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <meat name="viewport" content="width=device-width initial-scale=1"/>
      <Component {...pageProps} />
    </Layout>
  ) 
}
export default MyApp
