<script setup lang="ts">
    const data = {
        name: "张三",
        phone: "123456789",
        address: "北京市海淀区",
        role: "普通用户",
        orders: [
            {
                state: "待付款",
                price: "￥100",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png",
            },
            {
                state: "待收货",
                price: "￥100",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png",
            },
            {
                state: "待评价",
                price: "￥100",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png",
            },
            {
                state: "已完成",
                price: "￥100",
                img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png",
            },
        ],
    };
</script>

<template>
    <div class="user">
        <div class="profile">
            <div class="avatar">
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png"
                />
            </div>
            <div class="userinfo">
                <h1>个人信息</h1>
                <div class="userinfo-container">
                    <div class="phone">
                        <h1>昵称</h1>
                        <div class="msg">{{ data.name }}</div>
                    </div>
                    <div class="phone">
                        <h1>手机号码</h1>
                        <div class="msg">{{ data.phone }}</div>
                    </div>
                    <div class="address">
                        <h1>收货地址</h1>
                        <div class="msg">{{ data.address }}</div>
                    </div>
                    <div class="role">
                        <h1>登录角色</h1>
                        <div class="msg">{{ data.role }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="orderlist">
            <div class="orderlist-title">我的订单</div>
            <div class="orderlist-header">
                <button class="cell notPay">
                    <h1>待付款</h1>
                </button>
                <button class="cell notReceive">
                    <h1>待收货</h1>
                </button>
                <button class="cell notComment">
                    <h1>待评价</h1>
                </button>
                <button class="cell completed">
                    <h1>已完成</h1>
                </button>
            </div>
            <div class="orders">
                <div
                    class="orders-rows"
                    v-for="i in data.orders"
                >
                    <div class="img item">
                        <img
                            :src="i.img"
                            alt=""
                        />
                    </div>
                    <div class="msg item">
                        <div class="state">{{ i.state }}</div>
                        <div class="price">{{ i.price }}</div>
                    </div>
                    <button class="viewdetail item">查看详情</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .user {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .profile {
            display: flex;
            flex-direction: row;
            gap: 20px;
            .avatar {
                img {
                    width: 350px;
                    height: 250px;
                    border-radius: 7px;
                    object-fit: cover;
                }
            }
            .userinfo {
                display: flex;
                flex-direction: column;
                padding: 10px 10px;
                background-color: beige;
                border-radius: 7px;
                h1 {
                    font-size: 20px;
                    font-weight: bold;
                }
                &-container {
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    height: 200px;
                    .name,
                    .phone,
                    .address,
                    .role {
                        width: 200px;
                        margin-top: 20px;
                        border-radius: 7px;
                        background-color: $cus_yellow;
                        padding: 10px 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        div {
                            font-size: 16px;
                        }
                        .msg {
                            font-size: 18xpx;
                            font-weight: 600;
                            margin: auto;
                            text-decoration-line: underline;
                        }
                    }
                }
            }
        }
        .orderlist {
            .orderlist-title {
                padding: 20px 0px;
                font-size: 23px;
                font-weight: bold;
                &::after {
                    content: "";
                    display: block;
                    width: 100%;
                    height: 1px;
                    margin-top: 15px;
                    background-color: $cus_line-grey;
                }
            }
            .orderlist-header {
                display: flex;
                justify-content: space-between;
                padding: 0px 20px 20px;
                border-bottom: $cus_line-grey 1px solid;
                .cell {
                    width: 200px;
                    height: 70px;
                    border-radius: 10px;
                    background: $cus_lightPink;
                    h1 {
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
            .orders {
                padding: 0px 30px;
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                width: 100%;
                .orders-rows {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    .img {
                        img {
                            width: 100px;
                            height: 100px;
                            border-radius: 7px;
                            object-fit: cover;
                        }
                    }
                    .msg {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        .state {
                            border-radius: 7px;
                            background-color: bisque;
                            padding: 5px 5px;
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .price {
                            color: red;
                            font-size: 16px;
                            font-weight: bold;
                        }
                    }
                    .viewdetail {
                        margin-left: 70%;
                        width: 100px;
                        height: 50px;
                        border-radius: 7px;
                        background-color: $cus_yellow;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }
</style>
