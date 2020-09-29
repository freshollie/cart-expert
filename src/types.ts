export type Price = Readonly<{
  amount: number;
  divisor: number;
  perKg?: boolean;
}>;

export type Item = Readonly<{
  id: string;
  name: string;
  price: Price;
}>;

type BaseOffer = {
  itemId: string;
  qualifier: number;
  name: string;
};

type PriceOffer = BaseOffer & { price: Price };
type BundleOffer = BaseOffer & { for: number };
export type Offer = Readonly<PriceOffer | BundleOffer>;

export const isPriceOffer = (offer: any): offer is PriceOffer =>
  typeof offer.price === "object";
