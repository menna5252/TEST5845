import React from "react"

const SectionTitle = ({title, subtitle}:{title:string, subtitle:string}) => {
  return (
    <div className="mb-5">
      <h1 className="font-semibold text-red-500 mb-4 section-title ps-7">{title}</h1>
      <span className="text-3xl font-semibold">{subtitle}</span>
    </div>
  )
};

export default SectionTitle;
