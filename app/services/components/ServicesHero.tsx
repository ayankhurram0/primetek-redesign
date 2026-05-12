import { motion } from "motion/react";

export const ServicesHero = () => {
  return (
    <section className="relative pt-44 pb-20 px-26 overflow-hidden">
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-6xl xl:text-8xl font-poppins uppercase font-bold text-white tracking-tighter mb-8 leading-none">
            Five Services. <br />
            <span className="text-teal-400">One Mission.</span>
          </h1>
          <p className="text-2xl w-[80%] mx-auto font-poppins text-slate-400 font-light leading-relaxed">
            Every PrimeTek service is built around a single goal — protecting and growing your pharmacy's financial performance through non-clinical operational intelligence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
