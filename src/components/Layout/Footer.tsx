export default function Footer() {
  return (
    <footer className="w-full gap-4 bg-brand-greenBlack-500 text-white block bottom-0">
      <div className="flex flex-col text-sm text-center items-center justify-between h-full p-4 max-w-7xl mx-auto">
        <p className="font-bold">
          {" "}
          Tous droits réservés à{" "}
          <span className="text-brand-sage-500 font-bold font-primary inline">
            {" "}
            ByNes 2025{" "}
          </span>{" "}
        </p>
        <p className="mt-3 text-[0.6rem]">
          {" "}
          En cas d&apos;erreur, veuillez contacter le développeur Ouadah Cherif
          au numéro +213794547080{" "}
        </p>
      </div>
    </footer>
  );
}
