import React from "react";

type FormattedDateProps = {
  date: Date | string;
  options: {
    weekday: string;
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
  };
};

const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  const jsDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = jsDate.toLocaleDateString("fr-FR", options);

  return <span>{`Le ${formattedDate}`}</span>;
};

export default FormattedDate;
