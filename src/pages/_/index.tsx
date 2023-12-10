import BottomBar from "@/components/BottomBar";
import CardCurrentPosition from "@/components/CardCurrentPosition";
import CardHistory from "@/components/CardHistory";
import CardInfo from "@/components/CardInfo";
import CardRating from "@/components/CardRating";
import CardRecommend from "@/components/CardRecommend";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";


const index = () => {
  return (
    <>
        <Container className="mb-16 h-full flex-col">
          <div className="flex flex-col">
            <Navbar />
            <CardInfo />
            <CardCurrentPosition />
            <CardHistory />
            <CardRating />
            <CardRecommend />
          </div>
        </Container>
        <BottomBar />
    </>
  )
}

export default index