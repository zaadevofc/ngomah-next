import { motion } from "framer-motion";

const Container = (props: any) => {
  return (
    <>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{
          type: "just",
          stiffness: 60,
          damping: 60,
        }}
      >
        <div className={`${props.className} flex mx-auto sm:max-w-sm`}>
          {props.children}
        </div>
      </motion.div>
    </>
  )
}

export default Container