import ListProductType from "@/components/list/ListProductType"
import BannerImgUrl from "../assets/image/banner.jpg"

const PageHome = () => {
  return (
    <main className="page">
      <div className="home-banner">
        <img src={BannerImgUrl} />
      </div>
      <ListProductType type="main" />

    </main>
  )
}

export default PageHome