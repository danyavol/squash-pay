import type { PaymentData } from "../state/new-payment-store.ts";
import type { Friend } from "../state/friends-store.ts";
import type { Rounding } from "../state/settings-store.ts";
import { getDurationInHours } from "./duration.service.ts";

function applyRounding(value: number, rounding: Rounding): number {
  switch (rounding) {
    case "exact":
      return Math.round(value * 100) / 100;
    case "round":
      return Math.round(value);
    case "round-up":
      return Math.ceil(value);
  }
}

type Options = {
  rounding?: Rounding;
};

type SplitResult = {
  friendId: number;
  amount: number;
};

export function splitPayment(
  {
    courtsNumber,
    duration,
    friends,
    courtPrice,
    multisportDiscount,
    sharedDiscount,
  }: Omit<PaymentData, "date">,
  { rounding = "round-up" }: Options = {},
): SplitResult[] {
  const totalPrice = courtPrice * courtsNumber * getDurationInHours(duration);
  const basePricePerPerson =
    totalPrice / friends.length - sharedDiscount / friends.length;

  return friends.map(({ friendId, multisportsNumber }) => {
    const amount = Math.max(
      basePricePerPerson - multisportsNumber * multisportDiscount,
      0,
    );

    return {
      friendId,
      amount: applyRounding(amount, rounding),
    };
  });
}

export function getMessageForSharing(
  splitResults: SplitResult[],
  friendsMap: Record<number, Friend>,
) {
  const debts = splitResults.map((result) => {
    const name = friendsMap[result.friendId].name;
    return `${name} - ${Math.ceil(result.amount)}zł`;
  });

  return debts.join("\n");
}
