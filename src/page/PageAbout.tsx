import { useRef } from "react"
import { isMobileOnly } from "react-device-detect";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import BannerImg1 from "../assets/image/about/about1.jpg"
import BannerImg2 from "../assets/image/about/about2.jpg"
import BannerImg3 from "../assets/image/about/about3.jpg"

import BannerImg4 from "../assets/image/about/about4.jpg"
import BannerImg5 from "../assets/image/about/about5.jpg"
import BannerImg6 from "../assets/image/about/about6.jpg"

import BannerImg7 from "../assets/image/about/about7.jpg"
import BannerImg8 from "../assets/image/about/about8.jpg"


import MBannerImg1 from "../assets/image/about/aboutm1-min.jpg"
import MBannerImg2 from "../assets/image/about/aboutm2-min.jpg"
import MBannerImg3 from "../assets/image/about/aboutm3-min.jpg"
import MBannerImg4 from "../assets/image/about/aboutm4-min.jpg"
import MBannerImg5 from "../assets/image/about/aboutm5-min.jpg"
import MBannerImg6 from "../assets/image/about/aboutm6-min.jpg"
import MBannerImg7 from "../assets/image/about/aboutm7-min.jpg"
import MBannerImg8 from "../assets/image/about/aboutm8-min.jpg"


const PageAbout = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, })
  )

  if (isMobileOnly) {
    return (
      <main className="page mobile">
        <Carousel className="w-full"
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}>
          <CarouselContent>
            <CarouselItem >
              <img src={MBannerImg1} alt="hi-jewel-about-1" />
            </CarouselItem>
            <CarouselItem >
              <img src={MBannerImg2} alt="hi-jewel-about-2" />
            </CarouselItem>
            <CarouselItem >
              <img src={MBannerImg3} alt="hi-jewel-about-3" />
            </CarouselItem>
            <CarouselItem >
              <img src={MBannerImg4} alt="hi-jewel-about-4" />
            </CarouselItem>
            <CarouselItem >
              <img src={MBannerImg5} alt="hi-jewel-about-5" />
            </CarouselItem>
            <CarouselItem >
              <img src={MBannerImg6} alt="hi-jewel-about-6" />
            </CarouselItem>
            <CarouselItem >
              <img src={MBannerImg7} alt="hi-jewel-about-7" />
            </CarouselItem>
            <CarouselItem >
              <img src={MBannerImg8} alt="hi-jewel-about-8" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </main>
    )

  }

  return (
    <main className="page">
      <div>
        <Carousel className="w-full"
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}>
          <CarouselContent>
            <CarouselItem >
              <img src={BannerImg1} alt="hi-jewel-about-1" />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg2} alt="hi-jewel-about-2" />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg3} alt="hi-jewel-about-3" />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg4} alt="hi-jewel-about-4" />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg5} alt="hi-jewel-about-5" />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg6} alt="hi-jewel-about-6" />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg7} alt="hi-jewel-about-7" />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg8} alt="hi-jewel-about-8" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </main>
  )
}

export default PageAbout