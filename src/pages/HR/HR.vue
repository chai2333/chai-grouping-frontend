<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col page">
    <div class="flex-row justify-between group">
      <div class="flex-row items-center">
        <div class="flex-row items-center">
          <div class="shrink-0 section"></div>
          <span class="ml-2 font_2 text_2">ChaiTeam</span>
        </div>
        <div class="ml-72 group_2"></div>
      </div>
      <div class="flex-row items-center group_3">
        <img
          class="image_2"
          src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=b97090b8d1c727f2057f7f276e1e6f9f.png"
        />
        <div class="flex-row items-center ml-47">
          <img
            class="image"
            src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=f51660e87a3327130a027a0daafbf346.png"
          />
          <div class="flex-col items-start ml-7">
            <span class="font text">Anna Newman</span>
            <span class="mt-6 font text_3">Head HR</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row items-center mt-7">
      <div class="flex-col shrink-0">
        <div class="flex-row items-center self-stretch group_5">
          <img
            class="image_3"
            src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=02de3c774307c024fe8eac63ad26a812.png"
          />
          <span class="ml-12 font_2 text_5">组队攒局</span>
        </div>
        <div class="flex-row items-center self-stretch group_7">
          <img
            class="image_2"
            src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=0f9f5de9d4251e6ec535f5edd9063ba3.png"
          />
          <span class="font_2 ml-13">我的任务</span>
        </div>
        <div class="flex-row items-center self-stretch section_4">
          <img
            class="image_7"
            src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=57823798e705f79b80ae3b04c466c72b.png"
          />
          <span class="ml-12 font_2 text_16">我的组</span>
        </div>
        <div class="flex-row self-stretch group_10">
          <img
            class="image_12"
            src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e43d3abe97fb4c6fc1135ff100315883.png"
          />
          <span class="font_2 text_17 ml-13">个人信息</span>
        </div>
        <img
          class="self-start image_13 image_14"
          src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=95fbc12ca62fbdf4eb3b487cce504eb6.png"
        />
        <img
          class="self-start image_13 image_16"
          src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=d282e75a93a04bc19fbda00ebe052c9e.png"
        />
        <img
          class="self-start image_13 image_19"
          src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=9983e1db102957c5aea11ac70557a3bb.png"
        />
        <img
          class="self-start image_2 image_24"
          src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=4ffe4a9e75ab5f7915d4d107121d4dcc.png"
        />
        <div class="flex-row items-center self-stretch group_14">
          <img
            class="image_25"
            src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=596b5268080274b295d0ba1558270a5f.png"
          />
          <span class="font_2 text_50 ml-5">Logout</span>
        </div>
      </div>
      <div class="flex-col flex-1 self-stretch section_2 ml-9">
        <div class="flex-row justify-between items-center group_4">
          <div class="flex-row">
            <div class="flex-col items-start">
              <span class="font_3 text_4">Reporting</span>
              <span class="mt-6 font text_6">All project in current month</span>
            </div>
            <img
              class="self-start image_4 ml-11"
              src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=27249e4c3a316c8700967269771e8435.png"
            />
          </div>
          <img
            class="image_5 image_6"
            src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=f949044dbce918f6cd0439097c439540.png"
          />
        </div>
        <div class="flex-col group_6">
          <div class="divider"></div>
          <div class="flex-row justify-between group_8">
            <div class="flex-row">
              <div class="flex-row items-center">
                <span class="font_4 text_7">All</span>
                <div class="ml-10 flex-col justify-start items-center shrink-0 text-wrapper">
                  <span class="font text_8">50</span>
                </div>
              </div>
              <div class="flex-row items-center ml-25">
                <span class="font_4 text_9">Started</span>
                <div class="ml-10 flex-col justify-start items-center shrink-0 text-wrapper_2">
                  <span class="font text_10">20</span>
                </div>
              </div>
              <div class="flex-row items-center ml-25">
                <span class="font_4 text_11">Approval</span>
                <div class="ml-10 flex-col justify-start items-center shrink-0 text-wrapper_2">
                  <span class="font text_12">12</span>
                </div>
              </div>
              <div class="flex-row items-center ml-25">
                <span class="font_4 text_13">Finished</span>
                <div class="flex-col justify-start items-center shrink-0 text-wrapper_2 ml-9">
                  <span class="font text_14">17</span>
                </div>
              </div>
            </div>
            <div class="flex-row group_9">
              <div class="flex-row items-center section_3">
                <img
                  class="shrink-0 image_2"
                  src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e991c8097ee051956d7b419a89401dd8.png"
                />
                <span class="ml-6 font text_15">More</span>
              </div>
              <img
                class="image_5 ml-11"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=47ba5118156a83541808dc31e2fa2aa5.png"
              />
              <img
                class="image_5 ml-11"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=5150375e92b09b369ba583ea91c72b9c.png"
              />
            </div>
          </div>
          <div class="grid">
            <div class="flex-col justify-start relative grid-item">
              <div class="flex-col section_5">
                <span class="font_3 text_18 text_19">App Development</span>
                <div class="flex-row items-center group_11 view">
                  <img
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=c3bdfd2efe77088d4a94477a81a7620d.png"
                  />
                  <span class="ml-6 font_6 text_22">Marketing Team</span>
                </div>
                <div class="flex-row items-center group_11 view_5">
                  <img
                    class="image_15"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e8cbcdc477c7b41d32f39e48098579e9.png"
                  />
                  <span class="ml-6 font_7 text_26">1 Week Left</span>
                </div>
                <div class="section_7"></div>
                <div class="flex-col group_12">
                  <span class="self-start font_7">Team Members</span>
                  <span class="self-end font_6 text_30">Progress</span>
                </div>
                <div class="flex-row justify-between group_13">
                  <div class="flex-row">
                    <img
                      class="image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3b068d39f3bdd95183e4d7ad40b19442.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=6cd24d16eaf727a956fcf0dc12bc35bd.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=51f2bad26d2a0830bf4075dec667f193.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=69ba8e7bdd72d2d49099fb57af58bcb5.png"
                    />
                  </div>
                  <span class="self-center font_8 text_31">34%</span>
                </div>
              </div>
              <img
                class="image_8 pos"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=b9b86af3d78aee8c5bbaf88091f013e0.png"
              />
            </div>
            <div class="flex-col justify-start relative grid-item">
              <div class="flex-col section_5">
                <span class="self-start font_5 text_18 text_20">Web Instructors</span>
                <div class="flex-row items-center self-stretch group_11 view_2">
                  <img
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=c3bdfd2efe77088d4a94477a81a7620d.png"
                  />
                  <span class="ml-6 font_6 text_23">Marketing Team</span>
                </div>
                <div class="flex-row items-center self-stretch group_11 view_5">
                  <img
                    class="image_15"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e8cbcdc477c7b41d32f39e48098579e9.png"
                  />
                  <span class="font_7 text_27">4 Weeks</span>
                  <span class="font_7">Left</span>
                </div>
                <div class="self-stretch section_7"></div>
                <div class="flex-col self-stretch group_12">
                  <span class="self-start font_7">Team Members</span>
                  <span class="self-end font_6 text_30">Progress</span>
                </div>
                <div class="flex-row items-center self-stretch group_13">
                  <div class="flex-row">
                    <img
                      class="image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3b068d39f3bdd95183e4d7ad40b19442.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=6cd24d16eaf727a956fcf0dc12bc35bd.png"
                    />
                  </div>
                  <img
                    class="image_17 image_18"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=69ba8e7bdd72d2d49099fb57af58bcb5.png"
                  />
                  <span class="font_8 text_32">14%</span>
                </div>
              </div>
              <img
                class="image_9 pos_2"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=7c2c720ef6b39bafe23ce2469c30d0f1.png"
              />
            </div>
            <div class="flex-col justify-start relative grid-item">
              <div class="flex-col section_5">
                <span class="self-start font_3 text_18 text_21">Web3 Managers</span>
                <div class="flex-row items-center self-stretch group_11 view_3">
                  <img
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=c3bdfd2efe77088d4a94477a81a7620d.png"
                  />
                  <span class="ml-6 font_6 text_24">Marketing Team</span>
                </div>
                <div class="flex-row items-center self-stretch group_11 view_5">
                  <img
                    class="image_15"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e8cbcdc477c7b41d32f39e48098579e9.png"
                  />
                  <span class="ml-6 font_6 text_28">5 Days Left</span>
                </div>
                <div class="self-stretch section_7"></div>
                <div class="flex-col self-stretch group_12">
                  <span class="self-start font_7">Team Members</span>
                  <span class="self-end font_6 text_30">Progress</span>
                </div>
                <div class="flex-row justify-between self-stretch group_13">
                  <div class="flex-row">
                    <img
                      class="image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3b068d39f3bdd95183e4d7ad40b19442.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=6cd24d16eaf727a956fcf0dc12bc35bd.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=51f2bad26d2a0830bf4075dec667f193.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=69ba8e7bdd72d2d49099fb57af58bcb5.png"
                    />
                  </div>
                  <span class="self-center font_8 text_33">28%</span>
                </div>
              </div>
              <img
                class="image_10 pos_3"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=4eb2c921c0261baccd12233a086f8276.png"
              />
            </div>
            <div class="flex-col justify-start relative grid-item">
              <div class="flex-col section_6">
                <span class="self-start font_3 text_18">Data Analysits</span>
                <div class="flex-row items-center self-stretch group_11 view_4">
                  <img
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=c3bdfd2efe77088d4a94477a81a7620d.png"
                  />
                  <span class="ml-6 font_6 text_25">Marketing Team</span>
                </div>
                <div class="flex-row items-center self-stretch group_11 view_5">
                  <img
                    class="image_15"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e8cbcdc477c7b41d32f39e48098579e9.png"
                  />
                  <span class="ml-6 font_7 text_29">2 Weeks Left</span>
                </div>
                <div class="self-stretch section_7"></div>
                <div class="flex-col self-stretch group_12">
                  <span class="self-start font_7">Team Members</span>
                  <span class="self-end font_6 text_30">Progress</span>
                </div>
                <div class="flex-row justify-between self-stretch group_13">
                  <div class="flex-row">
                    <img
                      class="image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3b068d39f3bdd95183e4d7ad40b19442.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=6cd24d16eaf727a956fcf0dc12bc35bd.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=51f2bad26d2a0830bf4075dec667f193.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=69ba8e7bdd72d2d49099fb57af58bcb5.png"
                    />
                  </div>
                  <span class="self-center font_8 text_34">22%</span>
                </div>
              </div>
              <img
                class="image_11 pos_4"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=a83801bfea3e80bbbb1179628b0f1681.png"
              />
            </div>
            <div class="flex-col justify-start relative grid-item">
              <div class="flex-col section_5">
                <span class="self-start font_3 text_18 text_35">Pay Stack</span>
                <div class="flex-row items-center self-stretch group_11 view_6">
                  <img
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=c3bdfd2efe77088d4a94477a81a7620d.png"
                  />
                  <span class="ml-6 font_6 text_39">Big Data Dev</span>
                </div>
                <div class="flex-row items-center self-stretch group_11 view_5">
                  <img
                    class="image_15"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e8cbcdc477c7b41d32f39e48098579e9.png"
                  />
                  <span class="ml-6 font_7 text_42">14 Weeks Left</span>
                </div>
                <div class="self-stretch section_7"></div>
                <div class="flex-col self-stretch group_12">
                  <span class="self-start font_7">Team Members</span>
                  <span class="self-end font_6 text_30">Progress</span>
                </div>
                <div class="flex-row justify-between items-center self-stretch group_13">
                  <div class="flex-row">
                    <img
                      class="image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3b068d39f3bdd95183e4d7ad40b19442.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=6cd24d16eaf727a956fcf0dc12bc35bd.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=51f2bad26d2a0830bf4075dec667f193.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=69ba8e7bdd72d2d49099fb57af58bcb5.png"
                    />
                  </div>
                  <span class="font_8 text_46">55%</span>
                </div>
              </div>
              <img
                class="image_20 pos_5"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=99d1e58872c3af35003f3e9b0d95066f.png"
              />
            </div>
            <div class="flex-col justify-start relative grid-item">
              <div class="flex-col section_5">
                <span class="self-start font_3 text_18 text_36">Data Managers</span>
                <div class="flex-row items-center self-stretch group_11 view_7">
                  <img
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=c3bdfd2efe77088d4a94477a81a7620d.png"
                  />
                  <span class="ml-6 font_7">Over Look</span>
                </div>
                <div class="flex-row items-center self-stretch group_11 view_5">
                  <img
                    class="image_15"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e8cbcdc477c7b41d32f39e48098579e9.png"
                  />
                  <span class="ml-6 font_7 text_43">1.5 Weeks Left</span>
                </div>
                <div class="self-stretch section_7"></div>
                <div class="flex-col self-stretch group_12">
                  <span class="self-start font_7">Team Members</span>
                  <span class="self-end font_6 text_30">Progress</span>
                </div>
                <div class="flex-row justify-between self-stretch group_13">
                  <div class="flex-row">
                    <img
                      class="image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3b068d39f3bdd95183e4d7ad40b19442.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=6cd24d16eaf727a956fcf0dc12bc35bd.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=51f2bad26d2a0830bf4075dec667f193.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=69ba8e7bdd72d2d49099fb57af58bcb5.png"
                    />
                  </div>
                  <span class="self-center font_8 text_47">29%</span>
                </div>
              </div>
              <img
                class="image_21 pos_6"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3197414d1d4e8a03f98f6d56b5a4c668.png"
              />
            </div>
            <div class="flex-col justify-start relative grid-item">
              <div class="flex-col section_6">
                <span class="self-start font_3 text_18 text_37">Cinimatography</span>
                <div class="flex-row items-center self-stretch group_11 view_4">
                  <img
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=c3bdfd2efe77088d4a94477a81a7620d.png"
                  />
                  <span class="ml-6 font_7 text_40">Main stream</span>
                </div>
                <div class="flex-row items-center self-stretch group_11 view_5">
                  <img
                    class="image_15"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e8cbcdc477c7b41d32f39e48098579e9.png"
                  />
                  <span class="ml-6 font_6 text_44">2 Days Left</span>
                </div>
                <div class="self-stretch section_7"></div>
                <div class="flex-col self-stretch group_12">
                  <span class="self-start font_7">Team Members</span>
                  <span class="self-end font_6 text_30">Progress</span>
                </div>
                <div class="flex-row items-center self-stretch group_13">
                  <div class="flex-row">
                    <img
                      class="image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3b068d39f3bdd95183e4d7ad40b19442.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=6cd24d16eaf727a956fcf0dc12bc35bd.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=51f2bad26d2a0830bf4075dec667f193.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=69ba8e7bdd72d2d49099fb57af58bcb5.png"
                    />
                  </div>
                  <span class="ml-14 font_8 text_48">4%</span>
                </div>
              </div>
              <img
                class="image_22 pos_7"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=fd71759471d6a624045163dd536c31e1.png"
              />
            </div>
            <div class="flex-col justify-start relative grid-item">
              <div class="flex-col section_5">
                <span class="self-start font_5 text_18 text_38">Feed Back</span>
                <div class="flex-row items-center self-stretch group_11 view_8">
                  <img
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=c3bdfd2efe77088d4a94477a81a7620d.png"
                  />
                  <span class="ml-6 font_7 text_41">Customer Relations</span>
                </div>
                <div class="flex-row items-center self-stretch group_11 view_5">
                  <img
                    class="image_15"
                    src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=e8cbcdc477c7b41d32f39e48098579e9.png"
                  />
                  <span class="ml-6 font_7 text_45">3 Weeks Left</span>
                </div>
                <div class="self-stretch section_7"></div>
                <div class="flex-col self-stretch group_12">
                  <span class="self-start font_7">Team Members</span>
                  <span class="self-end font_6 text_30">Progress</span>
                </div>
                <div class="flex-row justify-between self-stretch group_13">
                  <div class="flex-row">
                    <img
                      class="image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=3b068d39f3bdd95183e4d7ad40b19442.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=6cd24d16eaf727a956fcf0dc12bc35bd.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=51f2bad26d2a0830bf4075dec667f193.png"
                    />
                    <img
                      class="ml-4 image_17"
                      src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=69ba8e7bdd72d2d49099fb57af58bcb5.png"
                    />
                  </div>
                  <span class="self-center font_8 text_49">32%</span>
                </div>
              </div>
              <img
                class="image_23 pos_8"
                src="https://ide.code.fun/api/image?token=6773faabdefdb100111145d3&name=49f654b0a740de29e61662ed2d50cc0e.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .ml-47 {
    margin-left: 2.94rem;
  }
  .ml-7 {
    margin-left: 0.44rem;
  }
  .mt-7 {
    margin-top: 0.44rem;
  }
  .ml-13 {
    margin-left: 0.81rem;
  }
  .ml-5 {
    margin-left: 0.31rem;
  }
  .ml-11 {
    margin-left: 0.69rem;
  }
  .ml-25 {
    margin-left: 1.56rem;
  }
  .ml-9 {
    margin-left: 0.56rem;
  }
  .page {
    padding-left: 1.5rem;
    padding-top: 0.75rem;
    background-color: #ffffff;
    border-radius: 0.63rem;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .group {
    padding: 0 1.63rem;
  }
  .section {
    background-color: #00b0d7;
    border-radius: 50%;
    width: 0.69rem;
    height: 0.69rem;
  }
  .font_2 {
    font-size: 0.63rem;
    font-family: Poppins;
    letter-spacing: -0.047rem;
    line-height: 0.58rem;
    color: #707276;
  }
  .text_2 {
    color: #000000;
    font-weight: 600;
    line-height: 0.5rem;
  }
  .group_2 {
    border-radius: 0.31rem;
    width: 9.69rem;
    height: 1.44rem;
    border-left: solid 0.025rem #70727645;
    border-right: solid 0.025rem #70727645;
    border-top: solid 0.025rem #70727645;
    border-bottom: solid 0.025rem #70727645;
  }
  .group_3 {
    margin-right: 1.63rem;
  }
  .image_2 {
    width: 0.75rem;
    height: 0.75rem;
  }
  .image {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
  .font {
    font-size: 0.44rem;
    font-family: Poppins;
    line-height: 0.33rem;
    font-weight: 600;
    color: #5f5e61;
  }
  .text {
    color: #000000;
    line-height: 0.31rem;
  }
  .text_3 {
    font-size: 0.38rem;
    line-height: 0.28rem;
  }
  .group_5 {
    padding: 0 0.81rem;
  }
  .image_3 {
    width: 0.94rem;
    height: 0.94rem;
  }
  .text_5 {
    line-height: 0.58rem;
  }
  .group_7 {
    margin-top: 2.13rem;
    padding: 0 0.88rem;
  }
  .section_4 {
    margin-top: 1.63rem;
    padding: 0.5rem 0.81rem;
    background-color: #00b0d7;
    border-radius: 0.5rem;
  }
  .image_7 {
    width: 0.88rem;
    height: 0.88rem;
  }
  .text_16 {
    margin-right: 2.5rem;
    color: #ffffff;
  }
  .group_10 {
    margin-top: 1.63rem;
    padding: 0 1rem;
  }
  .image_12 {
    width: 0.69rem;
    height: 0.63rem;
  }
  .text_17 {
    line-height: 0.58rem;
  }
  .image_13 {
    width: 0.81rem;
    height: 0.81rem;
  }
  .image_14 {
    margin-left: 0.88rem;
    margin-top: 2.25rem;
  }
  .image_16 {
    margin-left: 0.88rem;
    margin-top: 2.06rem;
  }
  .image_19 {
    margin-left: 0.88rem;
    margin-top: 2.13rem;
  }
  .image_24 {
    margin-left: 1rem;
    margin-top: 2.13rem;
  }
  .group_14 {
    margin-top: 7.75rem;
    padding: 0 1.06rem;
  }
  .image_25 {
    width: 1.13rem;
    height: 0.94rem;
  }
  .text_50 {
    line-height: 0.61rem;
  }
  .section_2 {
    background-color: #f2f3f7;
    border-radius: 1.13rem 0rem 0.63rem 0rem;
    height: 33.31rem;
  }
  .group_4 {
    padding: 1.38rem 1.25rem 1rem;
  }
  .font_3 {
    font-size: 0.75rem;
    font-family: Poppins;
    letter-spacing: -0.056rem;
    line-height: 0.78rem;
    font-weight: 600;
    color: #5f5e61;
  }
  .text_4 {
    font-size: 0.81rem;
    line-height: 0.86rem;
    letter-spacing: unset;
  }
  .text_6 {
    line-height: 0.46rem;
  }
  .image_4 {
    width: 1rem;
    height: 1rem;
  }
  .image_5 {
    border-radius: 0.31rem;
    width: 1.56rem;
    height: 1.56rem;
  }
  .image_6 {
    margin-right: 0.25rem;
  }
  .group_6 {
    padding-bottom: 0.75rem;
  }
  .divider {
    margin-left: 1.25rem;
    margin-right: 1.44rem;
    background-color: #70727640;
    height: 0.025rem;
  }
  .group_8 {
    margin-top: 0.75rem;
    padding: 0 1.25rem;
  }
  .font_4 {
    font-size: 0.63rem;
    font-family: Poppins;
    line-height: 0.42rem;
    font-weight: 600;
    color: #5f5e61;
  }
  .text_7 {
    line-height: 0.46rem;
  }
  .text-wrapper {
    padding: 0.5rem 0;
    border-radius: 0.31rem;
    width: 1.56rem;
    height: 1.56rem;
    border-left: solid 0.063rem #00b0d7;
    border-right: solid 0.063rem #00b0d7;
    border-top: solid 0.063rem #00b0d7;
    border-bottom: solid 0.063rem #00b0d7;
  }
  .text_8 {
    color: #00b0d7;
    line-height: 0.32rem;
  }
  .text_9 {
    line-height: 0.47rem;
  }
  .text-wrapper_2 {
    padding: 0.63rem 0;
    background-color: #ffffff;
    border-radius: 0.31rem;
    width: 1.56rem;
    height: 1.56rem;
  }
  .text_10 {
    line-height: 0.32rem;
  }
  .text_11 {
    line-height: 0.63rem;
  }
  .text_12 {
    line-height: 0.32rem;
  }
  .text_13 {
    line-height: 0.5rem;
  }
  .text_14 {
    line-height: 0.31rem;
  }
  .group_9 {
    margin-right: 0.25rem;
  }
  .section_3 {
    padding: 0.38rem 0.25rem;
    background-color: #ffffff;
    border-radius: 0.31rem;
    height: 1.56rem;
  }
  .text_15 {
    font-size: 0.38rem;
    line-height: 0.26rem;
  }
  .grid {
    margin-top: 0.38rem;
    padding: 0 0.75rem;
    height: 25.63rem;
    display: grid;
    grid-template-rows: repeat(2, minmax(0, 1fr));
    grid-template-columns: repeat(4, minmax(0, 1fr));
    row-gap: 0;
    column-gap: 0;
  }
  .grid-item {
    padding: 2rem 0 0.63rem;
  }
  .section_5 {
    margin-left: 0.5rem;
    margin-right: 0.75rem;
    padding: 2.25rem 1.56rem 1.19rem;
    background-color: #ffffff;
    border-radius: 1.25rem;
  }
  .group_11 {
    padding: 0 0.25rem;
  }
  .view {
    margin-top: 0.38rem;
  }
  .font_6 {
    font-size: 0.44rem;
    font-family: Poppins;
    letter-spacing: -0.033rem;
    line-height: 0.42rem;
    color: #5f5e61;
  }
  .text_22 {
    line-height: 0.46rem;
  }
  .view_5 {
    margin-top: 0.63rem;
  }
  .image_15 {
    width: 0.69rem;
    height: 0.69rem;
  }
  .font_7 {
    font-size: 0.44rem;
    font-family: Poppins;
    letter-spacing: -0.033rem;
    line-height: 0.33rem;
    color: #5f5e61;
  }
  .text_26 {
    line-height: 0.34rem;
  }
  .section_7 {
    margin-top: 0.88rem;
    background-color: #5f5e6138;
    height: 0.044rem;
  }
  .group_12 {
    margin-top: 1rem;
    height: 0.44rem;
  }
  .text_30 {
    margin-top: -0.25rem;
  }
  .group_13 {
    margin-top: 0.5rem;
    padding: 0 0.063rem;
  }
  .image_17 {
    border-radius: 50%;
    width: 0.81rem;
    height: 0.81rem;
  }
  .font_8 {
    font-size: 0.63rem;
    font-family: Poppins;
    letter-spacing: -0.043rem;
    line-height: 0.42rem;
    color: #5f5e61;
  }
  .text_31 {
    margin-right: 0.63rem;
    font-size: 0.56rem;
    line-height: 0.43rem;
  }
  .image_8 {
    box-shadow: 0rem 0.63rem 0.69rem -0.38rem #ea5b92;
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .pos {
    position: absolute;
    left: 1.94rem;
    top: 0.65rem;
  }
  .font_5 {
    font-size: 0.75rem;
    font-family: Poppins;
    letter-spacing: -0.056rem;
    line-height: 0.58rem;
    font-weight: 600;
    color: #5f5e61;
  }
  .text_18 {
    margin-left: 0.13rem;
  }
  .text_19 {
    line-height: 0.75rem;
  }
  .text_20 {
    line-height: 0.56rem;
  }
  .view_2 {
    margin-top: 0.63rem;
  }
  .text_23 {
    line-height: 0.46rem;
  }
  .text_27 {
    margin-left: 0.38rem;
  }
  .image_18 {
    margin-left: 1.31rem;
  }
  .text_32 {
    margin-left: 0.88rem;
    font-size: 0.56rem;
    line-height: 0.42rem;
  }
  .image_9 {
    box-shadow: 0rem 0.63rem 0.69rem -0.38rem #14c3a4;
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .pos_2 {
    position: absolute;
    left: 1.94rem;
    top: 0.65rem;
  }
  .text_21 {
    line-height: 0.76rem;
  }
  .view_3 {
    margin-top: 0.38rem;
  }
  .text_24 {
    line-height: 0.46rem;
  }
  .text_28 {
    line-height: 0.45rem;
  }
  .text_33 {
    margin-right: 0.63rem;
    font-size: 0.56rem;
    line-height: 0.43rem;
  }
  .image_10 {
    box-shadow: 0rem 0.63rem 0.69rem -0.38rem #4f96f7;
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .pos_3 {
    position: absolute;
    left: 1.94rem;
    top: 0.65rem;
  }
  .section_6 {
    margin-left: 0.5rem;
    margin-right: 0.75rem;
    padding: 2.13rem 1.56rem 1.19rem;
    background-color: #ffffff;
    border-radius: 1.25rem;
  }
  .view_4 {
    margin-top: 0.38rem;
  }
  .text_25 {
    line-height: 0.46rem;
  }
  .text_29 {
    line-height: 0.34rem;
  }
  .text_34 {
    margin-right: 0.63rem;
    font-size: 0.56rem;
    line-height: 0.43rem;
  }
  .image_11 {
    box-shadow: 0rem 0.63rem 0.69rem -0.38rem #fa8036;
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .pos_4 {
    position: absolute;
    left: 1.94rem;
    top: 0.65rem;
  }
  .text_35 {
    line-height: 0.75rem;
  }
  .view_6 {
    margin-top: 0.38rem;
  }
  .text_39 {
    line-height: 0.46rem;
  }
  .text_42 {
    line-height: 0.34rem;
  }
  .text_46 {
    margin-right: 0.63rem;
    font-size: 0.56rem;
    line-height: 0.42rem;
  }
  .image_20 {
    box-shadow: 0rem 0.63rem 0.69rem -0.38rem #d289df;
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .pos_5 {
    position: absolute;
    left: 1.94rem;
    top: 0.65rem;
  }
  .text_36 {
    line-height: 0.73rem;
  }
  .view_7 {
    margin-top: 0.38rem;
  }
  .text_43 {
    line-height: 0.34rem;
  }
  .text_47 {
    margin-right: 0.63rem;
    font-size: 0.56rem;
    line-height: 0.43rem;
  }
  .image_21 {
    box-shadow: 0rem 0.63rem 0.69rem -0.38rem #fb8137;
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .pos_6 {
    position: absolute;
    left: 1.94rem;
    top: 0.65rem;
  }
  .text_37 {
    line-height: 0.79rem;
  }
  .text_40 {
    line-height: 0.34rem;
  }
  .text_44 {
    line-height: 0.45rem;
  }
  .text_48 {
    font-size: 0.56rem;
    line-height: 0.41rem;
  }
  .image_22 {
    box-shadow: 0rem 0.63rem 0.69rem -0.38rem #7ebbe3;
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .pos_7 {
    position: absolute;
    left: 1.94rem;
    top: 0.65rem;
  }
  .text_38 {
    line-height: 0.56rem;
  }
  .view_8 {
    margin-top: 0.63rem;
  }
  .text_41 {
    line-height: 0.34rem;
  }
  .text_45 {
    line-height: 0.34rem;
  }
  .text_49 {
    margin-right: 0.63rem;
    font-size: 0.56rem;
    line-height: 0.43rem;
  }
  .image_23 {
    box-shadow: 0rem 0.63rem 0.69rem -0.38rem #e8588f;
    border-radius: 50%;
    width: 2.38rem;
    height: 2.38rem;
  }
  .pos_8 {
    position: absolute;
    left: 1.94rem;
    top: 0.65rem;
  }
</style>