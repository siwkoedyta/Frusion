import "./../wave/Wave.css";

export default function WaveSmall() {
  return (
    <div className="wave">
      <svg
        className="waveSmall"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 375 51"
        fill="none"
      >
        <path
          d="M296.687 50.9743C355.778 50.2439 370.577 30.0458 429.667 29.307C435.259 29.2371 444 29.307 444 29.307V0H-82.9518C-82.9518 0 -134.392 15.0993 -92.6965 22.8783C-16.7141 37.054 50.9193 15.1162 136.634 22.8783C206.002 29.1601 224.269 51.8693 296.687 50.9743Z"
          fill="url(#paint0_linear_3_1452)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3_1452"
            x1="134.245"
            y1="-5.45581"
            x2="134.245"
            y2="51"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#775253" />
            <stop offset="1" stop-color="#351431" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}