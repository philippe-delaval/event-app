export default function Languages() {
    return (
        <fieldset>
            <legend className="sr-only">Langages</legend>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
            <div
                className="text-sm font-semibold leading-6 text-gray-900"
                aria-hidden="true"
            >
                Langages
            </div>
            <div className="mt-4 sm:col-span-2 sm:mt-0">
                <div className="max-w-lg space-y-6">
                <p className="text-sm leading-6 text-gray-600">
                    Choisissez vos technologies.
                </p>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                    <input
                        id="magento"
                        name="magento"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    </div>
                    <div className="text-sm leading-6">
                    <label
                        htmlFor="magento"
                        className="font-medium text-gray-900"
                    >
                        Magento 2
                    </label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                    <input
                        id="symphony"
                        name="symphony"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    </div>
                    <div className="text-sm leading-6">
                    <label
                        htmlFor="symphony"
                        className="font-medium text-gray-900"
                    >
                        Symphony
                    </label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                    <input
                        id="php"
                        name="php"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    </div>
                    <div className="text-sm leading-6">
                    <label
                        htmlFor="php"
                        className="font-medium text-gray-900"
                    >
                        PHP
                    </label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                    <input
                        id="tailwind"
                        name="tailwind"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    </div>
                    <div className="text-sm leading-6">
                    <label
                        htmlFor="tailwind"
                        className="font-medium text-gray-900"
                    >
                        Tailwind CSS
                    </label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                    <input
                        id="alpine"
                        name="alpine"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    </div>
                    <div className="text-sm leading-6">
                    <label
                        htmlFor="alpine"
                        className="font-medium text-gray-900"
                    >
                        Alpine JS
                    </label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                    <input
                        id="react"
                        name="react"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    </div>
                    <div className="text-sm leading-6">
                    <label
                        htmlFor="react"
                        className="font-medium text-gray-900"
                    >
                        React JS
                    </label>
                    </div>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                    <input
                        id="vue"
                        name="vue"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-secondary-orange"
                    />
                    </div>
                    <div className="text-sm leading-6">
                    <label
                        htmlFor="vue"
                        className="font-medium text-gray-900"
                    >
                        Vue JS
                    </label>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </fieldset>
    )
}