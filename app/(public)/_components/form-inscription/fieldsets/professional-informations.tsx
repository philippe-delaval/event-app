import Categories from "../fields/categories";
import Experiences from "../fields/experiences";
import Languages from "../fields/languages";

export default function ProfessionalInformations() {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Informations professionnelles
      </h2>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
        Veuillez fournir des informations professionnelles et techniques exactes
        et complètes.
      </p>
      <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
        <Categories />
        <Languages />
        <Experiences />
      </div>
    </div>
  );
}
