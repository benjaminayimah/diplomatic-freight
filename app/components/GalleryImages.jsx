
import Image from 'next/image'
import { motion } from 'framer-motion'
import useLazyImage from "@/hooks/useLazyImage.js"


function GalleryImages({fullSrc, opacity, index}) {

  const blurImage = fullSrc.replace(
    "/image/upload/",
    "/image/upload/w_20,e_blur:300,q_auto/"
  );

  const { ref, src } = useLazyImage(fullSrc);

  return (
    <div className="imageContainer">
      <div
        ref={ref}
        className="absolute inset-0"
      >
        {/* Blurred placeholder */}
        <Image
          src={blurImage}
          alt={`Gallery_${index}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Full image */}
        {src && (
          <Image
            src={src}
            alt={`Gallery_${index}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        )}
      </div>
      {
        index === 0 && 
        <motion.div
          style={{opacity}}
          className='inset-0 p-2 md:p-5 text-white bg-black/80 pointer-events-none absolute flex flex-col gap-2 items-center justify-center text-center'
          >
            <h1 className='text-base md:text-3xl font-medium'>Moving What Matters</h1>
            <p className='text-xs md:text-base'>From oversized cargo to sensitive logistics, see how we keep the world moving.</p>
        </motion.div>
      }
    </div>
  )
}

export default GalleryImages