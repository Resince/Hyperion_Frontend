# README

这是高并发商场服务系统的前端部分,后端部分请移步[后端](https://github.com/duanyue166/Hyperion_Backend)

### 相关技术栈

+ vue3 使用组合式api
+ TypeScript
+ vite 作为构建工具
+ element-ui plus 作为主要ui
+ tailwind css

### 功能

##### 用户页面

+ 用户主页
    + 包含商品分类-侧边栏
    + 搜索，购物车,用户入口-header
    + 商品概要-主页主体
    + 搜索之后的商品展示-主页主体
+ 商品详情
    + 商品展示图
    + 价格
    + 种类-选择框
    + 详情信息-jpg展示
+ 个人主页
    + 头像
    + 昵称
    + 钱包
    + 我的订单
        + 简单展示订单信息，订单详情，后续操作，退款，退货
+ 购物车
    + 商品信息
        + 商品价格
        + 购买
        + 从购物车取消

#### 商家页面

+ layout
    + 侧边栏
        + 总览
        + 商品
        + 交易
    + header
        + 搜索
        + 消息
        + 通知（不一定要有）
        + 个人页面（未定）
    + 主体

+ 总览
    + 信息bar
    + 店铺数据
    + 收益曲线
    + 销量排行
    + 店铺信息
        + 名称
        + 评分
        + ...
+ 商品管理 shopDetails
    + 商品列表
    + 操作
        + 入库
            + 新增入库
            + 商品简要信息
            + 入库状态（已入库，未入库，正在入库
        + 出库
            + 同上
        + 调货
            + 同上
    + 订单详情

+ 订单管理 orderMange
    + 搜索
    + 所有订单详情
        + 价格
        + 数量
        + 单价
        + 状态
        + 实付款
    + 已卖出
        + 订单号
        + 下单时间
        + 状态
        + 商品清单

#### 管理员页面

+ 商家管理
    + 需要一个商家列表，需要名称，注册时间，主营业务，营收，负责人
+ 用户管理


### TODO

+ 搜索优化
+ discount 没有用上
+ 订单 store
+ 购物车 store
+ 个人信息应该加上收货地址
+ icon本地化
+ 颜色统一化
+ 用户界面美术优化
+ 搜索逻辑编写
+ 两个管理界面的消息通知
+ 管理页面用户信息的编写（简要即可）
+ 完善总览界面的筛选和搜索逻辑

+ 商家获取商品列表 需要id？
+ 商家获取订单列表 需要商家id

+ 商家的订单总数，商品总数，总交易额
+ pending 是订单未付款
+ process 是订单已付款需要发货
+ compeleted 是买家以及收到了货