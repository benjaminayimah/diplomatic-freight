import React from 'react'
import { motion } from 'framer-motion'


function StaggeredText({ data, index }) {
  return (
    <span className={`${data.spanStyle} inline-block align-middle overflow-hidden`}>
      <motion.div
        className={`${!data.video ? "inline-block" : ""} ${data.style}`}
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.3,
          delay: index * 0.1,
          ease: 'easeOut',
          type: 'spring',
          stiffness: 200,
          damping: 50,
        }}
      >
        {!data.video ? (
          data.word
        ) : (
          <span className="heroVideoWrapper rounded-full p-2 md:p-4 pl-0! inline-block w-23 h-20 md:h-30 md:w-35">
            <video src={data.src} preload="auto" autoPlay loop muted playsInline />
          </span>
        )}
      </motion.div>
    </span>
  )
}

export default StaggeredText