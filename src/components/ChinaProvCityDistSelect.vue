<template>
  <div class="wrapper">
    <!-- 省份选择 -->
    <select id="prov" @change="showCity($event)">
      <option value="-1">=请选择省份=</option>
    </select>

    <!--城市选择-->
    <select id="city" @change="showCountry($event)">
      <option value="-1">=请选择城市=</option>
    </select>

    <!--区县选择-->
    <select id="county" @change="selecCountry($event)">
      <option value="-1">=请选择区县=</option>
    </select>

    <button type="button" class="btn" @click="showAddr()">确定</button>
  </div>
</template>

<script>
import { provinces } from '../assets/js/citys';
export default {
  name: 'ChinaProvCityDistSelect',
  data() {
    return {
      current: {
        prov: '',
        city: '',
        county: ''
      },
      btn: '',
      prov: '',
      city: '',
      county: ''
    };
  },
  mounted() {
    this.btn = document.querySelector('.btn');
    this.prov = this.getElement('prov');
    this.city = this.getElement('city');
    this.county = this.getElement('county');
    this.showProv();
  },
  methods: {
    /*根据所选的省份来显示城市列表*/
    showCity(event) {
      let selectObj = event.target;
      let value = selectObj.options[selectObj.selectedIndex].value;
      // 选择其他省，禁用确定按钮
      this.current.prov = value;
      this.btn.disabled = true;
      if (value >= 0) {
        this.city.style.display = 'inline-block';
        this.county.style.display = 'none';

        this.city.length = 1; // 清空城市下拉选，只保留第一个默认选项
        let cityLen = provinces[value]['city'].length;
        // 填充市下拉选;
        for (let i = 0; i < cityLen; i++) {
          let cityOpt = document.createElement('option');
          cityOpt.innerText = provinces[value]['city'][i].name;
          cityOpt.value = i;
          this.city.appendChild(cityOpt);
        }
      } else {
        this.city.style.display = 'none';
        this.county.style.display = 'none';
      }
    },

    /*根据所选的城市来显示区县列表*/
    showCountry(event) {
      let selectObj = event.target;
      let value = selectObj.options[selectObj.selectedIndex].value;
      this.current.city = value;
      this.btn.disabled = true;
      if (value >= 0) {
        this.county.style.display = 'inline-block';

        this.county.length = 1;
        let countryLen = provinces[this.current.prov]['city'][value].districtAndCounty.length;
        for (let i = 0; i < countryLen; i++) {
          let countryOpt = document.createElement('option');
          countryOpt.innerText = provinces[this.current.prov]['city'][value].districtAndCounty[i];
          countryOpt.value = i;
          this.county.appendChild(countryOpt);
        }
      } else {
        this.county.style.display = 'none';
      }
    },

    /*选择县区之后的处理函数*/
    selecCountry(event) {
      this.btn.disabled = true;
      let selectObj = event.target;
      let value = selectObj.options[selectObj.selectedIndex].value;
      this.current.county = value;
      if (value < 0) {
        this.btn.disabled = true;
      } else {
        this.btn.disabled = false;
      }
    },

    /*点击确定按钮显示用户所选的地址*/
    showAddr() {
      let res = '';
      let province = provinces[this.current.prov].name;
      let city = provinces[this.current.prov]['city'][this.current.city].name;
      let county = provinces[this.current.prov]['city'][this.current.city].districtAndCounty[this.current.county];
      res = province + '-' + city + '-' + county;
      console.log(res);
      this.$emit('confirm', res);
    },
    getElement(str) {
      return document.getElementById(str);
    },
    showProv() {
      this.btn.disabled = true;
      let len = provinces.length;
      for (let i = 0; i < len; i++) {
        let provOpt = document.createElement('option');
        provOpt.innerText = provinces[i]['name'];
        provOpt.value = i;
        this.prov.appendChild(provOpt);
      }
    }
  },
  model: { prop: 'value', event: 'confirm' },
  props: {
    vaule: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.wrapper {
  text-align: center;
  margin-top: 80px;
}

#addr-show {
  width: 200px;
  height: 25px;
  margin-bottom: 10px;
}

.btn {
  width: 80px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  background-color: #aaa;
  margin: 0 20px;
}

.btn:disabled {
  background-color: #ccc;
}

select {
  width: 120px;
  height: 30px;
}

select#city {
  display: none;
}

select#county {
  display: none;
}
</style>
