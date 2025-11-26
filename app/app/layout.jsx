import AuthProvider from "../components/AuthProvider";
import Header from "../components/dashboard/Header";
import Nav from "../components/dashboard/Nav";


export default function RootLayout({ children }) {

  return (
    <main className="min-h-dvh">
      <div className="flex w-full min-h-dvh justify-center">
        <div className="max-w-[1200px] w-full border-r border-l border-gray-100 body-container">
          <AuthProvider>
            <div className="sticky top-0 z-40">
              <Header />
              <Nav />
            </div>
            {children}
          </AuthProvider>
        </div>
      </div>
    </main>
  );
}
