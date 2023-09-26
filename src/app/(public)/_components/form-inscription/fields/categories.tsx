export default function Categories() {
  return (
    <fieldset>
      <legend className="sr-only">Catégories</legend>
      <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
        <div
          className="text-sm font-semibold leading-6 text-gray-900"
          aria-hidden="true"
        >
          Catégories
        </div>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <div className="max-w-lg">
            <p className="text-sm leading-6 text-gray-600">
              Choisissez votre camp.
            </p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="senior"
                  name="categories"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-primary-orange focus:ring-secondary-orange"
                />
                <label
                  htmlFor="senior"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Développeur Senior
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="etudiants"
                  name="categories"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-primary-orange focus:ring-secondary-orange"
                />
                <label
                  htmlFor="etudiants"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Étudiants dans le numérique
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="reconversion"
                  name="categories"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-primary-orange focus:ring-secondary-orange"
                />
                <label
                  htmlFor="reconversion"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  En reconversion professionnelle
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
