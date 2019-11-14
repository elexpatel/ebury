import { shallowMount } from "@vue/test-utils";
import ComposerEmail from "@/components/composer-email.vue";

describe("composer-email.vue", () => {
  it("should return all fields empty", () => {
    const wrapper = shallowMount(ComposerEmail);

    // need to change these to check data values rather than inspecting the DOM (quicker check, and allows design tweaks without effecting business logic)

    expect(wrapper.find("#composer-to-email").value).toBe(""); // make fail on setup
    expect(wrapper.find("#composer-cc-email").value).toBe(""); // make fail on setup
    expect(wrapper.find("#composer-bcc-email").value).toBe(""); // make fail on setup
    expect(wrapper.find("#composer-subject").value).toBe(""); // make fail on setup
    expect(wrapper.find("#composer-message").value).toBe(""); // make fail on setup
    expect(wrapper.find("#composer-attachement").value).toBe(""); // make fail on setup
  });
});
