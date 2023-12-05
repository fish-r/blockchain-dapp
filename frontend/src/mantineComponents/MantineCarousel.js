import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

const images = ['https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png',
    'https://i.insider.com/599db8c024fbd13c008b4610?width=1000&format=jpeg&auto=webp',
    'https://i.guim.co.uk/img/media/b4cd7b50f33f0f780b5023c173abb7c148a59d06/0_0_2000_2000/master/2000.jpg?width=445&dpr=1&s=none',
    'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png',
    'https://upload.wikimedia.org/wikipedia/en/2/27/Justin_Bieber_-_Purpose_%28Official_Album_Cover%29.png'

];


function MantineCarousel() {
    const slides = images.map((url) => (
        <Carousel.Slide >
            <Image src={url} sizes='xs' />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            withIndicators
            slideSize="33.333333%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
            mb={20}
        >
            {slides}
        </Carousel>
    );
}

export default MantineCarousel;


// function MantineCarousel() {
//     const slides = images.map((url) => (
//         <Carousel.Slide key={url} h={200}>
//             <Image src={url} sizes='xs' />
//         </Carousel.Slide>
//     ));

//     return <Carousel withIndicators>{slides}</Carousel>;
// }
