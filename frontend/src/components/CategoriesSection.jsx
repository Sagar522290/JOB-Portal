import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const CategoriesSection = () => {
    const categories = [
        "Software Development",
        "Data Science",
        "Graphic Design",
        "Marketing",
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
    ]


    
    const categorySlides = categories.reduce((slides, category, index) => {
        const slideIndex = Math.floor(index / 3)
        slides[slideIndex] ??= []
        slides[slideIndex].push(category)
        return slides
    }, [])

    return (
        <div>
            <Carousel
                className="relative mx-auto my-16 w-full max-w-5xl px-4"
                showArrows
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={(clickHandler, hasPrev) => (
                    <button
                        type="button"
                        onClick={clickHandler}
                        disabled={!hasPrev}
                        aria-label="Previous category"
                        className="absolute left-2 top-[52px] z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#6A38C2] bg-white text-2xl text-[#6A38C2] shadow-md hover:bg-[#6A38C2] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <i className="fa-solid fa-circle-arrow-left" aria-hidden="true"></i>
                    </button>
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                    <button
                        type="button"
                        onClick={clickHandler}
                        disabled={!hasNext}
                        aria-label="Next category"
                        className="absolute right-2 top-[52px] z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#6A38C2] bg-white text-2xl text-[#6A38C2] shadow-md hover:bg-[#6A38C2] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <i className="fa-solid fa-circle-arrow-right" aria-hidden="true"></i>
                    </button>
                )}
            >
                {categorySlides.map((slide, slideIndex) => (
                    <div key={slideIndex} className="grid grid-cols-1 gap-4 px-12 pb-10 sm:grid-cols-2 lg:grid-cols-3">
                        {slide.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className="mt-5 rounded-full border border-[#6A38C2] bg-white px-6 py-4 text-sm font-semibold text-[#6A38C2] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#6A38C2] hover:text-white hover:shadow-lg active:scale-95"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default CategoriesSection
