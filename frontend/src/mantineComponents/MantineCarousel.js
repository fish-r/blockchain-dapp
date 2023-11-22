import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

const images = ['https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png',
    'https://i.insider.com/599db8c024fbd13c008b4610?width=1000&format=jpeg&auto=webp',
    'https://i.insider.com/599db8c024fbd13c008b4610?width=1000&format=jpeg&auto=webp',
    'https://i.insider.com/599db8c024fbd13c008b4610?width=1000&format=jpeg&auto=webp',
    'https://i.insider.com/599db8c024fbd13c008b4610?width=1000&format=jpeg&auto=webp',
];

// function MantineCarousel() {
//     const slides = images.map((url) => (
//         <Carousel.Slide key={url} h={200}>
//             <Image src={url} sizes='xs' />
//         </Carousel.Slide>
//     ));

//     return <Carousel withIndicators>{slides}</Carousel>;
// }


function MantineCarousel() {
    const slides = images.map((url) => (
        <Carousel.Slide key={url} h={200}>
            <Image src={url} sizes='xs' />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            withIndicators
            height={400}
            slideSize="33.333333%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
        >
            {slides}
        </Carousel>
    );
}

export default MantineCarousel;