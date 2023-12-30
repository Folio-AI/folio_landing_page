import { motion, useMotionValue, useTransform } from "framer-motion";

const Loading = () => {
  const angle = useMotionValue(0);
  const radius = 30;
  const dotSize = 10;
  const dotColors = ["#ff0000", "#00ff00", "#0000ff"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f1f1f1",
      }}
    >
      {dotColors.map((color, index) => {
        const x = useTransform(
          angle,
          [0, 360],
          [radius * Math.cos((index / dotColors.length) * Math.PI * 2), 0]
        );
        const y = useTransform(
          angle,
          [0, 360],
          [radius * Math.sin((index / dotColors.length) * Math.PI * 2), 0]
        );

        return (
          <motion.div
            key={index}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              backgroundColor: color,
              position: "absolute",
              top: "50%",
              left: "50%",
              x,
              y,
            }}
            animate={{
              rotate: 360,
              x: [0, radius * Math.cos((index / dotColors.length) * Math.PI * 2), 0],
              y: [0, radius * Math.sin((index / dotColors.length) * Math.PI * 2), 0],
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          ></motion.div>
        );
      })}
    </motion.div>
  );
};

export default Loading;