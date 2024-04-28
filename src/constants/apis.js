import { emojiApi } from "./values";

export const emojiCategoriesApi = `${emojiApi}/categories?access_key=${
  import.meta.env.VITE_EMOJI_KEY
}`;
