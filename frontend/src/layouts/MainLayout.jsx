import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

function MainLayout({ children, user }) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header at top */}
      <Header user={user}/>

      {/* Main content fills remaining space and centers children */}
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>

      {/* Footer at bottom */}
      <Footer />

    </div>
  );
}

export default MainLayout;
