import { useRef } from "react"
import { isMobileOnly } from "react-device-detect";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import MBannerImg1 from "../assets/image/factory/factory1m.jpg"
import MBannerImg2 from "../assets/image/factory/factory2m.jpg"
// import MBannerImg3 from "../assets/image/factory/factory3m.jpg"

import BannerImg1 from "../assets/image/factory/factory1pc.jpg"
import BannerImg2 from "../assets/image/factory/factory2pc.jpg"
// import BannerImg3 from "../assets/image/factory/factory3pc.jpg"

const PageCompany = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, })
  )

  if (isMobileOnly) {
    return (
      <main className="page mobile">
        <div>
          <Carousel className="w-full"
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}>
            <CarouselContent>

              <CarouselItem >
                <img src={MBannerImg1} alt="hi-jewel-factory-1" />
              </CarouselItem>
              <CarouselItem >
                <img src={MBannerImg2} alt="hi-jewel-factory-2" />
              </CarouselItem>
              {/* <CarouselItem >
                <img src={MBannerImg3} alt="hi-jewel-factory-3" />
              </CarouselItem> */}

            </CarouselContent>
          </Carousel>
        </div>
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
              <img src={BannerImg1} alt="hi-jewel-factory-1" />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg2} alt="hi-jewel-factory-2" />
            </CarouselItem>
            {/* <CarouselItem >
              <img src={BannerImg3} alt="hi-jewel-factory-3" />
            </CarouselItem> */}

          </CarouselContent>
        </Carousel>
      </div>
    </main>
  )
}

export default PageCompany