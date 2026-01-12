export type FriendFormData = {
  id: number;
  multisportsNumber: number;
};

export type PaymentForm = {
  courtPrice: number;
  courtsNumber: number;
  duration: string;
  multisportDiscount: number;
  friends: FriendFormData[];
};
