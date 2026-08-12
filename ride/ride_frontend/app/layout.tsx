import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
export const metadata: Metadata = {
  title: 'Ride Frontend',
  description: 'Swiggy Clone Ride Frontend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
