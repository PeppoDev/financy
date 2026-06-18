import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { getEnumKeyByValue, isEnumValue } from "@/utils/enum-string-mapper";

export const CategoryColorEnum = {
  GREEN: "green",
  BLUE: "blue",
  PURPLE: "purple",
  PINK: "pink",
  RED: "red",
  ORANGE: "orange",
  YELLOW: "yellow",
} as const;

export type CategoryColorEnum =
  (typeof CategoryColorEnum)[keyof typeof CategoryColorEnum];

export const CategoryIconEnum = {
  BRIEFCASE: "briefcase",
  CAR: "car",
  HEART: "heart",
  PIGGY_BANK: "piggy-bank",
  SHOPPING_CART: "shopping-cart",
  TICKET: "ticket",
  TOOL_CASE: "tool-case",
  UTENSILS: "utensils",
  PAW_PRINT: "paw-print",
  HOUSE: "house",
  GIFT: "gift",
  DUMBBELL: "dumbbell",
  BOOK_OPEN: "book-open",
  BAGGAGE_CLAIM: "baggage-claim",
  MAILBOX: "mailbox",
  RECEIPT_TEXT: "receipt-text",
} as const;

export type CategoryIconEnum =
  (typeof CategoryIconEnum)[keyof typeof CategoryIconEnum];

export function isCategoryColorEnumValue(value: string): boolean {
  return isEnumValue(CategoryColorEnum, value);
}

export function isCategoryIconEnumValue(value: string): boolean {
  return isEnumValue(CategoryIconEnum, value);
}

export function getCategoryColorKeyByValue(value: string) {
  return getEnumKeyByValue(CategoryColorEnum, value);
}

export function getCategoryIconKeyByValue(value: string) {
  return getEnumKeyByValue(CategoryIconEnum, value);
}

export const categoryColorOptions: Array<{
  enumKey: keyof typeof CategoryColorEnum;
  enumValue: CategoryColorEnum;
  label: string;
  swatch: string;
}> = [
  {
    enumKey: "GREEN",
    enumValue: CategoryColorEnum.GREEN,
    label: "Verde",
    swatch: "bg-emerald-600",
  },
  {
    enumKey: "BLUE",
    enumValue: CategoryColorEnum.BLUE,
    label: "Azul",
    swatch: "bg-blue-600",
  },
  {
    enumKey: "PURPLE",
    enumValue: CategoryColorEnum.PURPLE,
    label: "Roxo",
    swatch: "bg-violet-600",
  },
  {
    enumKey: "PINK",
    enumValue: CategoryColorEnum.PINK,
    label: "Rosa",
    swatch: "bg-pink-600",
  },
  {
    enumKey: "RED",
    enumValue: CategoryColorEnum.RED,
    label: "Vermelho",
    swatch: "bg-red-600",
  },
  {
    enumKey: "ORANGE",
    enumValue: CategoryColorEnum.ORANGE,
    label: "Laranja",
    swatch: "bg-orange-600",
  },
  {
    enumKey: "YELLOW",
    enumValue: CategoryColorEnum.YELLOW,
    label: "Amarelo",
    swatch: "bg-amber-600",
  },
];

export const categoryIconOptions: Array<{
  enumKey: keyof typeof CategoryIconEnum;
  enumValue: CategoryIconEnum;
  icon: LucideIcon;
}> = [
  {
    enumKey: "BRIEFCASE",
    enumValue: CategoryIconEnum.BRIEFCASE,
    icon: BriefcaseBusiness,
  },
  { enumKey: "CAR", enumValue: CategoryIconEnum.CAR, icon: CarFront },
  { enumKey: "HEART", enumValue: CategoryIconEnum.HEART, icon: HeartPulse },
  {
    enumKey: "PIGGY_BANK",
    enumValue: CategoryIconEnum.PIGGY_BANK,
    icon: PiggyBank,
  },
  {
    enumKey: "SHOPPING_CART",
    enumValue: CategoryIconEnum.SHOPPING_CART,
    icon: ShoppingCart,
  },
  { enumKey: "TICKET", enumValue: CategoryIconEnum.TICKET, icon: Ticket },
  {
    enumKey: "TOOL_CASE",
    enumValue: CategoryIconEnum.TOOL_CASE,
    icon: ToolCase,
  },
  {
    enumKey: "UTENSILS",
    enumValue: CategoryIconEnum.UTENSILS,
    icon: Utensils,
  },
  {
    enumKey: "PAW_PRINT",
    enumValue: CategoryIconEnum.PAW_PRINT,
    icon: PawPrint,
  },
  { enumKey: "HOUSE", enumValue: CategoryIconEnum.HOUSE, icon: House },
  { enumKey: "GIFT", enumValue: CategoryIconEnum.GIFT, icon: Gift },
  {
    enumKey: "DUMBBELL",
    enumValue: CategoryIconEnum.DUMBBELL,
    icon: Dumbbell,
  },
  {
    enumKey: "BOOK_OPEN",
    enumValue: CategoryIconEnum.BOOK_OPEN,
    icon: BookOpen,
  },
  {
    enumKey: "BAGGAGE_CLAIM",
    enumValue: CategoryIconEnum.BAGGAGE_CLAIM,
    icon: BaggageClaim,
  },
  {
    enumKey: "MAILBOX",
    enumValue: CategoryIconEnum.MAILBOX,
    icon: Mailbox,
  },
  {
    enumKey: "RECEIPT_TEXT",
    enumValue: CategoryIconEnum.RECEIPT_TEXT,
    icon: ReceiptText,
  },
];
