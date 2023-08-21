<template>
<div id="q-app">
 <q-layout view="lHh Lpr fff">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:400px;height:540px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">{{ title}}</h4>
           
          </q-card-section>
          <q-card-section>
          <q-fab
          color="primary" @click="switchTypeForm"
          icon="add"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        >
          <q-tooltip>
          Регистрация нового пользователя
        </q-tooltip>
        </q-fab>
            <q-form class="q-px-sm q-pt-xl">
              <q-input 
                       ref="email"
                       square 
                       clearable 
                       v-model="email" 
                       type="email"
                       lazy-rules
                       :rules="[this.required,this.isEmail,this.short]"
                       label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input 
                        ref="username"
                        v-if="register" 
                        square 
                        clearable 
                        v-model="username"
                        lazy-rules
                        :rules="[this.required,this.short]"
                       type="username"                                                            label="Пользователь">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input  
                       ref="password"
                       square 
                       clearable 
                       v-model="password"                                                        :type="passwordFieldType"  
                       lazy-rules
                       :rules="[this.required,this.short]"
                       label="Пароль">
                
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
              <q-icon 
                  :name="visibilityIcon"                                 @click="switchVisibility"                             class="cursor-pointer" />
                </template>
              </q-input>
              <q-input 
                  ref="repassword"
                  v-if="register" 
                  square 
                  clearable 
                  v-model="repassword"                                                       :type="passwordFieldType" 
                  lazy-rules
                  :rules="[this.required,this.short,this.diffPassword]"
                  label="Повторить пароль">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
           <template v-slot:append>
          <q-icon 
                 :name="visibilityIcon"                                @click="switchVisibility"                              class="cursor-pointer" />
          </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn 
                   unelevated 
                   size="lg" 
                   color="secondary"
                   @click="submit"
                   class="full-width text-white"                          :label="btnLabel" />
          </q-card-actions>
          <q-card-section 
              v-if="!register" 
              class="text-center q-pa-sm">
            <p class="text-grey-6">Забыли пароль?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
   
    </q-layout>
 </div>
 </template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'RegisterPage'
})
</script>
