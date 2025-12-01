import { Button } from "primereact/button";
import "../app.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import Authorization from "~/utils/dialogs/Authorization";

export default function Welcome() {
	const { ref, inView, entry } = useInView({
		threshold: 0,
	});
	const [currentSection, setCurrentSection] = useState(false);
	const [authDialog, setAuthDialog] = useState(false);
	const [type, setType] = useState("");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobil menü state

	useEffect(() => {
		setCurrentSection(inView);
	}, [inView]);

	const textColorClass = "text-white";
	const headerColorClass =
		"flex items-center px-4 md:px-6 lg:px-8 justify-between fixed top-0 left-0 w-full h-16 md:h-18 z-30 backdrop-blur-sm text-gray-800 transition duration-500";

	const setAuthVisible = (dialogType: string) => {
		setType(dialogType);
		setAuthDialog(true);
		setMobileMenuOpen(false); // Menü bezárása auth dialog nyitáskor
	};

	return (
		<div className="flex flex-col min-h-screen overflow-auto">
			{/* Hero Section */}
			<section className="min-h-screen bg-[linear-gradient(180deg,#777BF1_0%,#343D4A_140%)]" ref={ref}>
				{/* RESPONSIVE HEADER - hamburger menü mobilon */}
				<header className={headerColorClass}>
					<div className="logo">
						<img src="/houseinfologo.png" alt="House-Info logo" className="h-10 md:h-12 lg:h-15 w-auto" />
					</div>

					{/* Desktop menü - lg: felett látszik */}
					<ul className="hidden lg:flex space-x-6 text-white">
						<li className="cursor-pointer hover:text-teal-400 transition">Főoldal</li>
						<li className="cursor-pointer hover:text-teal-400 transition">Funkciók</li>
						<li className="cursor-pointer hover:text-teal-400 transition">Árak</li>
						<li className="cursor-pointer hover:text-teal-400 transition">Kapcsolat</li>
					</ul>

					{/* Desktop bejelentkezés gomb */}
					<div className="hidden lg:flex space-x-4">
						<button
							className="text-white hover:text-teal-400 transition"
							onClick={() => setAuthVisible("login")}
						>
							Bejelentkezés
						</button>
					</div>

					{/* Hamburger menü ikon - csak mobilon/tableten */}
					<button
						className="lg:hidden text-white text-2xl"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? "✕" : "☰"}
					</button>
				</header>

				{/* Mobil menü - hamburger kinyitva - háttér mint az oldal */}
				{mobileMenuOpen && (
					<div className="fixed top-16 md:top-18 left-0 w-full bg-[#484f79]/95 backdrop-blur-md z-20 lg:hidden">
						<ul className="flex flex-col items-center space-y-4 py-6 text-white text-lg">
							<li className="cursor-pointer hover:text-teal-400 transition">Főoldal</li>
							<li className="cursor-pointer hover:text-teal-400 transition">Funkciók</li>
							<li className="cursor-pointer hover:text-teal-400 transition">Árak</li>
							<li className="cursor-pointer hover:text-teal-400 transition">Kapcsolat</li>
							<li>
								<button
									className="text-white hover:text-teal-400 transition"
									onClick={() => setAuthVisible("login")}
								>
									Bejelentkezés
								</button>
							</li>
						</ul>
					</div>
				)}

				{/* RESPONSIVE HERO CONTENT */}
				<div className="h-screen w-full px-4 md:px-8 lg:w-[80vw] mx-auto flex flex-col items-center justify-center text-center text-white py-20">
					<div data-aos="fade-up" data-aos-duration="1000">
						{/* Responsive címsor */}
						<p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-black mb-4 px-2">
							Közösképviselet. Új szinten. Együttműködés könnyedén.
						</p>
						{/* Responsive szöveg */}
						<p className="text-sm md:text-base text-center mx-auto px-4 w-full sm:w-[80vw] md:w-[60vw] lg:w-[35vw]">
							Házinfó - ahol a közösképviselők és lakók könnyedén együttműködhetnek. Minden egy helyen:
							kommunikáció, adminisztráció, közösköltség-kezelés.
						</p>
						<div className="hero-buttons">
							<Button
								className="!bg-lime-50 !text-purple-900 !border-0 !px-4 md:!px-6 !py-2 md:!py-3 !mt-6 !text-base md:!text-lg !font-semibold transition delay-150 duration-600 hover:scale-105"
								onClick={() => setAuthVisible("registration")}
							>
								Kezdjük el
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* RESPONSIVE PROBLEMS SECTION */}
			<section className="min-h-screen flex flex-col text-white py-12 md:py-16 lg:py-20 bg-[#484f79] px-4 md:px-8">
				<div>
					<p
						className="text-teal-400 text-2xl sm:text-3xl md:text-4xl font-black text-center md:text-left md:ms-12 lg:ms-50"
						data-aos="fade-up"
						data-aos-duration="1000"
					>
						Ismerősek az alábbi problémák?
					</p>
					{/* Flex column mobilon, row desktopban */}
					<div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-stretch mt-8 gap-8">
						<ul
							className="md:ms-12 lg:ms-50 mt-6 lg:mt-25 space-y-2 md:space-y-4"
							data-aos="fade-up"
							data-aos-duration="1000"
							data-aos-delay="500"
						>
							<li className="text-lg sm:text-xl md:text-2xl font-black leading-relaxed">
								Papíralapú adminisztráció, káosz a dokumentumokban
							</li>
							<li className="text-lg sm:text-xl md:text-2xl font-black leading-relaxed">
								Bonyolult a közösköltség nyomon követése és befizetése
							</li>
							<li className="text-lg sm:text-xl md:text-2xl font-black leading-relaxed">
								Lassan jutnak el a hibabejelentések a megfelelő személyhez
							</li>
							<li className="text-lg sm:text-xl md:text-2xl font-black leading-relaxed">
								Nehéz áttekinteni a lakóközösség pénzügyi helyzetét
							</li>
							<li className="text-lg sm:text-xl md:text-2xl font-black leading-relaxed">
								Rossz a kommunikáció lakók és közösképviselő között
							</li>
						</ul>

						{/* Responsive kép */}
						<img
							src="/problems.png"
							alt="House-Info problems image"
							className="w-full max-w-md lg:max-w-none lg:h-[65vh] lg:mx-8 lg:w-auto shadow-2xl rounded-2xl"
						/>
					</div>
				</div>
			</section>

			{/* RESPONSIVE PROBLEM SOLVING SECTION */}
			<section className="flex flex-col min-h-screen overflow-auto text-white bg-[#484f79] px-4 md:px-8 py-12 md:py-16">
				<div className="w-full flex flex-col justify-center text-center mt-8 md:mt-16 lg:mt-[10rem]">
					<p className="text-teal-400 text-2xl sm:text-3xl md:text-4xl font-black px-4">
						A Házinfó megoldást kínál ezekre a problémákra
					</p>
					<p className="my-5 text-sm md:text-base px-4">
						Egy átlátható, egyszerűen használható platform, amely összehozza a lakóközösséget
					</p>
				</div>
				{/* Card két oszloppal középen függőleges vonallal */}
				<div className="my-8 md:my-16 lg:my-25  flex justify-center">
					<div className="max-w-3xl lg:max-w-4xl flex flex-col md:flex-row items-start justify-center gap-8 md:gap-10 lg:gap-16 rounded-3xl bg-gray-800/30 backdrop-blur-sm p-6 md:p-8 lg:p-12">
						{/* Bal oszlop - Közösképviselőknek */}
						<div className="flex-1 flex flex-col text-center md:mx-auto">
							<p className="text-teal-400 text-xl md:text-2xl lg:text-3xl font-black mb-4 lg:mb-6 ">Közösképviselőknek</p>
							<ul className="space-y-3 lg:space-y-4 ">
								<li className="text-base md:text-lg lg:text-xl leading-relaxed">
									Automatikus kimutatások és jelentések
								</li>
								<li className="text-base md:text-lg lg:text-xl leading-relaxed">Digitális dokumentumkezelés</li>
								<li className="text-base md:text-lg lg:text-xl leading-relaxed">Lakók egyszerű értesítése</li>
								<li className="text-base md:text-lg lg:text-xl leading-relaxed">Pénzügyi áttekintés egy helyen</li>
							</ul>
						</div>

						{/* Függőleges vonal középen - csak desktop-on */}
						<div className="hidden md:block w-px bg-teal-400/30 self-stretch"></div>
						{/* Horizontal vonal mobilon */}
						<div className="md:hidden w-full h-px bg-teal-400/30"></div>

						{/* Jobb oszlop - Lakóknak */}
						<div className="flex-1 flex flex-col text-center md:mx-auto">
							<p className="text-teal-400 text-xl md:text-2xl lg:text-3xl font-black mb-4 lg:mb-6">Lakóknak</p>
							<ul className="space-y-3 lg:space-y-4 ">
								<li className="text-base md:text-lg lg:text-xl leading-relaxed">Hibabejelentés pár kattintással</li>
								<li className="text-base md:text-lg lg:text-xl leading-relaxed">Közösköltség online befizetése</li>
								<li className="text-base md:text-lg lg:text-xl leading-relaxed">
									Közvetlen kapcsolat a közösképviselővel
								</li>
								<li className="text-base md:text-lg lg:text-xl leading-relaxed">Fontos hírek és értesítések</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* RESPONSIVE FEATURES SECTION */}
			<section className="flex flex-col min-h-screen text-white overflow-auto bg-[#484f79] px-4 md:px-8 py-12 md:py-16">
				<p className="text-teal-400 text-2xl sm:text-3xl md:text-4xl font-black text-center mb-8 md:mb-12">
					Miért pont a Házinfó?
				</p>

				{/* Feature 1 - Egyszerű használat */}
				<div
					className="flex flex-col md:flex-row my-6 md:my-12 lg:my-30 items-center justify-center gap-6 md:gap-8"
					data-aos="fade-up"
					data-aos-duration="1000"
					data-aos-delay="500"
				>
					<div className="flex flex-col text-center md:text-left max-w-md">
						<p className="text-teal-400 text-xl md:text-2xl font-black mb-2">Egyszerű használat</p>
						<p className="text-sm md:text-base">Nem kell informatikus lenni hozzá - pár perc alatt megtanulja bárki</p>
					</div>
					<img
						src="/features_easy.png"
						alt="House-Info features_easy image"
						className="w-full max-w-xs md:max-w-sm lg:h-[35vh] lg:w-auto shadow-2xl rounded-2xl"
					/>
				</div>

				{/* Feature 2 - Mobil app */}
				<div
					className="flex flex-col md:flex-row-reverse my-6 md:my-12 lg:my-30 items-center justify-center gap-6 md:gap-8"
					data-aos="fade-up"
					data-aos-duration="1000"
					data-aos-delay="500"
				>
					<div className="flex flex-col text-center md:text-left max-w-md">
						<p className="text-teal-400 text-xl md:text-2xl font-black mb-2">Mobil app</p>
						<p className="text-sm md:text-base">Mindig kéznél van, bárhol használható</p>
					</div>
					<img
						src="/mobile.png"
						alt="House-Info mobile image"
						className="w-full max-w-xs md:max-w-sm lg:h-[35vh] lg:w-auto shadow-2xl rounded-2xl"
					/>
				</div>

				{/* Feature 3 - Költséghatékony */}
				<div
					className="flex flex-col md:flex-row my-6 md:my-12 lg:my-30 items-center justify-center gap-6 md:gap-8"
					data-aos="fade-up"
					data-aos-duration="1000"
					data-aos-delay="500"
				>
					<div className="flex flex-col text-center md:text-left max-w-md">
						<p className="text-teal-400 text-xl md:text-2xl font-black mb-2">Költséghatékony</p>
						<p className="text-sm md:text-base">Kevesebb adminisztrációs idő = több megtakarítás</p>
					</div>
					<img
						src="/cost_management.png"
						alt="House-Info cost management image"
						className="w-full max-w-xs md:max-w-sm lg:h-[35vh] lg:w-auto shadow-2xl rounded-2xl"
					/>
				</div>

				{/* Feature 4 - Biztonságos */}
				<div
					className="flex flex-col md:flex-row-reverse my-6 md:my-12 lg:my-30 items-center justify-center gap-6 md:gap-8"
					data-aos="fade-up"
					data-aos-duration="1000"
					data-aos-delay="500"
				>
					<div className="flex flex-col text-center md:text-left max-w-md">
						<p className="text-teal-400 text-xl md:text-2xl font-black mb-2">Biztonságos</p>
						<p className="text-sm md:text-base">SimplePay-es fizetés a teljeskörű biztonság érdekében</p>
					</div>
					<img
						src="/secure_payment.png"
						alt="House-Info secure payment image"
						className="w-full max-w-xs md:max-w-sm lg:h-[35vh] lg:w-auto shadow-2xl rounded-2xl"
					/>
				</div>

				{/* Feature 5 - Átlátható pénzügyek */}
				<div
					className="flex flex-col md:flex-row my-6 md:my-12 lg:my-30 items-center justify-center gap-6 md:gap-8"
					data-aos="fade-up"
					data-aos-duration="1000"
					data-aos-delay="500"
				>
					<div className="flex flex-col text-center md:text-left max-w-md">
						<p className="text-teal-400 text-xl md:text-2xl font-black mb-2">Átlátható pénzügyek</p>
						<p className="text-sm md:text-base">Minden lakó látja, mire költik a közös pénzt</p>
					</div>
					<img
						src="/shared_money.png"
						alt="House-Info shared money image"
						className="w-full max-w-xs md:max-w-sm lg:h-[35vh] lg:w-auto shadow-2xl rounded-2xl"
					/>
				</div>

				{/* Feature 6 - Gyors kommunikáció */}
				<div
					className="flex flex-col md:flex-row-reverse my-6 md:my-12 lg:my-30 items-center justify-center gap-6 md:gap-8"
					data-aos="fade-up"
					data-aos-duration="1000"
					data-aos-delay="500"
				>
					<div className="flex flex-col text-center md:text-left max-w-md">
						<p className="text-teal-400 text-xl md:text-2xl font-black mb-2">Gyors kommunikáció</p>
						<p className="text-sm md:text-base">Valós idejű értesítések, nincs többé elveszett üzenet</p>
					</div>
					<img
						src="/fast_communication.png"
						alt="House-Info fast communication image"
						className="w-full max-w-xs md:max-w-sm lg:h-[35vh] lg:w-auto shadow-2xl rounded-2xl"
					/>
				</div>
			</section>

			{/* RESPONSIVE FOOTER WITH CTA */}
			<footer className="min-h-screen flex flex-col justify-between items-center text-white bg-[linear-gradient(180deg,#484f79_0%,#777BF1_140%)] px-4 md:px-8 py-12">
				<div className="mt-12 md:mt-32 lg:mt-55 flex flex-col items-center">
					<p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-black mb-4 px-2">
						Készen áll a változásra?
					</p>
					<p className="text-base md:text-lg text-center font-black mb-4 px-4">
						Csatlakozzon már ma több ezer elégedett lakóközösséghez!
					</p>
					<InputText
						placeholder="E-mail cím"
						className="w-full sm:w-[80vw] md:w-[60vw] lg:w-[25vw] !mt-8 md:!mt-30 !bg-gray-600/30 !text-gray-50 !placeholder-gray-50 px-4 py-3"
					/>
					<Button
						className="!bg-lime-50 w-fit !mt-5 !text-purple-900 !border-0 !text-base md:!text-lg !font-semibold !px-6 !py-3"
						onClick={() => setAuthVisible("registration")}
					>
						Kérem az árajánlatot
					</Button>
				</div>

				<div className="text-center">
					<p className="my-4 text-sm md:text-base">&copy; {new Date().getFullYear()} HázInfó. Minden jog fenntartva.</p>
				</div>
			</footer>
			{authDialog && <Authorization visible={authDialog} setVisible={setAuthDialog} type={type} />}
		</div>
	);
}