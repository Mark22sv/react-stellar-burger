import styles from './loader.module.css';

export function Loader() {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-default`}>Ваш заказ готовится, ожидайте.... </h2>
      <svg className={styles.svg} viewBox="0 0 100 100">
        <filter id="blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
        <path
          id="figure8"
          fill="none"
          stroke="none"
          d="M 20 50 A 1 1 0 0 0 50 50 A 1 1 0 0 1 80 50 A 1 1 0 0 1 50 50 A 1 1 0 0 0 20 50"
        />
        <use href="#worm" filter="url(#blur)" />
        <g id="worm">
          <g opacity="0">
            <g id="c1" fill="none">
              <circle r="8" id="circle" />
              <animateMotion dur="5s" repeatCount="indefinite">
                <mpath href="#figure8" />
              </animateMotion>
            </g>
          </g>
          <use href="#circle" fill="rgba(155,255,255,0.1)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.1s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,0.2)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.2s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,0.3)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.3s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,0.4)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.4s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,0.5)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.5s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,0.6)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.6s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,0.7)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.7s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,0.8)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.8s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,0.9)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-.9s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
          <use href="#circle" fill="rgba(155,255,255,1)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="-1s">
              <mpath href="#figure8" />
            </animateMotion>
          </use>
        </g>
      </svg>

    </div>
  );
}
