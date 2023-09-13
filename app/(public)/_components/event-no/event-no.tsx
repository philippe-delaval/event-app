import NewsletterSubscription from "@/app/(public)/_components/newsletter/newsletter-subscription";

export default function EventNo() {
  return (
    <>
      <div className="bg-background-grey">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nous sommes désolés,
              <br />
              il n&apos;y a pas d&apos;évènement prévu pour le moment.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              N&apos;hésitez pas à revenir plus tard pour voir si un nouvel
              évènement a été ajouté.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/oldevents"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Pour voir les anciennes éditions{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <NewsletterSubscription />
    </>
  );
}
