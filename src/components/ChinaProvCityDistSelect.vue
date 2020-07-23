<template>
  <div class="wrapper">
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
      <option>=请选择区县=</option>
    </select>

    <button type="button" class="btn met1" @click="showAddr()">确定</button>
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
        country: ''
      },
      btn: '',
      prov: '',
      city: '',
      country: '',
      res: ''
    };
  },
  mounted() {
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
        this.btn.disabled = true;
      }
      if (val != null) {
        // 填充市下拉选
        this.city.length = 1;
        if (provinces[val]) {
          var cityLen = provinces[val]['city'].length;
        }
        for (var j = 0; j < cityLen; j++) {
          var cityOpt = document.createElement('option');
          cityOpt.innerText = provinces[val]['city'][j].name;
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
        if (provinces[this.current.prov]['city'][val]) {
          var countryLen = provinces[this.current.prov]['city'][val].districtAndCounty.length;
        }
        if (countryLen == 0) {
          // 没有县的情况下，直接在输入框显示 省-市

          return;
        }
        for (var n = 0; n < countryLen; n++) {
          var countryOpt = document.createElement('option');
          countryOpt.innerText = provinces[this.current.prov]['city'][val].districtAndCounty[n];
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
      this.res =
        provinces[this.current.prov].name +
        '-' +
        provinces[this.current.prov]['city'][this.current.city].name +
        '-' +
        provinces[this.current.prov]['city'][this.current.city].districtAndCounty[this.current.country];
      console.log(this.res);
      this.$emit('confirm', this.res);
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

select#country {
  display: none;
}
</style>
