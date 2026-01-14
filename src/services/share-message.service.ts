import type { PaymentData } from "../state/new-payment-store.ts";
import type { Friend } from "../state/friends-store.ts";
import { getDurationInHours } from "./duration.service.ts";

// TODO: Display these numbers in table
export function getMessageForSharing(
  {
    courtsNumber,
    duration,
    friends,
    courtPrice,
    multisportDiscount,
  }: PaymentData,
  friendsMap: Record<number, Friend>,
) {
  const totalPrice = courtPrice * courtsNumber * getDurationInHours(duration);
  const peopleNumber = friends.length;

  const basePerPerson = totalPrice / peopleNumber;

  const debts = friends.map((friend) => {
    const name = friendsMap[friend.friendId].name;
    // TODO: What if discount is greater than basePerPerson? E.g.:
    // Total - 35
    // Даник (3ms) - -13
    // Глеб (1ms) - 17
    // Настя (0ms) - 32
    const amount =
      basePerPerson - friend.multisportsNumber * multisportDiscount;

    return `${name} - ${Math.ceil(amount)}zł`;
  });

  return debts.join("\n");
}
