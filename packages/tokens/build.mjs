import StyleDictionary from "style-dictionary";

const sd = new StyleDictionary({
  source: ["tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: { outputReferences: true },
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log("tokens built -> css/tokens.css");
