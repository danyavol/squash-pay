import type { PaymentData } from "../state/new-payment-store.ts";
import type { Friend } from "../state/friends-store.ts";
import { getDurationInHours } from "./duration.service.ts";

type Options = {
  roundPrice?: boolean;
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
  { roundPrice = true }: Options = {},
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
      amount: roundPrice ? Math.ceil(amount) : Math.round(amount * 100) / 100,
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
