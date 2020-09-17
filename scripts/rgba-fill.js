// Simple example, see optional options for more configuration.
const fillPickr = Pickr.create({
  el: ".fill",
  theme: "nano", // or 'monolith', or 'nano'
  showAlways: false,

  //   swatches: [
  //     "rgba(244, 67, 54, 1)",
  //     "rgba(233, 30, 99, 0.95)",
  //     "rgba(156, 39, 176, 0.9)",
  //     "rgba(103, 58, 183, 0.85)",
  //     "rgba(63, 81, 181, 0.8)",
  //     "rgba(33, 150, 243, 0.75)",
  //     "rgba(3, 169, 244, 0.7)",
  //     "rgba(0, 188, 212, 0.7)",
  //     "rgba(0, 150, 136, 0.75)",
  //     "rgba(76, 175, 80, 0.8)",
  //     "rgba(139, 195, 74, 0.85)",
  //     "rgba(205, 220, 57, 0.9)",
  //     "rgba(255, 235, 59, 0.95)",
  //     "rgba(255, 193, 7, 1)",
  //   ],

  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      //   hex: true,
      //   rgba: true,
      //   hsla: true,
      //   hsva: true,
      //   cmyk: true,
      input: true,
      //   clear: true,
      save: true,
    },
  },
});

let curFill = "rgba(255, 255, 255, 1)";

let curFill_second = curFill.replace(/[^,]+(?=\))/, "0.5");

let curFill_third = curFill.replace(/[^,]+(?=\))/, "0");

// Handle Colors
fillPickr.on("change", (color, instance) => {
  const rgbaColorFill = color.toRGBA().toString();
  curFill = rgbaColorFill;
  contextReal.fillStyle = rgbaColorFill;
  contextDraft.fillStyle = rgbaColorFill;
});
