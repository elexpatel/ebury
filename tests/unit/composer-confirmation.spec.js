import { shallowMount, createLocalVue } from "@vue/test-utils";
import ComposerConfirmation from "@/components/composer-confirmation";

const localVue = createLocalVue();

let createConfig = overrides => {
  const mocks = {
    $store: {
      getters: {
        composerForm: {
          emailTo: ["mock@email.com"],
          emailCC: [],
          emailBCC: [],
          emailSubject: "Mock subject",
          emailMessage: "Mock message",
          emailAttachements: []
        },
        composerConformation: true
      },
      commit: () => {},
      dispatch: () => {}
    }
  };

  return Object.assign({ mocks, localVue }, overrides);
};

describe("composer-confirmation.vue", () => {
  it("should show confirmation panel when composer submitted", () => {
    const config = createConfig();
    const wrapper = shallowMount(ComposerConfirmation, config);
    expect(wrapper.find(".composer__confirmation").exists()).toBeTruthy();
  });

  it("should show confirmation panel with 'To' email address", () => {
    let config = createConfig();
    const wrapper = shallowMount(ComposerConfirmation, config);

    expect(wrapper.vm.composerForm.emailTo).toEqual(["mock@email.com"]);
    expect(wrapper.vm.composerForm.emailSubject).toMatch("Mock subject");
    expect(wrapper.vm.composerForm.emailMessage).toMatch("Mock message");
  });

  it("should show confirmation panel with 'CC' email address", () => {
    let config = createConfig();
    
    config.mocks.$store.getters.composerForm.emailCC = ["mockCC@email.com"]
    
    const wrapper = shallowMount(ComposerConfirmation, config);

    expect(wrapper.vm.composerForm.emailCC).toEqual(["mockCC@email.com"]);
  });
  
  it("should show confirmation panel with 'BCC' email address", () => {
    let config = createConfig();
    
    config.mocks.$store.getters.composerForm.emailBCC = ["mockBCC@email.com"]
    
    const wrapper = shallowMount(ComposerConfirmation, config);

    expect(wrapper.vm.composerForm.emailBCC).toEqual(["mockBCC@email.com"]);
  });  
  
  it("should show confirmation panel with attachment files", () => {
    let config = createConfig();
    
    config.mocks.$store.getters.composerForm.emailAttachements = [
      {
        name: 'mock1.jpg',
        data: 'imagedata1.jpg'
      }
    ]
    
    const wrapper = shallowMount(ComposerConfirmation, config);
    expect(wrapper.vm.composerForm.emailAttachements).toEqual(config.mocks.$store.getters.composerForm.emailAttachements);
    expect(wrapper.find(".form__attachment-container").exists()).toBeTruthy();
  });  

  it("should show confirmation panel with two attachment files", () => {
    let config = createConfig();
    
    config.mocks.$store.getters.composerForm.emailAttachements = [
      {
        name: 'mock1.jpg',
        data: 'imagedata1.jpg'
      },
      {
        name: 'mock1.jpg',
        data: 'imagedata1.jpg'
      }
    ]
    
    const wrapper = shallowMount(ComposerConfirmation, config);
    expect(wrapper.vm.composerForm.emailAttachements).toHaveLength(2);
  });  
});
