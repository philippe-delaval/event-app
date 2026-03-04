import Link from "next/link";

export default function JoinPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Rejoignez l&apos;aventure Apéro Dev
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Vous souhaitez contribuer à la communauté ? Il y a plusieurs façons de nous aider.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          <div className="rounded-2xl bg-gray-50 p-10 ring-1 ring-inset ring-gray-900/5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold leading-7 text-primary">Partagez votre expertise</h3>
              <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900">Devenir Speaker</p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Vous avez un sujet technique ou non-technique à partager ? Venez présenter un talk lors de notre prochain événement.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Proposer un talk
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-gray-50 p-10 ring-1 ring-inset ring-gray-900/5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold leading-7 text-primary">Soutenez la communauté</h3>
              <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900">Devenir Sponsor</p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Vous souhaitez gagner en visibilité auprès des développeurs locaux ? Devenez sponsor de nos événements.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Nous contacter
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-gray-50 p-10 ring-1 ring-inset ring-gray-900/5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold leading-7 text-primary">Aidez l&apos;organisation</h3>
              <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900">Devenir Bénévole</p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Vous voulez donner un coup de main le jour J ou participer à l&apos;organisation ? Rejoignez l&apos;équipe !
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Rejoindre l&apos;équipe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
