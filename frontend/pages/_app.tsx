import type { AppProps } from 'next/app'
import 'bulma/css/bulma.css'
import 'styles.css'

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default MyApp
