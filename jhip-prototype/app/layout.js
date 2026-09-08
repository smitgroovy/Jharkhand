import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'J-HIP | Jharkhand Health Intelligence Platform',
  description: 'AI-Enabled Health Intelligence System for 4.06 Crore Citizens',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
