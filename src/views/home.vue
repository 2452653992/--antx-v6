<template>
  <div id="sight-container">
    <header>
      粉煤泄露在线监测系统
      <div id="logo">
        <img src="../assets/ht.png" id="ht" alt="" />
        <img src="../assets/hit.png" id="hit" alt="" />
      </div>
    </header>
    <body>
      <div id="floorList">
        <div class="floor" v-for="item in rowList">
          {{ item }}
        </div>
      </div>
      <div class="allTable">
        <div id="deviceList">
          {{}}
          <div
            :class="[index % 2 ? 'shallow' : 'dark', 'cell']"
            v-for="(item, index) in deviceList"
          >
            <div
              class="device"
              @click="GraphStore.handleGenerate(index + 1, index + 1)"
            >
              <span>{{ item.before.beforeId }}</span>
              <div
                class="status safe"
                v-if="item.before.beforeStatus === 'safe'"
              ></div>
              <div
                class="status error"
                v-if="item.before.beforeStatus === 'error'"
              ></div>
              <div
                class="status warning"
                v-if="item.before.beforeStatus === 'warning'"
              ></div>
            </div>
            <div
              class="device"
              @click="GraphStore.handleGenerate(index + 1, index + 31)"
            >
              <span> {{ item.after.afterId }}</span>
              <div
                class="status safe"
                v-if="item.after.afterStatus === 'safe'"
              ></div>
              <div
                class="status error"
                v-if="item.after.afterStatus === 'error'"
              ></div>
              <div
                class="status warning"
                v-if="item.after.afterStatus === 'warning'"
              ></div>
            </div>
          </div>
        </div>
        <div id="thread">
          <div
            :class="[index % 2 ? 'shallow' : 'dark', 'cell']"
            v-for="(item, index) in threadList"
          >
            <span>
              {{ item.device }}
            </span>
            <span>
              {{ item.thread }}
            </span>
          </div>
        </div>
      </div>
      <div class="intro">
        <h3>图例</h3>
        <div class="single">
          <div
            class="introCircle"
            style="background-color: rgb(2, 199, 90)"
          ></div>
          <span>正常 </span>
        </div>
        <div class="single">
          <div
            class="introCircle"
            style="background-color: rgb(255, 2, 1)"
          ></div>
          <span>异常</span>
        </div>
        <div class="single">
          <div
            class="introCircle"
            style="background-color: rgb(250, 255, 4)"
          ></div>
          <span>线路故障</span>
        </div>
      </div>
    </body>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  reactive,
} from "vue";
import { useGraphStore } from "../store";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const GraphStore = useGraphStore();
const rowList = ["13层", "11层", "9层", "3层", "1层", ""];
let deviceList: any[] = reactive([]);
const threadList = [
  {
    device: "A气化炉",
    thread: "1#线",
  },
  {
    device: "A气化炉",
    thread: "2#线",
  },
  {
    device: "A气化炉",
    thread: "3#线",
  },
  {
    device: "B气化炉",
    thread: "1#线",
  },
  {
    device: "B气化炉",
    thread: "2#线",
  },
  {
    device: "B气化炉",
    thread: "3#线",
  },
];
const requireSensorDataHomepage = async () => {
  // deviceList = reactive([]);
  await proxy?.$http
    .get("/getSensorDataHomepage")
    .then((res: any) => {
      // deviceList = reactive([]);
      res = res.data.data;
      for (let i = 0; i < 60; i++){
        deviceList.shift()
      }
      res.forEach((item: any) => {
        item = item.reverse();
        item.forEach((i: any) => {
          deviceList.unshift(i);
        });
      });
      console.log(deviceList);
    })
    .catch((err: any) => {
      console.error(err);
    });
};
requireSensorDataHomepage();
onMounted(() => {
  requireSensorDataHomepage();
});

setInterval(function () {
  setTimeout(() => {
    requireSensorDataHomepage();
  }, 0);
}, 3000);
</script>
<style lang="less" scoped>
#sight-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  @keyframes flashSafe {
    0% {
      background-color: rgb(0, 144, 65);
    }
    100% {
      background-color: rgb(2, 199, 90);
    }
  }
  @keyframes flashError {
    0% {
      background-color: rgb(182, 2, 2);
    }
    100% {
      background-color: rgb(255, 2, 1);
    }
  }
  @keyframes flashWarning {
    0% {
      background-color: rgb(227, 231, 2);
    }
    100% {
      background-color: rgb(250, 255, 4);
    }
  }
  .safe {
    background-color: rgb(4, 174, 80);
    animation: flashSafe 0.2s alternate infinite ease-in-out;
  }
  .error {
    background-color: rgb(255, 2, 1);
    animation: flashError 0.2s alternate infinite ease-in-out;
  }
  .warning {
    background-color: rgb(250, 255, 4);
    animation: flashWarning 0.2s alternate infinite ease-in-out;
  }
  .shallow {
    background-color: rgb(216, 216, 216);
  }
  .dark {
    background-color: rgb(189, 189, 189);
  }
  // grid-template-rows: repeat(7, 1fr);
  header {
    position: relative;
    height: 14.28vh;
    background-color: rgb(198, 225, 177);
    border-bottom: 2px solid #333;
    color: #333;
    display: grid;
    place-content: center;
    font-size: 2.7em;
    font-weight: 540;
    #logo {
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: column;
      margin-right: 0.2em;
      margin-top: 0.32em;
      #hit {
        width: 3.5em;
        transform: translateY(-0.3em);
      }
      #ht {
        transform: translateX(-0.3em);
        width: 3em;
        height: 1.45em;
      }
    }
  }
  body {
    display: flex;
    height: 85.72vh;
    #floorList {
      width: 10vw;
      background-color: rgb(216, 216, 216);
      display: flex;
      flex-direction: column;
      .floor {
        flex: 1;
        display: grid;
        place-content: center;
        border: 2px solid #333;
        border-top: none;
        font-size: 24px;
      }
    }
    .allTable {
      width: 82.8vw;
      height: 100%;
      #deviceList {
        height: 83.333%;
        width: 100%;
        display: grid;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: repeat(6, 1fr);
        .cell {
          font-weight: 540;
          font-size: 18px;
          display: grid;
          justify-content: center;
          vertical-align: middle;
          // gap: 20px;
          border: 2px solid #333;
          border-top: none;
          border-left: none;
          .device {
            margin-top: 8%;
            cursor: pointer;
            display: flex;
            gap: 10px;
          }
          .status {
            transition: all 0.5s;
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
        }
      }
      #thread {
        height: 16.666%;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        .cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 25px;
          justify-content: center;
          border: 2px solid #333;
          border-top: none;
          border-left: none;
        }
      }
    }
    .intro {
      transform: translateX(1px);
      background-color: rgb(216, 216, 216);
      height: 100%;
      width: 7.2vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 50px;
      h3 {
        font-size: 35px;
        font-weight: normal;
      }
      .single {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 19px;
      }
      .introCircle {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }
    }
  }
}
</style>
