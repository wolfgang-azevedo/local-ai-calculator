// src/components/ui/flags.jsx
export const BrazilFlag = () => (
    <svg width="24" height="16" viewBox="0 0 64 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <rect width="64" height="45" fill="#009C3B"/>
      <path d="M4.5 22.5L32 4.5L59.5 22.5L32 40.5L4.5 22.5Z" fill="#FED800"/>
      <circle cx="32" cy="22.5" r="9" fill="#002776"/>
      <path d="M32 14.5C36.4183 14.5 40 18.0817 40 22.5C40 26.9183 36.4183 30.5 32 30.5C27.5817 30.5 24 26.9183 24 22.5C24 18.0817 27.5817 14.5 32 14.5Z" fill="#002776"/>
    </svg>
  );
  
  export const USAFlag = () => (
    <svg width="24" height="16" viewBox="0 0 64 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <rect width="64" height="45" fill="#FFFFFF"/>
      <rect y="0" width="64" height="3.46154" fill="#B22234"/>
      <rect y="6.92308" width="64" height="3.46154" fill="#B22234"/>
      <rect y="13.8462" width="64" height="3.46154" fill="#B22234"/>
      <rect y="20.7692" width="64" height="3.46154" fill="#B22234"/>
      <rect y="27.6923" width="64" height="3.46154" fill="#B22234"/>
      <rect y="34.6154" width="64" height="3.46154" fill="#B22234"/>
      <rect y="41.5385" width="64" height="3.46154" fill="#B22234"/>
      <rect width="25.6" height="24.2308" fill="#3C3B6E"/>
      {[...Array(5)].map((_, row) => (
        [...Array(6)].map((_, col) => (
          <circle
            key={`star-${row}-${col}`}
            cx={2.13333 + col * 4.26667}
            cy={2.42308 + row * 4.84615}
            r="1"
            fill="white"
          />
        ))
      ))}
    </svg>
  );