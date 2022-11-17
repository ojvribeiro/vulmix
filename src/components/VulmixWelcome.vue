<template>
  <Head>
    <title>Vue + Laravel Mix = Vulmix</title>

    <meta name="title" content="Your application title" />
    <meta name="description" content="Your application description" />

    <link rel="icon" href="/assets/icons/favicon.png" />
  </Head>

  <section class="vulmix-welcome">
    <div>
      <div class="vulmix-logo">
        <svg
          width="326"
          height="114"
          viewBox="0 0 326 114"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M215.093 53.2945L215.323 59.5586L215.093 59.0239C216.372 56.7322 218.034 54.9496 220.079 53.6765C222.125 52.4033 224.555 51.7667 227.368 51.7667C230.078 51.7667 232.329 52.3524 234.119 53.5237C235.96 54.6442 237.137 56.3757 237.648 58.7183L237.265 58.8711C238.646 56.6813 240.359 54.9496 242.404 53.6765C244.502 52.4033 246.675 51.7667 248.926 51.7667C252.199 51.7667 254.782 52.6834 256.675 54.5168C258.618 56.3502 259.615 58.7183 259.667 61.6213V86.2195H250V65.5173C249.949 63.9894 249.668 62.7416 249.156 61.774C248.645 60.8064 247.596 60.2717 246.011 60.1698C244.272 60.1698 242.762 60.7554 241.485 61.9268C240.206 63.0981 239.234 64.6005 238.569 66.4339C237.904 68.2674 237.572 70.1771 237.572 72.1633V86.2195H227.828V65.5173C227.777 63.9894 227.47 62.7416 226.908 61.774C226.345 60.8064 225.271 60.2717 223.685 60.1698C221.947 60.1698 220.463 60.7554 219.236 61.9268C218.008 63.0981 217.062 64.6005 216.397 66.4339C215.732 68.2164 215.4 70.1007 215.4 72.0869V86.2195H205.657V53.2945H215.093Z"
            fill="#F3A1F0"
          />
          <path
            d="M264.082 53.2945H273.826V86.2195H264.082V53.2945ZM263.852 41.6066C263.852 40.1806 264.415 39.0093 265.541 38.0925C266.717 37.1249 267.97 36.6411 269.299 36.6411C270.629 36.6411 271.832 37.1249 272.906 38.0925C274.03 39.0093 274.593 40.1806 274.593 41.6066C274.593 43.0835 274.03 44.2803 272.906 45.197C271.832 46.1137 270.629 46.5721 269.299 46.5721C267.97 46.5721 266.717 46.1137 265.541 45.197C264.415 44.2803 263.852 43.0835 263.852 41.6066Z"
            fill="#F3A1F0"
          />
          <path
            d="M274.084 86.2195L299.402 53.2945H309.145L283.751 86.2195H274.084ZM310.832 86.2195H299.018L273.7 53.2945H285.669L310.832 86.2195Z"
            fill="#F3A1F0"
          />
          <path
            d="M135.804 86.9837L116.252 53.2949H127.76L135.804 67.2747L143.564 53.2949H154.381L135.804 86.9837Z"
            fill="#3DDA98"
          />
          <path
            d="M164.849 87.7476C161.832 87.7476 159.326 86.831 157.331 84.9975C155.336 83.1642 154.287 80.796 154.185 77.8931V53.2949H163.929V74.3027C164.03 75.8306 164.44 77.0783 165.156 78.0459C165.923 78.9626 167.151 79.4464 168.838 79.4973C170.475 79.4973 171.907 78.9626 173.135 77.8931C174.362 76.8236 175.308 75.3722 175.973 73.5388C176.689 71.6544 177.047 69.5664 177.047 67.2747V53.2949H186.79V86.2198H177.047L177.2 79.6502L177.431 80.4905C176.357 82.6294 174.72 84.3864 172.521 85.7615C170.373 87.0856 167.815 87.7476 164.849 87.7476Z"
            fill="#3DDA98"
          />
          <path
            d="M191.334 26.2522H201.077V86.2198H191.334V26.2522Z"
            fill="#3DDA98"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.6957 15.4576L62.9839 75.001L98.6907 15.4576H108.624L93.8276 42.2906C101.869 46.2736 107.395 54.5386 107.395 64.0886C107.395 77.5263 96.4544 88.4198 82.959 88.4198C78.334 88.4198 74.0091 87.1402 70.3217 84.9173L62.7917 98.5723L54.9953 85.1395C51.3914 87.2253 47.2029 88.4198 42.7342 88.4198C29.2389 88.4198 18.2989 77.5263 18.2989 64.0886C18.2989 55.0736 23.2227 47.2037 30.5384 42.9998L14.5536 15.4576H24.6957ZM50.831 77.9642L34.7028 50.1752C29.8723 52.9459 26.6203 58.139 26.6203 64.0886C26.6203 72.9501 33.8347 80.1338 42.7342 80.1338C45.6857 80.1338 48.4519 79.3436 50.831 77.9642ZM89.8164 49.5645L74.3328 77.6435C76.8269 79.2204 79.7859 80.1338 82.959 80.1338C91.8586 80.1338 99.073 72.9501 99.073 64.0886C99.073 57.6688 95.2867 52.1297 89.8164 49.5645Z"
            fill="#3DDA98"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30.7207 15.4576L62.8333 65.3971L92.7811 15.4576H81.9361L79.0042 20.7397C74.8315 17.4332 69.5477 15.4576 63.8006 15.4576C57.2218 15.4576 51.2503 18.0464 46.8575 22.2566L42.9451 15.4576H30.7207ZM62.7917 49.9476L74.8915 28.1488C72.0025 25.4186 68.098 23.7436 63.8006 23.7436C58.6966 23.7436 54.1469 26.1065 51.1944 29.7936L62.7917 49.9476Z"
            fill="#3DDA98"
          />
        </svg>
      </div>

      <div class="vulmix-card">
        <p>
          Get started by replacing the
          <code>&lt;VulmixWelcome /&gt;</code> component with
          <code>&lt;App /&gt;</code>.
        </p>

        <p>
          Start coding in <code>pages/index.vue</code> and create your pages
          inside the <code>/pages</code> directory.
        </p>

        <p>
          <a
            href="http://vulmix.vercel.app/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            >Check out the docs</a
          >
          for more information.
        </p>
      </div>
    </div>
  </section>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata&family=Roboto+Flex:opsz@8..144&display=swap');

  .vulmix-welcome {
    position: relative;
    background-color: #181818;
    height: 100%;
    display: grid;
    place-items: center;
    align-items: center;
    padding-inline: 24px;
    font-size: 1rem;
    font-family: 'Roboto Flex', Arial, Helvetica, sans-serif;
    overflow: hidden;
  }

  .vulmix-welcome > div {
    z-index: 0;
  }

  .vulmix-welcome::before,
  .vulmix-welcome::after {
    content: '';
    width: 350px;
    height: 350px;
    border-radius: 50%;
    filter: blur(180.627px);
    position: absolute;
    z-index: 0;
  }

  .vulmix-welcome::before {
    background-color: #3dda98;
    bottom: -37%;
    left: -6%;
  }

  .vulmix-welcome::after {
    background-color: #f3a1f0;
    top: -37%;
    right: -10%;
  }

  .vulmix-welcome code {
    font-family: 'Inconsolata', 'Courier New', Courier, monospace;
    background-color: rgba(255 255 255 / 11%);
    border-radius: 4px;
    padding: 4px 3px;
  }

  .vulmix-welcome .vulmix-logo {
    width: 326px;
    height: 114px;
    max-width: 100%;
    margin: 0 auto 56px;
  }

  .vulmix-welcome .vulmix-card {
    background-color: rgba(73 73 73 / 50%);
    color: #fff;
    padding: 24px;
    border-radius: 16px;
  }

  .vulmix-welcome .vulmix-card a {
    color: #3dda98;
  }

  .vulmix-welcome .vulmix-card p {
    margin-bottom: 24px;
  }
</style>
