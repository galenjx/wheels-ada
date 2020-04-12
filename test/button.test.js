const expect = chai.expect;
import Vue from "vue";
import Button from "../src/button";
import Icon from "../src/icon";

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.component("w-icon", Icon);

describe("Button", () => {
  it("存在.", () => {
    expect(Button).to.be.ok;
  });
  it("可以设置icon.", () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings"
      }
    }).$mount();
    const useElement = vm.$el.querySelector("use");
    expect(useElement.getAttribute("xlink:href")).to.equal("#i-settings");
    vm.$destroy();
  });
  it("可以设置loading.", () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings",
        loading: true
      }
    }).$mount();
    const useElements = vm.$el.querySelectorAll("use");
    expect(useElements.length).to.equal(1);
    expect(useElements[0].getAttribute("xlink:href")).to.equal("#i-loading");
    vm.$destroy();
  });
  it("接收 round 属性", () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        round: true
      }
    }).$mount();
    expect(vm.$el.classList.contains("is-round")).to.equal(true);
    vm.$destroy();
  });
  it("接收 border 属性", () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        border: true
      }
    }).$mount();
    expect(vm.$el.classList.contains("border-primary")).to.equal(true);
    vm.$destroy();
  });
  it("可以设置 border,type", () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings",
        type: "success",
        border: true
      }
    }).$mount();
    const useElements = vm.$el.querySelectorAll("use");
    expect(useElements.length).to.equal(1);
    expect(useElements[0].className.animVal).to.equal("color-success");
    vm.$destroy();
  });
  it("icon 默认的 order 是 1", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings"
      }
    }).$mount(div);
    const icon = vm.$el.querySelector("svg");
    expect(getComputedStyle(icon).order).to.eq("1");
    vm.$el.remove();
    vm.$destroy();
  });
  it("设置 iconPosition 可以改变 order", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings",
        iconPosition: "right"
      }
    }).$mount(div);
    const icon = vm.$el.querySelector("svg");
    expect(getComputedStyle(icon).order).to.eq("2");
    vm.$el.remove();
    vm.$destroy();
  });
  it("点击 button 触发 click 事件", () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings"
      }
    }).$mount();

    const callback = sinon.fake();
    vm.$on("click", callback);
    vm.$el.click();
    expect(callback).to.have.been.called;
    vm.$destroy();
  });
  it("点击 button 触发 click 事件，有涟漪效果", done => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        type: "success",
        icon: "settings"
      }
    }).$mount();
    const callback = sinon.fake();
    vm.$on("click", callback);
    const canvas = vm.$el.querySelector("canvas");
    const context = canvas.getContext("2d");
    expect(context.fillStyle).to.eq("#000000");
    vm.$nextTick(() => {
      canvas.click();
      expect(context.fillStyle).to.eq("#159957");
      expect(callback).to.have.been.called;
      done();
      vm.$destroy();
    });
  });
});
