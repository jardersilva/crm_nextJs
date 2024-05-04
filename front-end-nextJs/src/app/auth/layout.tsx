import { Toaster } from "react-hot-toast"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <Toaster
        position="top-center"
        toastOptions={{ duration: 5000 }}
      />
      <body>{children}</body>
    </html>
  )
}
