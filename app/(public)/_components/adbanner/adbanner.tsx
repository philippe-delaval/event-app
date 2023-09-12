import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";
import PropTypes from "prop-types";
import Counter from "@/app/(public)/_components/counter/counter";

type AdBannerProps = {
  formRef: React.RefObject<any>;
};

AdBanner.propTypes = {
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

function AdBanner({ formRef }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (formRef.current) {
      smoothScrollIntoView(formRef.current, {
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {isVisible && (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-background-grey px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <div
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#545454] to-[#D1D1D3] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#D1D1D3] to-[#545454] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-gray-900">
              <strong className="font-semibold">
                Inscrivez-vous vite à l&#39;évènement, il ne reste que{" "}
                <Counter /> places !
              </strong>
            </p>
            <a
              href="#"
              onClick={handleLinkClick}
              className="flex-none rounded-full bg-primary-orange px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-secondary-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              C&#39;est par ici <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={() => setIsVisible(false)}
            >
              <span className="sr-only">Fermer le bandeau</span>
              <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AdBanner;
