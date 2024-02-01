/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";

import videoDate from "./videoDate";

describe("fonction videoDate", () => {
  it("devrait renvoyer la date formatée correcte", () => {
    const result = videoDate(vi.useFakeTimers());

    expect(result).toEqual("il y a quelques secondes");
  });
});
