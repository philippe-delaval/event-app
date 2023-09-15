export default function LastName () {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
            Nom
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-orange sm:max-w-xs sm:text-sm sm:leading-6"
                placeholder="Bonnier"
            />
            </div>
        </div>
    );
}