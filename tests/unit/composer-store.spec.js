import Vue from 'vue'
import Vuex from 'vuex'
import { actions, mutations, getters } from '@/store'
Vue.use(Vuex)

let store

describe('store.js', () => { 
  beforeEach(() => {
    store = new Vuex.Store({
      state: { 
        composerForm: {
          emailTo: [],
          emailCC: [],
          emailBCC: [],
          emailSubject: "",
          emailMessage: "",
          emailAttachments: []
        },
        composerConformation: false
      },
      mutations,
      actions: {
        updateComposer: actions.updateComposer,
        sendComposer: actions.sendComposer,
        addAttachment: actions.addAttachment,
        removeAttachment: actions.removeAttachment
      },
      getters
    })
  })  
  
  
  test('should return empty states', () => {   
    expect(store.state.composerForm.emailTo).toEqual([]);
    expect(store.state.composerForm.emailCC).toEqual([]);
    expect(store.state.composerForm.emailBCC).toEqual([]);
    expect(store.state.composerForm.emailSubject).toMatch("");
    expect(store.state.composerForm.emailMessage).toMatch("");
    expect(store.state.composerForm.emailAttachments).toEqual([]);
    expect(store.state.composerConformation).toBeFalsy();
  })

  test('should update "To" email address array', () => {   
    const mockEmailTo = ["mock@email.com"];

    store.dispatch('updateComposer', {emailTo: mockEmailTo})
    
    expect(store.getters.composerForm.emailTo).toEqual(mockEmailTo);
  })

  test('should set confirmation to true', () => {  
    store.dispatch('sendComposer');
    expect(store.getters.composerConfirmation).toBeTruthy();
  })

  test('should add attachement to array', () => {   
    const mockAttachment = {
      name: 'mockimage.jpg',
      data: 'mockimagedata'
    };

    store.dispatch('addAttachment', mockAttachment)
    
    expect(store.getters.composerForm.emailAttachments).toEqual([mockAttachment]);
  })  

  test('should remove one attachement from array', () => {   
    const mockAttachment = [{
      name: 'mockimage1.jpg',
      data: 'mockimagedata'
    },{
      name: 'mockimage2.jpg',
      data: 'mockimagedata'
    }];

    store.dispatch('addAttachment', mockAttachment[0]);
    store.dispatch('addAttachment', mockAttachment[1]);
    
    expect(store.getters.composerForm.emailAttachments).toEqual(mockAttachment);

    store.dispatch('removeAttachment', 'mockimage1.jpg');

    expect(store.getters.composerForm.emailAttachments).toHaveLength(1);
    expect(store.getters.composerForm.emailAttachments[0].name).toMatch("mockimage2.jpg");
  })
})