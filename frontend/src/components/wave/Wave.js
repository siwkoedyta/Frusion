import './Wave.css';

export default function Wave() {
  return (
    <div className='wave'>
      <svg className="bigWave" xmlns="http://www.w3.org/2000/svg" width="1728" height="244" viewBox="0 0 1728 244" fill="none">
        <path d="M499 149C339 340.2 44.3333 197 -83 101.5V-190C56 -199 338.2 -217 355 -217H1606C1620 -217 1808.17 -181 1900.5 -163C1900.5 -121.833 1873.9 -8.39999 1767.5 116C1634.5 271.5 1285.5 220.5 1181 165C1076.5 109.5 699 -90 499 149Z" fill="url(#paint0_linear_10_2444)"/>
        <defs>
          <linearGradient id="paint0_linear_10_2444" x1="908.75" y1="-217" x2="908.75" y2="243.309" gradientUnits="userSpaceOnUse">
            <stop stopColor="#351431"/>
            <stop offset="1" stopColor="#775253"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}