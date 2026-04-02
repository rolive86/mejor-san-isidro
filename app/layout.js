import './globals.css'

export const metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: 'MEJOR San Isidro – Afiliación',
  description: 'Solicitud de afiliación al partido MEJOR San Isidro',
  manifest: '/manifest.json',
  themeColor: '#061b30',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Afiliación',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
