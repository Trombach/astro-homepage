export default function OgImage() {
  return (
    <div
      style={{
        display: "flex",
        fontSize: 80,
        color: "black",
        background: "white",
        width: "100%",
        height: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        gap: ".5em",
      }}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        viewBox="0 0 300 300"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="150" cx="50%" cy="50%" fill="hsl(224 71.4% 4.1%)" />

        <g transform="scale(0.7) translate(60 120)">
          <path
            fill="none"
            fillOpacity="1"
            stroke="hsl(210 20% 98%)"
            strokeWidth={10}
            strokeLinejoin="round"
            strokeDasharray={"none"}
            strokeOpacity={1}
            d="m 138.20133,96.169887 36.67167,-0.0021 -18.3441,45.885573 -48.88072,-28.2213 30.55424,-17.662998 18.32544,45.882238"
          />
          <path
            fill="none"
            fillOpacity="1"
            stroke="hsl(210 20% 98%)"
            strokeWidth={10}
            strokeLinejoin="round"
            strokeDasharray={"none"}
            strokeOpacity={1}
            d="M 174.76114,96.115464 156.42349,64.357912 205.33361,57.301583 V 113.74417 L 174.75988,96.114924 205.33234,57.303514"
          />
          <path
            fill="none"
            fillOpacity="1"
            stroke="hsl(210 20% 98%)"
            strokeWidth={10}
            strokeLinejoin="round"
            strokeDasharray={"none"}
            strokeOpacity={1}
            d="m 156.30265,64.359737 -18.33402,31.759648 -30.56602,-38.829243 48.88071,-28.221292 0.0195,35.292248 -48.89789,-7.070822"
          />
          <path
            fill="none"
            fillOpacity="1"
            stroke="hsl(210 20% 98%)"
            strokeWidth={10}
            strokeLinejoin="round"
            strokeDasharray={"none"}
            strokeOpacity={1}
            d="M 156.57449,240.83508 0.79304268,0.79386718 107.67958,113.81476 107.16011,57.218833 0.79315868,0.79341018 156.07603,29.022022"
          />
          <path
            fill="none"
            fillOpacity="1"
            stroke="hsl(210 20% 98%)"
            strokeWidth={10}
            strokeLinejoin="round"
            strokeDasharray={"none"}
            strokeOpacity={1}
            d="M 0.79374999,0.79456828 H 311.69983 L 156.4551,29.05424 205.3146,57.29965 311.69673,0.79353428 205.35833,113.73817"
          />
          <path
            fill="none"
            fillOpacity="1"
            stroke="hsl(210 20% 98%)"
            strokeWidth={10}
            strokeLinejoin="round"
            strokeDasharray={"none"}
            strokeOpacity={1}
            d="M 311.67188,0.83369867 156.54774,240.81234 l 48.87763,-126.99173 -48.87898,28.22029 0.001,98.76524 -48.92968,-127.09951"
          />
        </g>
      </svg>
      <div style={{ display: "flex" }}>
        lukastrombach<span style={{ color: "hsl(262 83.3% 57.8%)" }}>.dev</span>
      </div>
    </div>
  );
}
