export const listVar = (index?: number) => {
  return {
    container: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,

        transition: {
          delayChildren: index ? index * 0.4 : 0.5,
          staggerChildren: 0.05,
        },
      },
    },

    item: {
      exit: {
        y: 20,
        opacity: 0,
        transition: {
          damping: 12,
          stiffness: 200,
        },
      },
      hidden: {
        y: 20,
        opacity: 0,
        transition: {
          damping: 12,
          stiffness: 200,
        },
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
    },
  };
};
