import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

import "./style.css";

import { useElementSize } from 'usehooks-ts';
import image1 from "../../assets/images/slider/1.png";

export default function Slider() {
    const [squareRef, { width }] = useElementSize()

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class="${className} inline-block !w-[12px] !h-[12px] !mx-1.5"></span>`;
        },
    };

    return (
        <div ref={squareRef}>
            <Swiper
                pagination={pagination}
                autoplay={{
                    delay: 2500,
                }}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="mySwiper h-[200px] md:h-[400px] rounded-primary"
                style={{ width }}
            >
                <SwiperSlide>
                    <img
                        src={image1}
                        alt='Img 1'
                    />
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
            </Swiper>
        </div>
    )
}
