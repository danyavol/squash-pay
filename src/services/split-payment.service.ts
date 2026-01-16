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
  }: PaymentData,
  { roundPrice = true }: Options = {},
): SplitResult[] {
  const totalPrice = courtPrice * courtsNumber * getDurationInHours(duration);
  const basePricePerPerson = totalPrice / friends.length;

  return friends.map(({ friendId, multisportsNumber }) => {
    const amount = basePricePerPerson - multisportsNumber * multisportDiscount;
    // TODO: What if discount is greater than basePerPerson? E.g.:
    // Total - 35
    // Даник (3ms) - -13
    // Глеб (1ms) - 17
    // Настя (0ms) - 32

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
