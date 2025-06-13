import { describe, vi, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { NetworkDetector } from "../NetworkDetector";
import { dispatchToast } from "../../../common/notifications/utils/dispatchToast";

import { act } from "react-dom/test-utils";

describe("<NetworkDetector />", () => {
  vi.mock("../../../common/notifications/utils/dispatchToast");

  const triggerOnline = () => {
    act(() => {
      Object.defineProperty(navigator, "onLine", {
        value: true,
        writable: true,
      });
      window.dispatchEvent(new Event("online"));
    });
  };
  const triggerOffline = () => {
    act(() => {
      Object.defineProperty(navigator, "onLine", {
        value: false,
        writable: true,
      });
      window.dispatchEvent(new Event("offline"));
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, "onLine", {
      value: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("dispatches toast for offline and online events", () => {
    render(
      <NetworkDetector>
        <span>test</span>
      </NetworkDetector>
    );

    // Sim offline
    triggerOffline();
    expect(dispatchToast).toHaveBeenCalledWith(
      "Internet Connection Lost.",
      "danger"
    );

    // Sim online
    triggerOnline();
    expect(dispatchToast).toHaveBeenCalledWith(
      "Internet Connection Restored.",
      "success"
    );
  });

  it("does not dispatch a toast when online status has not changed", () => {
    render(<NetworkDetector>{null}</NetworkDetector>);

    triggerOnline();
    triggerOnline();
    expect(dispatchToast).not.toHaveBeenCalled();
  });
});
