import '../app/globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: "MyCRM", //titre de l'application
  description: "Exemple App", //pour le referencement (SEO) utilisé par les moteurs de recherche
  icons: {
    icon: '/icone.ico', // chemin relatif depuis /public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <main className="h-[93vh]">{children}</main>
        <Navbar />
      </body>
    </html>
  );
}