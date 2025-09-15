import { Button } from "primereact/button";
import "../app.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Divider } from "primereact/divider";

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
			<section className="min-h-screen bg-[linear-gradient(180deg,#777BF1_0%,#343D4A_140%)]" ref={ref}>
				<header className={headerColorClass}>
					<div className="logo">
						<img src="/houseinfologo.png" alt="House-Info logo" className="h-15 p-0 w-auto" />
					</div>
					<ul className={textColorClass}>
						<li>Főoldal</li>
						<li>Funkciók</li>
						<li>Árak</li>
						<li>Kapcsolat</li>
					</ul>

					<div className="flex space-x-4">
						<button className={textColorClass} onClick={handleLogin}>
							Bejelentkezés
						</button>
					</div>
				</header>

				<div className="align-center h-screen w-[80vw] mx-auto flex flex-col items-center justify-center text-center text-white py-20">
					<div data-aos="fade-up" data-aos-duration="1000">
						<p className="!text-7xl text-center font-black mb-4">
							Közösképviselet. Új szinten. Együttműködés könnyedén.
						</p>
						<p className="!text-sm text-center mx-auto px-4 w-[35vw]">
							Házinfó - ahol a közösképviselők és lakók könnyedén együttműködhetnek. Minden egy helyen:
							kommunikáció, adminisztráció, közösköltség-kezelés.
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
			<section className="min-h-screen flex flex-col text-white py-20  bg-[#484f79]">
				<div>
					<p
						className="text-teal-400 !text-4xl font-black ms-50 "
						data-aos="fade-up"
						data-aos-duration="1000"
					>
						Ismerősek az alábbi problémák?
					</p>
					<div className="w-full flex flex-row justify-between items-stretch">
						<ul className="ms-50 mt-25" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
							<li
								className="!text-2xl font-black leading-[2]"
								data-aos="fade-up"
								data-aos-duration="1000"
							>
								Papíralapú adminisztráció, káosz a dokumentumokban
							</li>
							<li className="!text-2xl font-black leading-[2]">
								Bonyolult a közösköltség nyomon követése és befizetése
							</li>
							<li className="!text-2xl font-black leading-[2]">
								Lassan jutnak el a hibabejelentések a megfelelő személyhez
							</li>
							<li className="!text-2xl font-black leading-[2]">
								Nehéz áttekinteni a lakóközösség pénzügyi helyzetét
							</li>
							<li className="!text-2xl font-black leading-[2]">
								Rossz a kommunikáció lakók és közösképviselő között
							</li>
						</ul>

						<span className="sr-only">HouseInfo problems section</span>
						<img
							src="../../public/problems.png"
							alt="House-Info problems image"
							className="h-[65vh] mx-8 w-auto shadow-2xl rounded-2xl"
						/>
					</div>
				</div>
			</section>

			{/* Problem Solving Section */}
			<section className="flex flex-col min-h-screen overflow-auto text-white bg-[#484f79]">
				<div className="w-full flex flex-col justify-center text-center mt-[10rem]">
					<p className="text-teal-400 !text-4xl font-black">A Házinfó megoldást kínál ezekre a problémákra</p>
					<p className="my-5">
						Egy átlátható, egyszerűen használható platform, amely összehozza a lakóközösséget
					</p>
				</div>
				<div className="w-full my-25 flex flex-row justify-center">
					<div className="h-[45vh] w-[45vw] flex flex-row items-center rounded-3xl bg-gray-800/30 backdrop-blur-sm">
						<div className="flex flex-col mx-auto">
							<p className="text-teal-400 !text-2xl font-black text-center">Közösképviselőknek</p>
							<ul>
								<li className="!text-lg leading-[1.5] text-justify">
									Automatikus kimutatások és jelentések
								</li>
								<li className="!text-lg leading-[1.5] text-justify">Digitális dokumentumkezelés</li>
								<li className="!text-lg leading-[1.5] text-justify">Lakók egyszerű értesítése</li>
								<li className="!text-lg leading-[1.5] text-justify">Pénzügyi áttekintés egy helyen</li>
							</ul>
						</div>
						<Divider layout="vertical" className="!min-h-1" />
						<div className="flex flex-col mx-auto">
							<p className="text-teal-400 !text-2xl text-center font-black">Lakóknak </p>
							<ul>
								<li className="!text-lg leading-[1.5] text-justify">Hibabejelentés pár kattintással</li>
								<li className="!text-lg leading-[1.5] text-justify">Közösköltség online befizetése</li>
								<li className="!text-lg leading-[1.5] text-justify">
									Közvetlen kapcsolat a közösképviselővel
								</li>
								<li className="!text-lg leading-[1.5] text-justify">Fontos hírek és értesítések</li>
							</ul>
						</div>
					</div>
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
