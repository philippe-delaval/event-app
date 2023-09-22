export default function NewsletterSubscription() {
  return (
    <div className="bg-background-grey py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          <h2 className="inline sm:block lg:inline xl:block">
            Vous voulez de nos nouvelles?
          </h2>{" "}
          <p className="inline sm:block lg:inline xl:block">
            Inscrivez-vous à notre newsletter.
          </p>
        </div>
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Adresse email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Entrer votre email"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-primary-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
            >
              Souscrire
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-900">
            Nous prenons soin de vos données. Lire nos{" "}
            <a
              href="#"
              className="font-semibold text-primary-orange hover:text-secondary-orange"
            >
              Mentions&nbsp;Légales
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
