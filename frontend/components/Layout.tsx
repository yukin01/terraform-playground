import React, { FC, ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout: FC<Props> = ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
    </header>
    {children}
    <footer>
      <hr />
      <span>Powered by <a href="https://firebase.google.com/products/hosting">Firebase Hosting</a></span>
    </footer>
  </div>
)
