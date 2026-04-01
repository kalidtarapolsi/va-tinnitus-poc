import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VA Tinnitus Claims Automation POC',
  description: 'Proof of concept demonstrating automated processing of VA tinnitus disability claims using rules-based decision engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
