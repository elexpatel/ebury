import { shallowMount } from "@vue/test-utils";
import ComposerConfirmation from "@/components/composer-confirmation.vue";

describe("composer-confirmation.vue", () => {
  it("should show confirmation panel when composer submitted", () => {
    const wrapper = shallowMount(ComposerConfirmation);

    // need to change these to check data values rather than inspecting the DOM (quicker check, and allows design tweaks without effecting business logic)
    expect(
      wrapper.find(".composer__confirmation-heading").exists()
    ).toBeTruthy();
  });

  it("should show confirmation panel with email information", () => {
    const wrapper = shallowMount(ComposerConfirmation);
    expect(
      wrapper.find(".composer__confirmation-subject").exists()
    ).toBeTruthy();
    expect(
      wrapper.find(".composer__confirmation-recipient").exists()
    ).toBeTruthy();
    expect(
      wrapper.find(".composer__confirmation-message").exists()
    ).toBeTruthy();
    expect(
      wrapper.find(".composer__confirmation-attachments").exists()
    ).toBeTruthy();
  });
});
