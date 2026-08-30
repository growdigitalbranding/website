import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // This is a prose-heavy marketing site; JSX already escapes text nodes
      // safely, and entity-encoding every apostrophe makes the copy unreadable
      // in source.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
