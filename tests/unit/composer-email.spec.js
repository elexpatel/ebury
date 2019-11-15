import { shallowMount, createLocalVue } from "@vue/test-utils";
import ComposerEmail from "@/components/composer-email";
import Vuelidate from 'vuelidate'

const localVue = createLocalVue();
localVue.use(Vuelidate)

let createConfig = overrides => {
  const mocks = {
    $store: {
      getters: {
        composerForm: {
          emailTo: [],
          emailCC: [],
          emailBCC: [],
          emailSubject: "",
          emailMessage: "",
          emailAttachments: []
        },
      },
      commit: () => {},
      dispatch: () => {

      }
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
    expect(wrapper.vm.composerAttachments).toEqual([]);
  });

  it("should invalidate 'To' field if incorrect email format", () => {
    let config = createConfig();
    config.mocks.$store.getters.composerForm.emailTo = ["mock"];
    const wrapper = shallowMount(ComposerEmail, config);
    
    wrapper.vm.$v.composerTo.$touch();
    expect(wrapper.vm.$v.composerTo.$error).toBeTruthy();
  });

  it("should allow multiple valid email addresses in 'To' field", () => {
    let config = createConfig();
    config.mocks.$store.getters.composerForm.emailTo = ["mock@email.com"];    
    const wrapper = shallowMount(ComposerEmail, config);
    wrapper.vm.$v.composerTo.$touch();
    expect(wrapper.vm.$v.composerTo.$error).toBeFalsy();

    config.mocks.$store.getters.composerForm.emailTo = ["mock@email.com, mock"];    
    wrapper.vm.$v.composerTo.$touch();
    expect(wrapper.vm.$v.composerTo.$error).toBeTruthy();

    config.mocks.$store.getters.composerForm.emailTo = ["mock@email.com, mock1@email.com"];    
    wrapper.vm.$v.composerTo.$touch();
    expect(wrapper.vm.$v.composerTo.$error).toBeFalsy();
  });

  it("should invalidate 'CC' field if incorrect email format", () => {
    let config = createConfig();
    config.mocks.$store.getters.composerForm.emailCC = ["mock"];
    const wrapper = shallowMount(ComposerEmail, config);
    
    wrapper.vm.$v.composerCC.$touch();
    expect(wrapper.vm.$v.composerCC.$error).toBeTruthy();
  });

  it("should allow multiple valid email addresses in 'CC' field", () => {
    let config = createConfig();
    config.mocks.$store.getters.composerForm.emailCC = ["mock@email.com"];    
    const wrapper = shallowMount(ComposerEmail, config);
    wrapper.vm.$v.composerCC.$touch();
    expect(wrapper.vm.$v.composerCC.$error).toBeFalsy();

    config.mocks.$store.getters.composerForm.emailCC = ["mock@email.com, mock"];    
    wrapper.vm.$v.composerCC.$touch();
    expect(wrapper.vm.$v.composerCC.$error).toBeTruthy();

    config.mocks.$store.getters.composerForm.emailCC = ["mock@email.com, mock1@email.com"];    
    wrapper.vm.$v.composerCC.$touch();
    expect(wrapper.vm.$v.composerCC.$error).toBeFalsy();
  });

  it("should invalidate 'BCC' field if incorrect email format", () => {
    let config = createConfig();
    config.mocks.$store.getters.composerForm.emailBCC = ["mock"];
    const wrapper = shallowMount(ComposerEmail, config);
    
    wrapper.vm.$v.composerBCC.$touch();
    expect(wrapper.vm.$v.composerBCC.$error).toBeTruthy();
  });

  it("should allow multiple valid email addresses in 'BCC' field", () => {
    let config = createConfig();
    config.mocks.$store.getters.composerForm.emailBCC = ["mock@email.com"];    
    const wrapper = shallowMount(ComposerEmail, config);
    wrapper.vm.$v.composerBCC.$touch();
    expect(wrapper.vm.$v.composerBCC.$error).toBeFalsy();

    config.mocks.$store.getters.composerForm.emailBCC = ["mock@email.com, mock"];    
    wrapper.vm.$v.composerBCC.$touch();
    expect(wrapper.vm.$v.composerBCC.$error).toBeTruthy();

    config.mocks.$store.getters.composerForm.emailBCC = ["mock@email.com, mock1@email.com"];    
    wrapper.vm.$v.composerBCC.$touch();
    expect(wrapper.vm.$v.composerBCC.$error).toBeFalsy();
  });  

  it("should invalidate 'Subject' field if no value entered", () => {
    let config = createConfig();
    const wrapper = shallowMount(ComposerEmail, config);
    wrapper.vm.$v.composerSubject.$touch();
    expect(wrapper.vm.$v.composerSubject.$error).toBeTruthy();
  });

  it("should invalidate 'Subject' field if value over 100 charaters", () => {
    let config = createConfig();
    
    config.mocks.$store.getters.composerForm.emailSubject = "This subject line field should make the validation fail if there is more than 100 characters in the subject content"; 

    const wrapper = shallowMount(ComposerEmail, config);
    wrapper.vm.$v.composerSubject.$touch();
    expect(wrapper.vm.$v.composerSubject.$error).toBeTruthy();
  });  

  it("should invalidate 'Message' field if no value entered", () => {
    let config = createConfig();
    const wrapper = shallowMount(ComposerEmail, config);
    wrapper.vm.$v.composerMessage.$touch();
    expect(wrapper.vm.$v.composerMessage.$error).toBeTruthy();
  });

  it("should show preview of attached files", () => {
    let config = createConfig();
    config.mocks.$store.getters.composerForm.emailAttachments = [{
      name: 'mock1.jpg',
      data: 'imagedata1.jpg'
    }];    
    const wrapper = shallowMount(ComposerEmail, config);

    expect(wrapper.vm.composerAttachments).toEqual(config.mocks.$store.getters.composerForm.emailAttachments);
    expect(wrapper.findAll(".form__attachment-image-wrapper").length).toBe(1);
  });

  it("should only show active submit button when all required fields are valid", () => {
    let config = createConfig();
    config.mocks.$store.getters.composerForm.emailTo = ["mock@email.com"]; 
    config.mocks.$store.getters.composerForm.emailSubject = "Mock subject"; 
    config.mocks.$store.getters.composerForm.emailMessage = "Mock message"; 

    const wrapper = shallowMount(ComposerEmail, config);

    wrapper.vm.$v.$touch();

    expect(wrapper.vm.$v.$invalid).toBeFalsy();
  });
});
