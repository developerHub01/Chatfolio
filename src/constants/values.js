export const EMOJI = "EMOJI";
export const GIFS = "GIFS";

export const emojiApi = "https://emoji-api.com";

export const SERVER_URL = "http://localhost:3000";
export const BASE_URL = "http://localhost:3000/api/v1";

export const REGISTER_API = `${BASE_URL}/auth/register`;
export const LOGIN_API = `${BASE_URL}/auth/login`;
export const LOGOUT_API = `${BASE_URL}/auth/logout`;
export const AUTH_USER_DATA_API = `${BASE_URL}/user/me`;
export const USER_PREFERENCES_DATA_API = `${BASE_URL}/user/preferences`;
export const UPDATE_USER_INFO_API = `${BASE_URL}/user/updateUserInfo`;

export const SEARCH_CHAT_API = `${BASE_URL}/chat/search-chat`;

export const UNARCHIVED_CHAT_LIST_API = `${BASE_URL}/chat/my-chats?archived=0`;
export const ARCHIVED_CHAT_LIST_API = `${BASE_URL}/chat/my-chats?archived=1`;

export const GET_CHAT_DETAILS_API = `${BASE_URL}/chat/chat-details`;

export const GOOGLE_LOGIN_API = `${BASE_URL}/auth/google/callback`;
export const FACEBOOK_LOGIN_API = `${BASE_URL}/auth/facebook/callback`;

export const IMAGE_FALLBACK = "";
