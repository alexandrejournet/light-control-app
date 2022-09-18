export const fillEmptyValues = <T>(first: any, second: any) => Object.entries(second).forEach(([key, value]) => {
  if (!value) {
    first[key as keyof typeof first] = second[key as keyof typeof first];
  }
});

export const isNotNullOrUndefined = <T>(input: any) => input !== null && input !== undefined;

