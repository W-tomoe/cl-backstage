// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from './http/http.js'


// 富文本编辑器
import '../static/ueditor/ueditor.config'
import '../static/ueditor/ueditor.all'
import '../static/ueditor/lang/zh-cn/zh-cn'
import '../static/ueditor/ueditor.parse.min'

// icon 
import '../static/icon/iconfont.css'

// 头像裁剪上传
import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'
Vue.use(Croppa)  


Vue.config.productionTip = false
Vue.prototype.$http = axios


/* ElementUI */
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  OptionGroup,
  Option,
  Button,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Badge,
  Cascader,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Card,
  Checkbox
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(Checkbox);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Cascader);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Card);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行

    if(Object.prototype.toString.call(to.meta.title) == '[object Array]'){

        if(to.name == 'classifyManage') {

            if(to.params.type == "activity") {
                sessionStorage.setItem('openPageName',to.meta.title[1])
            }else {
                sessionStorage.setItem('openPageName',to.meta.title[0])
            }
        }else {
            if(to.path.indexOf('/new') > -1) {
                sessionStorage.setItem('openPageName',to.meta.title[0])
            }else {
                sessionStorage.setItem('openPageName',to.meta.title[1])
            }
        }

    }else {
        sessionStorage.setItem('openPageName',to.meta.title)
    }

    next()//执行进入路由，如果不写就不会进入目标页
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
