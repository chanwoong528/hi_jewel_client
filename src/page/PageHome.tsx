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
    Autoplay({
      delay: 54000,
      stopOnInteraction: false,
    })
  )
  return (
    <main className="page md:px-0">
      <div className="home-banner w-full">
        <Carousel className="w-full"
          plugins={[plugin.current]}

          opts={{

            align: "center",
            loop: true,
          }}>
          <CarouselContent>
            <CarouselItem className="w-full">
              <img className="w-full" src={BannerImg1} alt="hi-jewel-main-logo" />
            </CarouselItem>
            <CarouselItem >
              <img className="w-full" src={BannerImg2} alt="hi-jewel-main-logo" />
            </CarouselItem>
            <CarouselItem >
              <img className="w-full" src={BannerImg3} alt="hi-jewel-main-logo" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <ListProductType type="main" />

    </main>
  )
}

export default PageHome