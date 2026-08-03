import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useEffect, useRef } from "react";
import Image from "next/image";
import "./style.css"

gsap.registerPlugin(ScrollTrigger);
export default function GridItem(){
    const containerRef = useRef<HTMLDivElement>(null);
   
    const list = [
        {
            image: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?cs=srgb&dl=close-up-cooking-dinner-46239.jpg&fm=jpg",
            name: "Salmon Dish",
            position: "top-[5%] left-[2%]"
        },
        {
            image:"https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=beef-bread-buns-1633578.jpg&fm=jpg",
            name: "Beef Burger",
            position: "top-[30%] left-[25%]"
        },
        {
             image: "https://static.vecteezy.com/system/resources/thumbnails/036/497/878/small_2x/ai-generated-grilled-fish-with-herbs-on-a-white-plate-isolated-on-transparent-background-png.png",
             name: "Grilled Fish",
             position: "top-[65%] left-[8%]"
        },
        {
             image: "https://tse2.mm.bing.net/th/id/OIP.iL6trPd9fg-1WCb9UMSaqwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
             name: "Special Dessert",
             position: "top-[75%] left-[45%]"
        },
        {
             image: "https://tse3.mm.bing.net/th/id/OIP.zJptCPR39Bz7ljFM1uUmkwHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
             name: "Gourmet Meal",
             position: "top-[10%] left-[70%]"
        },
        {
            image: "https://anitalianinmykitchen.com/wp-content/uploads/2019/05/roasted-veg-photo-1-of-1-683x1024.jpg",
            name: "Roasted Veggies",
            position: "top-[55%] left-[80%]"
        }
    ]

    useEffect(() => {
        if (containerRef.current) {
            const cards = containerRef.current.querySelectorAll('.floating-card');
            gsap.fromTo(cards, 
                { y: 100, opacity: 0, scale: 0.8 ,}, 
                { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
            );
        }
        
       const king = document.getElementById("king")
       if (king) {
           king.addEventListener("click", () => {
               gsap.to(king, {
                   y:100,
                   duration: 1,
                   scale: 1.5,
                   ease: "power2.out"
               })
           })
       }

    }, []);

    useLayoutEffect(() => {
       if (containerRef.current) {
           const cards = containerRef.current.querySelectorAll('.floating-card');
           gsap.fromTo(cards, 
               { y: 100, opacity: 0, scale: 0.8 ,},
               { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: {trigger: ".floating-card", start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse"} }
           );
       }
       
      const king = document.getElementById("king")
      if (king) {
          king.addEventListener("click", () => {
              gsap.to(king, {
                  y:100,
                  duration: 1,
                  scale: 1.5,
                  ease: "power2.out"
              })
          })
      }
    }, []);
    return (
        <section className="relative min-h-[1200px] w-full overflow-hidden bg-[#222]">
            {/* Split background */}
            <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
            
            <div ref={containerRef} className="relative w-full h-full min-h-[1000px]">
                {list.map((i, index) => (
                    <div key={index} className={`absolute ${i.position} floating-card flex flex-col items-center group 
                    transition-transform duration-500 hover:scale-105 hover:z-10 bg-white p-3
                     pb-8 rounded-xl shadow-2xl w-64`}>
                        <Image 
                            src={i.image} 
                            alt={i.name} 
                            width={500} 
                            height={600}
                             id="king" 
                            className="cursor-pointer  object-cover rounded-lg aspect-[3/4] w-full" 
                        />
                        <div className="absolute bottom-4 left-4">
                            <p className="text-sm font-semibold text-gray-800">{i.name}</p>
                            <div className="w-8 h-1 bg-green-500 mt-1"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
