export default function Button({
  text,
  plus = false,
  noIcon = false,
  className = "",
}) {
  return (
    <button
      className={`flex items-center gap-2 px-6 py-2 rounded-xl 
      bg-skillora hover:scale-95 border-2 border-black1 
      transition-all duration-200 font-bold text-black1 cursor-pointer 
      ${className}`}
    >
      <span>{text}</span>
      {noIcon ? null : plus ? (
        // Plus Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#111"
        >
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6v-2z" />
        </svg>
      ) : (
        // Default Arrow Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#111"
        >
          <path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
        </svg>
      )}
    </button>
  );
}
