export const ContentTypeValues = {
    Youtube: "youtube",
    Twitter: "twitter",
  } as const;
  
  export type ContentType = typeof ContentTypeValues[keyof typeof ContentTypeValues];