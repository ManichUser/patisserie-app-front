import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Mock data avec vraies images
const specialOffers = [
  {
    id: 1,
    title: "Gâteau au chocolat",
    discount: "-30%",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    bgColor: "from-amber-900/90 to-amber-700/90"
  },
  {
    id: 2,
    title: "Cupcakes assortis",
    discount: "-25%",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80",
    bgColor: "from-pink-900/90 to-pink-700/90"
  },
  {
    id: 3,
    title: "Tarte aux fruits",
    discount: "-20%",
    image: "https://images.unsplash.com/photo-1519915212116-715fb0bc3734?w=800&q=80",
    bgColor: "from-red-900/90 to-red-700/90"
  },
  {
    id: 4,
    title: "Macarons colorés",
    discount: "-35%",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80",
    bgColor: "from-purple-900/90 to-purple-700/90"
  },
  {
    id: 5,
    title: "Donut fraise",
    discount: "-15%",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
    bgColor: "from-rose-900/90 to-rose-700/90"
  },
  {
    id: 6,
    title: "Cheesecake vanille",
    discount: "-40%",
    image: "https://images.unsplash.com/photo-1533134242782-0b5e6a1e5fb2?w=800&q=80",
    bgColor: "from-orange-900/90 to-orange-700/90"
  },
  {
    id: 7,
    title: "Brownies",
    discount: "-20%",
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80",
    bgColor: "from-yellow-900/90 to-yellow-700/90"
  },
  {
    id: 8,
    title: "Tiramisu",
    discount: "-30%",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    bgColor: "from-amber-900/90 to-amber-700/90"
  },
]

export function SpecialOffers() {
  return (
    <section className="px-4 mt-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Offres spéciales</h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {specialOffers.map((offer) => (
            <CarouselItem key={offer.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
                {/* Image de fond */}
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                />
                
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-linear-to-t ${offer.bgColor} opacity-60 group-hover:opacity-70 transition-opacity`} />
                
                {/* Badge réduction */}
                <div className="absolute top-4 right-4 bg-white text-amber-700 font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                  {offer.discount}
                </div>
                
                {/* Contenu */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {offer.title}
                  </h3>
                  <button className="bg-white text-amber-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    J'en profite
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Boutons de navigation */}
        <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-6" />
        <CarouselNext className="hidden sm:flex -right-4 lg:-right-6" />
      </Carousel>
    </section>
  )
}