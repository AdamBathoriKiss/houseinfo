import { Button } from "primereact/button";
import "../app.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Welcome() {
  const navigate = useNavigate();
  const [isScrolledToNextPage, setIsScrolledToNextPage] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // pl. ha a görgetés elér egy adott sávot (például pixelben, vagy bizonyos elem teteje alapján)
      const scrollPosition = window.scrollY;
      if (scrollPosition > window.innerHeight) { 
        setIsScrolledToNextPage(true); // fehér háttéren fekete szín
      } else {
        setIsScrolledToNextPage(false); // rózsaszínen fehér szín
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

    const handleLogin = () => {
        // Bejelentkezés logika
        console.log("Bejelentkezés gomb megnyomva");
        navigate("/main");
    };

    const handleRegister = () => {
        // Regisztráció logika
        console.log("Regisztráció gomb megnyomva");
    };

    return (
        <div className="flex flex-col min-h-screen overflow-auto">
            {/* Header */}

            {/* Hero Section */}
            <section className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
                <header className="flex items-center px-3 justify-between fixed top-0 left-0 w-full h-16 z-10">
                    <div className="logo">
                        <img
                            src="/houseinfologo.png"
                            alt="House-Info logo"
                            className="h-15 p-0 w-auto"
                        />
                    </div>
                    <ul className={isScrolledToNextPage ? 'flex space-x-6 text-indigo-500' : 'flex space-x-6 text-white'}>
                        <li>Főoldal</li>
                        <li>Funkciók</li>
                        <li>Árak</li>
                        <li>Kapcsolat</li>
                    </ul>

                    <div className="flex space-x-4">
                        <button className={isScrolledToNextPage ? 'flex space-x-6 text-indigo-500' : 'flex space-x-6 text-white'} onClick={handleLogin}>
                            Bejelentkezés
                        </button>
                    </div>
                </header>

                <div className="align-center h-screen w-[80vw] mx-auto flex flex-col items-center justify-center text-center text-white py-20">
                    <div>
                        <p className="!text-7xl text-center font-black mb-4">
                            Közösképviselet. Új szinten. Együttműködés könnyedén.
                        </p>
                        <p className="!text-sm text-center mx-auto px-4 w-[45vw]">
                            Közösképviselőknek könnyíti meg az adminisztratív
                            feladatok ellátását és megkönnyíti a hozzá tartozó
                            applikációval a lakókkal történő kommunikációt
                        </p>
                        <div className="hero-buttons">
                            <Button
                                className="!bg-lime-50 !text-purple-900 !border-0 !px-6 !py-3 !mt-6 !text-lg !font-semibold transition delay-150 duration-600 hover:scale-x-110"
                                onClick={handleRegister}
                            >
                                Kezdjük el
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="flex flex-col min-h-screen overflow-auto">
                <div className="container">
                    <h3 className="features-title">
                        Miért válassza a HázInfó-t?
                    </h3>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h4>Azonnali értesítések</h4>
                            <p>
                                Lakók értesítése appon keresztül fontos
                                információkról és eseményekről
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛠️</div>
                            <h4>Hibajelentések</h4>
                            <p>
                                Lakók jelenthetnek hibákat és kérdéseket
                                egyszerűen az appon keresztül
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💳</div>
                            <h4>Közös költség fizetés</h4>
                            <p>
                                Közös költség befizetési lehetőség az appon
                                keresztül, egyszerűen és biztonságosan
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
                <div className="container">
                    <h3>Készen áll az egyszerűbb közösképviselésre?</h3>
                    <p>Csatlakozzon már ma és tapasztalja meg a különbséget!</p>
                    <button
                        className="btn btn-primary btn-large"
                        onClick={handleRegister}
                    >
                        Regisztráció most
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-left">
                            <h4>🏠 HázInfó</h4>
                            <p>A modern közösképviselés eszköze</p>
                        </div>
                        <div className="footer-right">
                            <p>&copy; 2025 HázInfó. Minden jog fenntartva.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
