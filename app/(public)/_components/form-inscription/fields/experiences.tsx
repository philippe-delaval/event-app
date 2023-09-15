export default function Experiences() {
    return (
        <fieldset>
            <legend className="sr-only">Expérience</legend>
            <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
            <div
                className="text-sm font-semibold leading-6 text-gray-900"
                aria-hidden="true"
            >
                Expérience
            </div>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="max-w-lg">
                <p className="text-sm leading-6 text-gray-600">
                    Sélectionner votre niveau d&#39;expérience.
                </p>
                <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                    <input
                        id="start"
                        name="experience"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    <label
                        htmlFor="start"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Je commence
                    </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                    <input
                        id="moins-3"
                        name="experience"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    <label
                        htmlFor="moins-3"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Moins de 3 ans
                    </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                    <input
                        id="plus-5"
                        name="experience"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    <label
                        htmlFor="plus-5"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Plus de 5 ans
                    </label>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </fieldset>
    )
}