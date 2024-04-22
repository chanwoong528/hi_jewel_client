import ListProductType from "@/components/list/ListProductType"
import BannerImg1 from "../assets/image/main-1.jpg"
import BannerImg2 from "../assets/image/main-2.jpg"
import BannerImg3 from "../assets/image/main-3.jpg"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const PageHome = () => {
  return (
    <main className="page">
      <div className="home-banner">
        <Carousel className="w-full">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <ListProductType type="main" />

    </main>
  )
}

export default PageHome