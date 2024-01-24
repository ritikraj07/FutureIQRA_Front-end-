import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../Styles/Review.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Avatar, Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";

const ReviewSlider = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty(
      "--progress",
      `${1 - progress * 100}%`
    );
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  // Use Chakra UI's useMediaQuery hook to check for screen size
   const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
   const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");

  
  const reviews = [
    {
      name: "John Doe",
      words: "Impressive e-learning platform with top-notch courses.",
      image:
        "https://images.pexels.com/photos/12903195/pexels-photo-12903195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4,
    },
    {
      name: "Alice Johnson",
      words: "Exceptional content and an intuitive user interface.",
      image:
        "https://media.istockphoto.com/id/1354898581/photo/shot-of-a-young-businessman-using-a-laptop-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=dDDNcvIoG-4VdO01ZlENqODBoNocT434vIFp0duuTZM=",
      rating: 5,
    },
    {
      name: "Chris Williams",
      words: "Highly recommended for anyone seeking quality education.",
      image:
        "https://media.istockphoto.com/id/843545374/photo/young-businessman-suddenly-got-great-idea-at-work-desk.webp?b=1&s=170667a&w=0&k=20&c=ZcKT5DE8GPI3tcs3boaK-eE2VT-wHAbIjNVIllbj95k=",
      rating: 3,
    },
    {
      name: "Emma Davis",
      words: "Outstanding courses with excellent instructors.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiisrn60VjYzgXfsffl7XX8aGNIaWmR89lKJL3TjV2Ojz4FD0-wdnKoCmVYh008IrfJsg&usqp=CAU",
      rating: 5,
    },
    {
      name: "Sophie Lee",
      words: "Easy navigation and comprehensive learning materials.",
      image:
        "https://img.freepik.com/premium-photo/portrait-young-man-sitting-his-desk-office_484651-5103.jpg",
      rating: 5,
    },
    {
      name: "Michael Brown",
      words: "Engaging lessons and quizzes make learning enjoyable.",
      image:
        "https://i.pinimg.com/originals/ee/d3/03/eed303679e96d27a96cd4850f4e3fb4c.jpg",
      rating: 4,
    },
    {
      name: "Olivia Wilson",
      words: "Diverse courses catering to different interests.",
      image:
        "https://media.istockphoto.com/id/1369746033/photo/portrait-of-a-handsome-young-businessman-working-in-office.jpg?s=612x612&w=0&k=20&c=ca1AFfPfzOPtHZdAwa7QtCD1TFDws7PG9t_rqSibdC0=",
      rating: 4,
    },
  ];

  const styleQuots = { fontFamily: "sans-serif", fontSize: "15px", margin:'0px 2px' };

  return (
    <Swiper
      onSwiper={setSwiperRef}
      slidesPerView={isSmallerThan600 ? 1 : isSmallerThan900 ? 2 : 3} // Adjust slidesPerView based on screen size
      centeredSlides={false}
      spaceBetween={30}
      className="mySwiper"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
    >
      {reviews.map((review, i) => (
        <SwiperSlide style={{ borderRadius: "10px" }} key={i}>
          <Box className="swiperSlideCard">
            <Box>
              <Avatar
                src={review.image}
                alt={review.name}
                width={"60px"}
                h={"60px"}
                mr={"10px"}
              />
              <Text color={"white"} mt={4} fontWeight="bold">
                {review.name}
              </Text>
            </Box>
            <StarRating rating={review.rating} />

            <Text color={"white"} fontSize={"sm"} fontWeight={"normal"} mt={2}>
              <span style={styleQuots} >&#8220;</span>
              {review.words}
              <span style={styleQuots} >&#8221;</span>
            </Text>
          </Box>
        </SwiperSlide>
      ))}
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
};





const StarRating = ({ rating }) => {
  // Ensure the rating is within the range [0, 5]
  const normalizedRating = Math.min(Math.max(rating, 0), 5);

  // Create an array of stars based on the rating
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const isFilled = index < Math.floor(normalizedRating);
    return (
      <Box
        key={index}
        as="span"
        fontSize="xxx-large"
        color={isFilled ? "yellow.400" : "gray.300"}
        
      >
        ★
      </Box>
    );
  });

  return <Box>{stars}</Box>;
};










export default ReviewSlider;



