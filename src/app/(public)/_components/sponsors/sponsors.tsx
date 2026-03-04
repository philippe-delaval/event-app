"use client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slider from "react-infinite-logo-slider";
import Image from "next/image";

export default function Sponsors() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-primary-gray">
          Sponsorisé par les entreprises les plus innovantes dans le domaine du
          développement web
        </h2>
        <div className="mt-10">
          <Slider
            width="250px"
            duration={40}
            pauseOnHover={true}
            blurBorders={true}
            blurBoderColor={false}
          >
            <Slider.Slide className="mx-4">
              <a
                href="https://logoipsum.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/sponsors/logoipsum-218.png" alt="image1" width={200} height={100} style={{ objectFit: 'contain' }} />
              </a>
            </Slider.Slide>
            <Slider.Slide className="mx-4">
              <a
                href="https://logoipsum.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/sponsors/logoipsum-220.png" alt="image2" width={200} height={100} style={{ objectFit: 'contain' }} />
              </a>
            </Slider.Slide>
            <Slider.Slide className="mx-4">
              <a
                href="https://logoipsum.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/sponsors/logoipsum-264.png" alt="image3" width={200} height={100} style={{ objectFit: 'contain' }} />
              </a>
            </Slider.Slide>
            <Slider.Slide className="mx-4">
              <a
                href="https://logoipsum.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/sponsors/logoipsum-227.png" alt="image4" width={200} height={100} style={{ objectFit: 'contain' }} />
              </a>
            </Slider.Slide>
            <Slider.Slide className="mx-4">
              <a
                href="https://logoipsum.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/sponsors/logoipsum-263.png" alt="image5" width={200} height={100} style={{ objectFit: 'contain' }} />
              </a>
            </Slider.Slide>
            <Slider.Slide className="mx-4">
              <a
                href="https://logoipsum.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/sponsors/logoipsum-286.png" alt="image6" width={200} height={100} style={{ objectFit: 'contain' }} />
              </a>
            </Slider.Slide>
            <Slider.Slide className="mx-4">
              <a
                href="https://logoipsum.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/sponsors/logoipsum-297.png" alt="image7" width={200} height={100} style={{ objectFit: 'contain' }} />
              </a>
            </Slider.Slide>
          </Slider>
        </div>
      </div>
    </div>
  );
}
