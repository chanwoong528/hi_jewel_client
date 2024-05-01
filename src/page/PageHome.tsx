import { useRef } from "react"
import ListProductType from "@/components/list/ListProductType"
import BannerImg1 from "../assets/image/main-1.jpg"
import BannerImg2 from "../assets/image/main-2.jpg"
import BannerImg3 from "../assets/image/main-3.jpg"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


const PageHome = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, })
  )
  return (
    <main className="page">
      <div className="home-banner max-w-full">
        <Carousel className="w-full"
          plugins={[plugin.current]}

          opts={{

            align: "start",
            loop: true,
          }}>
          <CarouselContent>
            <CarouselItem >
              <img src={BannerImg1} />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg2} />
            </CarouselItem>
            <CarouselItem >
              <img src={BannerImg3} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <ListProductType type="main" />

    </main>
  )
}

export default PageHome