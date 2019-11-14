import { shallowMount, createLocalVue } from "@vue/test-utils";
import ComposerEmail from "@/components/composer-email.vue";

const localVue = createLocalVue();

let createConfig = overrides => {
  const mocks = {
    $store: {
      getters: {
        composerFrom: {
          emailTo: [],
          emailCC: [],
          emailBCC: [],
          emailSubject: "",
          emailMessage: "",
          emailAttachements: []
        }
      },
      commit: () => {},
      dispatch: () => {}
    }
  };

  return Object.assign({ mocks, localVue }, overrides);
};

describe("composer-email.vue", () => {
  it("should return all fields empty", () => {
    let config = createConfig();
    const wrapper = shallowMount(ComposerEmail, config);

    // need to change these to check data values rather than inspecting the DOM (quicker check, and allows design tweaks without effecting business logic)
    expect(wrapper.find("#composer-to-email").element.value).toBe("");
    expect(wrapper.find("#composer-cc-email").element.value).toBe("");
    expect(wrapper.find("#composer-bcc-email").element.value).toBe("");
    expect(wrapper.find("#composer-subject").element.value).toBe("");
    expect(wrapper.find("#composer-message").element.value).toBe("");
    expect(wrapper.find("#composer-attachment").element.value).toBe("");

    // inspect data values (quicker)
    expect(wrapper.vm.composerTo).toBe("");
    expect(wrapper.vm.composerCC).toBe("");
    expect(wrapper.vm.composerBCC).toBe("");
    expect(wrapper.vm.composerSubject).toBe("");
    expect(wrapper.vm.composerMessage).toBe("");
    expect(wrapper.vm.composerAttachment).toBe("");
  });

  // it("should invalidate 'To' field if incorrect email format", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-to-email").value).toBe("false"); // make fail on setup
  // });

  // it("should allow multiple valid email addresses in 'To' field", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-to-email").value).toBe("false"); // make fail on setup
  // });

  // it("should invalidate 'CC' field if incorrect email format", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-cc-email").value).toBe("false"); // make fail on setup
  // });

  // it("should allow multiple valid email addresses in 'CC' field", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-cc-email").value).toBe("false"); // make fail on setup
  // });

  // it("should invalidate 'BCC' field if incorrect email format", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-bcc-email").value).toBe("false"); // make fail on setup
  // });

  // it("should allow multiple valid email addresses in 'BCC' field", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-bcc-email").value).toBe("false"); // make fail on setup
  // });

  // it("should invalidate 'Subject' field if no value entered", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-subject").value).toBe("false"); // make fail on setup
  // });

  // it("should invalidate 'Message' field if no value entered", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-message").value).toBe("false"); // make fail on setup
  // });

  // it("should show preview of attached files", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-attachment").value).toBe("false"); // make fail on setup
  // });

  // it("should remove specific attached file upon user event", () => {
  //   const wrapper = shallowMount(ComposerEmail);
  //   expect(wrapper.find("#composer-attachment").value).toBe("false"); // make fail on setup
  // });

  // it("should only show active submit button when all required fields are valid", () => {
  //   const wrapper = shallowMount(ComposerEmail);

  //   expect(wrapper.find("#composer-to-email").value).toBe("mock@email.com");
  //   expect(wrapper.find("#composer-subject").value).toBe("Mock subject");
  //   expect(wrapper.find("#composer-message").value).toBe("Mock message");

  //   expect(wrapper.find("#composer-submit").value).toBe("false"); // make fail on setup
  // });
});
