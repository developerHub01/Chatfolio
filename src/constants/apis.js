import { emojiApi } from "./values";

export const emojiCategoriesApi = `${emojiApi}/categories?access_key=${
  import.meta.env.VITE_EMOJI_KEY
}`;

export const emojiByCategoryApi = (category) => {
  const emojiApiKey = import.meta.env.VITE_EMOJI_KEY;
  if (category.trim().toLowerCase() === "all")
    return `${emojiApi}/emojis?access_key=${emojiApiKey}`;
  return `${emojiApi}/categories/${category}?access_key=${emojiApiKey}`;
};
