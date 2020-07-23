<template>
  <div class="container">
    <div class="top">
      <div class="content">
        <div class="shadow"></div>
      </div>
      <div class="head">
        <div class="head_con"></div>
      </div>
      <div style=" border: 10px solid transparent;"></div>
    </div>
    <div class="middle">
      <div class="grid">
        <div class="cell u-1of2">1/2</div>
        <div class="cell u-auto">auto</div>
        <div class="cell u-auto">auto</div>
      </div>
      <div class="grid">
        <div class="cell u-auto">auto</div>
        <div class="cell u-1of3">1/3</div>
      </div>
      <div class="grid">
        <div class="cell u-1of4">1/4</div>
        <div class="cell u-auto">auto</div>
        <div class="cell u-1of3">1/3</div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-col">
        <div class="tri"></div>
        <div class="box1">
          <div class="tip"></div>
        </div>
        <div class="breathe">
          <div class="data-card-frame data-option-name">
            <div class="text">HELLO</div>
          </div>
        </div>
      </div>
      <div class="bottom-col">
        <div class="wrapper">
          <form action="#">
            <label for="addr-show"
              >您选择的是：
              <input type="text" value="" id="addr-show" />
            </label>
            <br />

            <!-- 省份选择 -->
            <select id="prov" @change="showCity($event)">
              <option>=请选择省份=</option>
            </select>

            <!--城市选择-->
            <select id="city" @change="showCountry($event)">
              <option>=请选择城市=</option>
            </select>

            <!--县区选择-->
            <select id="country" @change="selecCountry($event)">
              <option>=请选择县区=</option>
            </select>

            <button type="button" class="btn met1" @click="showAddr()">确定</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { provice } from '../assets/js/citys';
export default {
  name: 'CSS3BasedStyleAndLinkage',
  data() {
    return {
      current: {
        prov: '',
        city: '',
        country: ''
      },
      addrShow: '',
      btn: '',
      prov: '',
      city: '',
      country: ''
    };
  },
  mounted() {
    this.addrShow = this.getElement('addr-show');
    this.btn = document.getElementsByClassName('met1')[0];
    this.prov = this.getElement('prov');
    this.city = this.getElement('city');
    this.country = this.getElement('country');
    this.showProv();
  },
  methods: {
    /*根据所选的省份来显示城市列表*/
    showCity(event) {
      let obj = event.target;
      var val = obj.options[obj.selectedIndex].value;
      console.log(val);
      if (val >= 0) {
        this.city.style.display = 'inline-block';
        this.country.style.display = 'none';
      } else {
        this.city.style.display = 'none';
        this.country.style.display = 'none';
      }
      if (val != this.current.prov) {
        // 选择其他省，清空输入框，禁用确定按钮
        this.current.prov = val;
        this.addrShow.value = '';
        this.btn.disabled = true;
      }
      if (val != null) {
        // 填充市下拉选
        this.city.length = 1;
        if (provice[val]) {
          var cityLen = provice[val]['city'].length;
        }
        // var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
          var cityOpt = document.createElement('option');
          cityOpt.innerText = provice[val]['city'][j].name;
          cityOpt.value = j;
          this.city.appendChild(cityOpt);
        }
      }
    },

    /*根据所选的城市来显示县区列表*/
    showCountry(event) {
      let obj = event.target;
      var val = obj.options[obj.selectedIndex].value;
      if (val >= 0) {
        this.country.style.display = 'inline-block';
      } else {
        this.country.style.display = 'none';
      }
      this.current.city = val;
      if (val != null) {
        this.country.length = 1; //清空之前的内容只留第一个默认选项
        if (provice[this.current.prov]['city'][val]) {
          var countryLen = provice[this.current.prov]['city'][val].districtAndCounty.length;
        }
        if (countryLen == 0) {
          // 没有县的情况下，直接在输入框显示 省-市
          this.addrShow.value =
            provice[this.current.prov].name + '-' + provice[this.current.prov]['city'][this.current.city].name;
          return;
        }
        for (var n = 0; n < countryLen; n++) {
          var countryOpt = document.createElement('option');
          countryOpt.innerText = provice[this.current.prov]['city'][val].districtAndCounty[n];
          countryOpt.value = n;
          this.country.appendChild(countryOpt);
        }
      }
    },

    /*选择县区之后的处理函数*/
    selecCountry(event) {
      let obj = event.target;
      this.current.country = obj.options[obj.selectedIndex].value;
      if (this.current.city != null && this.current.country != null) {
        this.btn.disabled = false;
      }
    },

    /*点击确定按钮显示用户所选的地址*/
    showAddr() {
      this.addrShow.value =
        provice[this.current.prov].name +
        '-' +
        provice[this.current.prov]['city'][this.current.city].name +
        '-' +
        provice[this.current.prov]['city'][this.current.city].districtAndCounty[this.current.country];
    },
    getElement(str) {
      return document.getElementById(str);
    },
    showProv() {
      this.btn.disabled = true;
      let len = provice.length;
      for (let i = 0; i < len; i++) {
        let provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        this.prov.appendChild(provOpt);
      }
    }
  },
  components: {}
};
</script>

