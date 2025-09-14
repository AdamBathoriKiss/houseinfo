import { Button } from "primereact/button";
import "../app.css";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Welcome() {
    const navigate = useNavigate();
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });
    const [currentSection, setCurrentSection] = useState(false);

    useEffect(() => {
        setCurrentSection(inView);
    }, [inView]);

    // Betűszín kiválasztás currentSection alapján
    const textColorClass = "flex space-x-6 text-white";
    const headerColorClass =
        "flex items-center px-3 justify-between fixed top-0 left-0 w-full h-18 z-30 backdrop-blur-sm text-gray-800 transition duration-500";

    const handleLogin = () => {
        // Bejelentkezés logika
        navigate("/main");
    };

    const handleRegister = () => {
        // Regisztráció logika
        console.log("Regisztráció gomb megnyomva");
    };

    return (
        <div className="flex flex-col min-h-screen overflow-auto ">
            {/* Hero Section */}
            <section
                className="min-h-screen bg-[linear-gradient(180deg,#777BF1_0%,#343D4A_140%)]"
                ref={ref}
            >
                <header className={headerColorClass}>
                    <div className="logo">
                        <img
                            src="/houseinfologo.png"
                            alt="House-Info logo"
                            className="h-15 p-0 w-auto"
                        />
                    </div>
                    <ul className={textColorClass}>
                        <li>Főoldal</li>
                        <li>Funkciók</li>
                        <li>Árak</li>
                        <li>Kapcsolat</li>
                    </ul>

                    <div className="flex space-x-4">
                        <button
                            className={textColorClass}
                            onClick={handleLogin}
                        >
                            Bejelentkezés
                        </button>
                    </div>
                </header>

                <div className="align-center h-screen w-[80vw] mx-auto flex flex-col items-center justify-center text-center text-white py-20 ">
                    <div>
                        <p className="!text-7xl text-center font-black mb-4">
                            Közösképviselet. Új szinten. Együttműködés
                            könnyedén.
                        </p>
                        <p className="!text-sm text-center mx-auto px-4 w-[35vw]">
                            Házinfó - ahol a közösképviselők és lakók könnyedén
                            együttműködhetnek. Minden egy helyen: kommunikáció,
                            adminisztráció, közösköltség-kezelés.
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

            {/* Problems Section */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center text-white py-20  bg-[#484f79]">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Ismerős ezek közül valamelyik?</h3>
                            <ul>
                                <li>
                                    📧 Elvesznek az emailek a lakók és
                                    közösképviselő között
                                </li>
                                <li>
                                    📋 Papíralapú adminisztráció, káosz a
                                    dokumentumokban
                                </li>
                                <li>
                                    💸 Bonyolult a közösköltség nyomon követése
                                    és befizetése
                                </li>
                                <li>
                                    🔧 Lassan jutnak el a hibabejelentések a
                                    megfelelő személyhez
                                </li>
                                <li>
                                    📊 Nehéz áttekinteni a lakóközösség pénzügyi
                                    helyzetét
                                </li>
                                <li>
                                    🤝 Rossz a kommunikáció lakók és
                                    közösképviselő között
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Solving Section */}
            <section className="flex flex-col min-h-screen overflow-auto text-white bg-[#484f79]">
                <div className="container">
                    <h3>A Házinfó mindent megold</h3>
                    <p>
                        Egy átlátható, egyszerűen használható platform, amely
                        összehozza a lakóközösséget
                    </p>
                    <h3>Közösképviselőknek</h3>
                        <h4>Adminisztráció egyszerűen</h4>
                    <ul>
                        <li>Automatikus kimutatások és jelentések</li>
                        <li>Digitális dokumentumkezelés</li>
                        <li>Lakók egyszerű értesítése</li>
                        <li>Pénzügyi áttekintés egy helyen</li>
                    </ul>
                    <h3>Lakóknak</h3>
                        <h4>Minden kéznél a mobilon</h4>
                    <ul>
                        <li>Hibabejelentés pár kattintással</li>
                        <li>Közösköltség online befizetése</li>
                        <li>Közvetlen kapcsolat a közösképviselővel</li>
                        <li>Fontos hírek és értesítések</li>
                    </ul>
                </div>
            </section>

            {/* Features */}
            <section className="flex flex-col min-h-screen text-white overflow-auto bg-[#484f79]">
                <div className="container">
                    <h3>Miért válassza a Házinfót?</h3>
                    <h4>🚀 Egyszerű használat</h4>
                    <p>Nem kell informatikus lenni hozzá - pár perc alatt megtanulja bárki</p>
                    <h4>📱 Mobil app</h4>
                    <p>Mindig kéznél van, bárhol használható</p>
                    <h4>💰 Költséghatékony</h4>
                    <p>Kevesebb adminisztrációs idő = több megtakarítás</p>
                    <h4>🔒 Biztonságos</h4>
                    <p>SimplePay-es fizetés a teljeskörű biztonság érdekében.</p>
                    <h4>📊 Átlátható pénzügyek</h4>
                    <p>Minden lakó látja, mire költik a közös pénzt</p>
                    <h4>⚡ Gyors kommunikáció</h4>
                    <p>Valós idejű értesítések, nincs többé elveszett üzenet</p>
                </div>
            </section>

            {/* Cta  */}
            <section className="flex flex-col min-h-screen text-white overflow-auto bg-[#484f79]">
                <h3>Készen áll a változásra?</h3>
                <p>Csatlakozzon már ma több ezer elégedett lakóközösséghez!</p>
                <h4>Előnyök kiemelése</h4>
                <ul>
                    <li>✅ 30 napos ingyenes próba</li>
                    <li>✅ Nincs beállítási költség</li>
                    <li>✅ Magyar nyelvű támogatás</li>
                    <li>✅ Bármikor lemondható</li>
                </ul>
            </section>

            {/* Footer */}
            <footer className="min-h-screen text-white bg-[linear-gradient(180deg,#484f79_0%,#777BF1_140%)]">
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
