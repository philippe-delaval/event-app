import React from "react";

const MapGoogle: React.FC = () => {
  return (
    <iframe
      className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84483.9933921125!2d7.67967996527845!3d48.56915859777497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8495e18b2c1%3A0x971a483118e7241f!2sStrasbourg!5e0!3m2!1sfr!2sfr!4v1688546468472!5m2!1sfr!2sfr"
      width="600"
      height="450"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="ApéroDev"
    ></iframe>
  );
};

export default MapGoogle;