<style scoped src="../assets/css/linkage.css"></style>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px black solid;
}
.top {
  width: 100%;
  height: 80px;
  position: relative;
}

.top .content {
  width: 100%;
  height: 40px;
  background-color: #13163e;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: rgba(55, 210, 280) 0px 1px 10px inset;
}
.top .shadow {
  margin: 0 auto;
  width: 388px;
  height: 10px;
  margin-top: 30px;
  background-color: #13163e;
}
.top .head {
  position: absolute;
  top: 41px;
  left: 50%;
  margin-left: -200px;
  width: 400px;
  height: 40px;
  transform: perspective(0.5em) rotateX(-2deg);
  -webkit-transform: perspective(0.5em) rotateX(-2deg);
  overflow: hidden;
}
.top .head_con {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: perspective(0.5em) scale(0.9, 0.7);
  -webkit-transform: perspective(0.5em) scale(0.9, 0.7);
  background-color: #13163e;
  transform-origin: top center;
  border-radius: 0 0 5px 5px;
  box-shadow:
                /*上*/
                /*inset 0px 15px 10px -15px  rgba(55, 210, 280),*/
                /*右*/ inset -15px
      0px 10px -15px rgba(55, 210, 280),
    /*左*/ inset 15px 0px 10px -15px rgba(55, 210, 280), /*下*/ inset 0px -15px 10px -15px rgba(55, 210, 280);
}

.middle {
  width: 100%;
  height: 200px;
}

.middle .grid {
  display: flex;
}

.middle .grid .cell {
  display: flex;
  height: 50px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  background-color: #f4f3f0;
  border-radius: 4px;
}

.middle .grid .u-1of2 {
  flex: 0 0 50%;
}

.middle .grid .u-auto {
  flex: 1;
}

.middle .grid .u-1of3 {
  flex: 0 0 33.33333%;
}

.middle .grid .u-1of4 {
  flex: 0 0 25%;
}

.bottom {
  width: 100%;
  height: 200px;
  flex-grow: 1;
  display: flex;
  background-color: #9da59d;
}

.bottom-col {
  background-color: yellow;
  flex-basis: 20%;
}

.bottom-col:nth-child(1) {
  background-color: bisque;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.bottom-col:nth-child(1) .tri {
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-bottom-color: blue;
}

.bottom-col:nth-child(1) .box1 {
  margin-top: 20px;
  position: relative;
  width: 100px;
  height: 40px;
  background-color: red;
}

.bottom-col:nth-child(1) .box1 .tip {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  right: -5px;
  margin-top: -5px;
  transform: rotate(45deg);
  top: 50%;
}

.bottom-col:nth-child(1) .box1::before {
  content: '';
  position: absolute;
  border: 10px solid transparent;
  border-top-color: red;
  left: 70px;
  transform: rotate(180deg);
  transform-origin: 50% 0;
}

.bottom-col:nth-child(1) .breathe {
  width: 100%;
  margin-top: 30px;
  position: relative;
  background-color: #060f21;
  flex-grow: 1;
}
/*边框框架样式 核心语句*/
.breathe .data-card-frame {
  border-radius: 10px;
  background-color: #13163e;
  box-shadow: rgba(55, 110, 180) 0px 1px 30px inset;
}
/*移动模块的呼吸效果*/
.breathe .data-card-frame:hover {
  animation: glow 800ms ease-out infinite alternate;
}
@keyframes glow {
  0% {
    border-color: #393;
    box-shadow: rgba(55, 110, 180) 0px 1px 30px inset;
  }
  100% {
    border-color: #6f6;
    box-shadow: rgba(55, 210, 280) 0px 1px 30px inset;
  }
}

.breathe .data-card-frame .text {
  font-size: 20px;
  margin: 20px;
}

.breathe .data-option-name {
  width: 90%;
  height: 50%;
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
