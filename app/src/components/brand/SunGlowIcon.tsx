/**
 * Decorative sun/flame icon, adapted from a Uiverse.io component (by
 * Javierrocadev). The original is a 256px card; scaled down to sit next to
 * the theme toggle in the nav while keeping every proportion and the hover
 * glow animation intact.
 */
export function SunGlowIcon() {
  return (
    <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl" aria-hidden="true">
      <div className="h-64 w-64 origin-top-left" style={{ transform: "scale(0.5)" }}>
        <div className="group relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-xl bg-neutral-800">
          <div className="absolute bottom-8 h-24 w-24 bg-red-300">
            <div className="absolute h-24 w-24 shadow-2xl duration-500 [box-shadow:0px_-75px_55px_-30px_#262626] group-hover:[box-shadow:0px_-75px_95px_0px_#FDE047]">
              <div className="h-24 w-24 bg-neutral-50 shadow-inner shadow-yellow-200" />
              <div className="absolute -bottom-12 h-24 w-24 rounded-full bg-neutral-50 [transform:_rotateX(80deg)]" />
              <div className="absolute -top-12 h-24 w-24 rounded-full border-4 border-yellow-300 bg-yellow-400 [transform:_rotateX(80deg)]" />
            </div>
            <svg
              className="absolute -top-12 left-4 h-16 w-16 rounded-full fill-yellow-300 shadow-yellow-200 duration-500 group-hover:-skew-x-2"
              height="100"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 100 100"
              width="100"
              x="0"
              xmlns="http://www.w3.org/2000/svg"
              y="0"
            >
              <path
                d="M59.5,20.5a3.9,3.9,0,0,0-2.5-2,4.3,4.3,0,0,0-3.3.5,11.9,11.9,0,0,0-3.2,3.5,26,26,0,0,0-2.3,4.4,76.2,76.2,0,0,0-3.3,10.8,120.4,120.4,0,0,0-2.4,14.2,11.4,11.4,0,0,1-3.8-4.2c-1.3-2.7-1.5-6.1-1.5-10.5a4,4,0,0,0-2.5-3.7,3.8,3.8,0,0,0-4.3.9,27.7,27.7,0,1,0,39.2,0,62.4,62.4,0,0,1-5.3-5.8A42.9,42.9,0,0,1,59.5,20.5ZM58.4,70.3a11.9,11.9,0,0,1-20.3-8.4s3.5,2,9.9,2c0-4,2-15.9,5-17.9a21.7,21.7,0,0,0,5.4,7.5,11.8,11.8,0,0,1,3.5,8.4A12,12,0,0,1,58.4,70.3Z"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
