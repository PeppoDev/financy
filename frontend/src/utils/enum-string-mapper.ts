export function getEnumValues<TEnum extends Record<string, string>>(
  enumObject: TEnum,
): Array<TEnum[keyof TEnum]> {
  return Object.values(enumObject) as Array<TEnum[keyof TEnum]>;
}

export function isEnumValue<TEnum extends Record<string, string>>(
  enumObject: TEnum,
  value: string,
): value is TEnum[keyof TEnum] {
  return getEnumValues(enumObject).includes(value as TEnum[keyof TEnum]);
}

export function getEnumKeyByValue<TEnum extends Record<string, string>>(
  enumObject: TEnum,
  value: string,
): keyof TEnum | null {
  const entry = Object.entries(enumObject).find(
    ([, enumValue]) => enumValue === value,
  );

  return (entry?.[0] as keyof TEnum | undefined) ?? null;
}
