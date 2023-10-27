import type { Metadata } from 'next'
import './globals.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: 'Documaster',
  description: 'Interract with your PDFs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}<ToastContainer /></body>
    </html>
  )
}
