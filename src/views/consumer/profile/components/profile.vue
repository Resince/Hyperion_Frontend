<script setup lang="ts">
    import { useStore } from "@/store";
    import { IAddressListItem } from "@/types/address";
    import AddressDialog from "./addressDialog.vue";
    import { computed, onMounted, reactive, ref, watch } from "vue";
    import { useRouter } from "vue-router";
    const store = useStore();
    const emits = defineEmits(["handleShowAddress"]);

    const dialogFormVisible = ref(false);
    const dialogSelectVisible = ref(false);
    const type = ref<keyof typeof data.value>("name");
    const handleEditInfo = (t: "name" | "phone" | "address" | "email") => {
        dialogFormVisible.value = true;
        type.value = t;
    };
    const transform = (val: string) => {
        switch (val) {
            case "address":
                return "地址";
            case "name":
                return "昵称";
            case "phone":
                return "手机号码";
            case "email":
                return "邮箱";
        }
    };
    const form = reactive({
        name: "",
    });
    const handleChangeInfo = async () => {
        dialogFormVisible.value = false;
        await store.dispatch("updateUserInfoAction", {
            name: type.value == "name" ? form.name : store.getters.gName,
            tel: type.value == "phone" ? form.name : store.getters.gTel,
            email: type.value == "email" ? form.name : store.getters.gEmail,
        });
        // 改变data
        data.value[type.value] = form.name;
        form.name = "";
        await store.dispatch("initUserInfoAction");
    };

    const data = ref<{
        name: string;
        phone: string;
        address: string;
        email: string;
    }>({} as any);

    // 获取地址列表
    const addressList = computed<IAddressListItem[]>(() => {
        return store.getters["addressStoreModule/gAddressList"];
    });
    // 初始化开始的默认地址
    watch(
        addressList,
        () => {
            // 默认地址->第一个地址->空
            data.value.address =
                addressList.value.find((item: any) => item.isDefault === 1)
                    ?.district ||
                addressList.value[0]?.district ||
                "无地址";
        },
        { immediate: true }
    );
    const initeData = () => {
        // 初始化个人信息
        data.value.name = store.getters.gName;
        data.value.phone = store.getters.gTel;
        data.value.email = store.getters.gEmail;
    };
    onMounted(() => {
        initeData();
    });

    const router = useRouter();
    const handleLoginOut = () => {
        store.commit("loginModule/logout");
        router.push({ name: "LoginRegister" });
    };
</script>
<template>
    <div class="profile">
        <div class="avatar">
            <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png"
            />
        </div>
        <div class="userinfo">
            <div>
                <h1>个人信息</h1>
                <h3 @click="handleLoginOut">登出</h3>
            </div>
            <div class="userinfo-container">
                <div class="name">
                    <div>
                        <h1>昵称</h1>
                        <button @click="handleEditInfo('name')">编辑</button>
                    </div>
                    <div>{{ data.name }}</div>
                </div>
                <div class="phone">
                    <div>
                        <h1>手机号码</h1>
                        <button @click="handleEditInfo('phone')">编辑</button>
                    </div>
                    <div>{{ data.phone }}</div>
                </div>
                <div class="role">
                    <div>
                        <h1>邮箱</h1>
                        <button @click="handleEditInfo('email')">编辑</button>
                    </div>
                    <div>{{ data.email }}</div>
                </div>
                <div class="address">
                    <div>
                        <h1>收货地址</h1>
                        <button
                            @click="
                                () => {
                                    dialogSelectVisible = true;
                                }
                            "
                        >
                            添加
                        </button>
                    </div>
                    <div @click="emits('handleShowAddress')">
                        {{ data.address }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog
        v-model="dialogFormVisible"
        title="编辑信息"
        width="500"
    >
        <el-form :model="form">
            <el-form-item
                :label="'请输入新的' + transform(type)"
                label-width="140px"
            >
                <el-input
                    v-model="form.name"
                    autocomplete="off"
                    :placeholder="data[type]"
                    clearable
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button
                    @click="
                        () => {
                            dialogFormVisible = false;
                            form.name = '';
                        }
                    "
                    >取消</el-button
                >
                <el-button
                    type="primary"
                    @click="handleChangeInfo()"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <AddressDialog v-model:visible="dialogSelectVisible" />
</template>

<style lang="scss" scoped>
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
            div:nth-child(1) {
                display: flex;
                justify-content: space-between;
                h3 {
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    text-decoration: underline;
                    padding-right: 20px;
                }
            }
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
                    div:nth-child(1) {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 40px;
                        button {
                            border-radius: 7px;
                            font-size: 14px;
                            text-decoration: underline;
                            cursor: pointer;
                            font-weight: bold;
                        }
                    }
                    div:nth-child(2) {
                        font-size: 16px;
                        font-weight: bold;
                        margin: auto;
                    }
                }
                .address {
                    div:nth-child(2) {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .dialog-select {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        gap: 20px;
    }
</style>
