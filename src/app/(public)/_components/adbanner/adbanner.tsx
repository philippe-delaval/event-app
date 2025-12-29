"use client";

import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
type AdBannerProps = {
  remainingSpots: number;
};

function AdBanner({ remainingSpots }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isClosed = sessionStorage.getItem("adBannerClosed");
    if (!isClosed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("adBannerClosed", "true");
  };

  if (remainingSpots <= 0) return null;

  return (
    <>
      {isVisible && (
        <div className="w-full relative z-[1002] isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-primary to-primary-hover px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-white">
              <strong className="font-semibold">
                Inscrivez-vous vite à l&#39;évènement, il ne reste que{" "}
                {remainingSpots} places !
              </strong>
            </p>
            <Link
              href="/inscription"
              className="flex-none rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              C&#39;est par ici <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={handleClose}
            >
              <span className="sr-only">Fermer le bandeau</span>
              <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AdBanner;
