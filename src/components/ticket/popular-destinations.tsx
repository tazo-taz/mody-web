import { MdArrowRightAlt } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { batumiSrc, kutaisiScr, tbilisiScr } from '../../assets/images';
import useLanguage from '../../stores/useLanguage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { getBusDirectionByCities, getCityValueByName, transformTicketFormToQuery } from "../../lib/ticket";
import { useNavigate } from "react-router-dom";

export default function PopularDestinations() {
  const { getItem } = useLanguage()
  const navigate = useNavigate();

  const arr = [
    {
      cityFromTitle: getItem("Tbilisi"),
      cityFrom: getItem("Tbilisi"),
      cityToTitle: getItem("Kutaisi"),
      cityTo: getItem("Kutaisi_airport"),
      src: kutaisiScr,
    },
    {
      cityFromTitle: getItem("Kutaisi"),
      cityFrom: getItem("Kutaisi_airport"),
      cityToTitle: getItem("Tbilisi"),
      cityTo: getItem("Tbilisi"),
      src: tbilisiScr,
    },
    {
      cityFromTitle: getItem("Kutaisi"),
      cityFrom: getItem("Kutaisi_airport"),
      cityToTitle: getItem("Batumi"),
      cityTo: getItem("Batumi"),
      src: batumiSrc,
    },
    {
      cityFromTitle: getItem("Batumi"),
      cityFrom: getItem("Batumi"),
      cityToTitle: getItem("Kutaisi"),
      cityTo: getItem("Kutaisi_airport"),
      src: kutaisiScr,
    },
  ]

  const onClick = ({ cityFrom, cityTo }: {
    cityFrom: string;
    cityTo: string;
  }) => {

    const busDirection = getBusDirectionByCities(cityFrom, cityTo)
    if (busDirection) {
      const url = transformTicketFormToQuery({
        cityFrom: getCityValueByName(cityFrom),
        cityTo: getCityValueByName(cityTo),
        departureDate: new Date()
      })
      if (url) {
        navigate(url)
      }
    }
  }

  return (
    <Swiper
      className="mySwiper"
      slidesPerView={2}
      spaceBetween={20}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }}
    >
      {arr.map((item, inx) => (
        <SwiperSlide key={inx}>
          <div
            className='aspect-square relative rounded-[16px] overflow-hidden cursor-pointer active:scale-95 transition'
            onClick={() => onClick(item)}
          >
            <img
              className='absolute inset-0'
              src={item.src}
              alt={item.cityToTitle}
            />
            <div className='bottom-linear absolute bottom-0 w-full pb-6 pt-10 text-white flex text-xl justify-center items-center gap-3'>
              <h3>{item.cityFromTitle}</h3>
              <MdArrowRightAlt size={30} />
              <h3>{item.cityToTitle}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
